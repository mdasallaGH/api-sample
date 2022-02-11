import { CustomActions } from '../utils';
import * as fs from 'fs';
import { browser } from 'protractor';
import { BrowserObject } from 'webdriverio';
import { main as appiumServer } from 'appium';
import { remote } from 'webdriverio';
import { MMPApiHelper } from './mmpApiHelper';

export class WDIOCustomActions {
  constructor() {}

  public customAct = new CustomActions();
  private wdio;
  private appiumSrv;
  private mmpApiHelper = new MMPApiHelper();

  /**Connect to device using Webdriver IO and a configuration object
   * @param config - specific configuration of device to connect to
   */
  public async connectToDevice(
    serverConf: any,
    config: any,
    timeout: number = 10000
  ): Promise<any> {
    await this.customAct.logStep();
    //random delay
    await this.customAct.randomDelay();

    try {
      //start the appium server if it's not already started
      if (this.appiumSrv === undefined) {
        if (config.hostname === '0.0.0.0') {
          this.appiumSrv = await appiumServer(serverConf);
          config.port = serverConf.port;
        }
        //connect to device with webdriver io
        browser.params.wdio = await remote(config);
        await browser.params.wdio.setTimeouts(timeout);
        console.log(
          'Appium session connected to device...' +
            browser.params.wdio.sessionId
        );
        await browser.sleep(5000);
        return await browser.params.wdio.getSession();
      } else {
        console.log('Appium already running...');
      }
    } catch (err) {
      console.error(err);
      if (err.contains('EADDRINUSE')) {
        console.log('trying another appium port...');
        serverConf.port = serverConf.port + 1;
        config.port = config.port + 1;
        await this.connectToDevice(serverConf, config, timeout);
      }
    }
  }

  async getSession(): Promise<void> {
    if (this.wdio === undefined) {
      this.wdio = browser.params.wdio;
    }
  }

  /**Close app with Webdriver IO*/
  async closeApp(): Promise<BrowserObject> {
    await this.customAct.logStep();
    await this.getSession();
    return await this.wdio.closeApp();
  }

  /**Open app with Webdriver IO*/
  async launchApp(): Promise<BrowserObject> {
    await this.customAct.logStep();
    await this.getSession();
    return await this.wdio.launchApp();
  }

  /**Open app with Webdriver IO*/
  async terminateApp(appName: string): Promise<BrowserObject> {
    await this.customAct.logStep();
    await this.getSession();
    return await this.wdio.terminateApp(appName);
  }

  /**Deletes the Webdriver IO session*/
  async deleteSession(): Promise<void> {
    await this.customAct.logStep();
    try {
      await this.getSession();
      if (this.wdio !== undefined) {
        await this.wdio.deleteSession();
        browser.params.wdio = undefined;
      } else {
        console.log('in deleteSession - wdio undefined...');
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**Go back action*/
  async goBack(): Promise<BrowserObject> {
    await this.customAct.logStep();
    await this.getSession();
    return await this.wdio.back();
  }

  /**Get logs from Appium session: WDIOElementWrapper*/
  async getAppiumLogcatLogs() {
    await this.customAct.logStep();
    await this.getSession();
    const logs = await this.wdio.getLogs('logcat');
    const logsToWrite = [];

    await logs.forEach((log) => {
      logsToWrite.push(log['message']);
      if (
        log['message'].includes('PJSIP') ||
        log['message'].includes('Chatbot') ||
        log['message'].includes('MSRP')
      ) {
        //console.log('logs: ' + log['message']);
      }
    });

    //await console.log('log size: ' + logs.length);
    fs.writeFileSync(
      '/Users/mdasalla/Documents/rcsLogs.csv',
      JSON.stringify(logsToWrite, null, 1)
    );

    return logsToWrite;
  }

  /**Switch context to new app*/
  async switchContext(): Promise<void> {
    await this.customAct.logStep();
    await this.getSession();
    const app = await this.wdio.getContext();
    console.log('context: ' + (await this.wdio.getContexts()));
    return await this.wdio.switchContext(app);
  }

  /**
   *Whitelists device number on bot and sets bot MNO to Sandbox
   */
  async botSetupForDevice(
    orgId: string,
    accntId: string,
    accessToken: string,
    numbers: string[]
  ): Promise<void> {
    await this.customAct.logStep();
    await this.mmpApiHelper.setBotWhitelistNumber(
      orgId,
      accntId,
      numbers,
      accessToken
    );
    await this.mmpApiHelper.setBotMNO(orgId, accntId, accessToken);
  }

  /**
   * Log detailed test failure error
   */
  public async logDetailedError(selector: string, error: Error): Promise<void> {
    await this.customAct.logStep();
    try {
      //const stackArray = error.stack.split('\n');
      await this.getSession();
      const wd: BrowserObject = this.wdio;
      const date = await this.customAct.getTimeStamp();
      //take screenshot on device
      const sessionId = await (await browser.getSession()).getId();
      const scrnShotPath = `${browser.params.testreports}/screenshots/${sessionId}-wdio-${date}.png`;
      await wd.saveScreenshot(scrnShotPath);
      //log error to wdio log file
      const logFile = `${browser.params.testreports}/wdio-log.csv`;
      const errMsg = `session:${sessionId}, Couldn't find element: ${selector} in stack ${error.toString()}, screenshot path: ${scrnShotPath}`;
      fs.appendFileSync(logFile, `${errMsg} \n`);
      console.error(errMsg);
    } catch (e) {
      console.error('error in WDIOCustomActions.throwDetailedError ' + e);
    }
  }
}
