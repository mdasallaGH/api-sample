import { browser } from 'protractor';
import { Element } from 'webdriverio';
import { CustomActions, WDIOCustomActions } from '../../utils';

/**This is the class for the Webdriver IO object that enables mobile device commands via Appium */
export class WDIOElementWrapper {
  public customAct = new CustomActions();
  public wdio;
  private selector: string;
  private element: Element;
  private TIMEOUT = 10000;
  private wdioCustomAct = new WDIOCustomActions();

  constructor(_selector: string) {
    this.selector = _selector;
  }

  /**Gets found element*/
  async getElement(waitTime: number = this.TIMEOUT): Promise<void> {
    await this.customAct.logStep();
    try {
      //assign session from global variable
      //requires RCSPlusPageObject.connectToDevice to be called first
      if (this.wdio === undefined) {
        this.wdio = browser.params.wdio;
      }
      console.log(`looking for ${this.selector}`);
      this.element = await this.wdio.$(this.selector);
      await this.element.waitForDisplayed(waitTime);
    } catch (e) {
      await this.wdioCustomAct.logDetailedError(this.selector, e);
    }
  }

  /**Check if the selected DOM-element is displayed */
  async isDisplayed(): Promise<boolean> {
    await this.customAct.logStep();
    try {
      console.log(`isDisplayed for ${this.selector}`);
      await this.getElement();
      return await this.element.isDisplayed();
    } catch (e) {
      await this.wdioCustomAct.logDetailedError(this.selector, e);
    }
  }

  /**Clicks on an element*/
  async click(waitTime: number = this.TIMEOUT): Promise<void> {
    await this.customAct.logStep();
    try {
      console.log(`click on ${this.selector}`);
      await this.getElement(waitTime);
      return await this.element.click();
    } catch (e) {
      await this.wdioCustomAct.logDetailedError(this.selector, e);
    }
  }

  /**Gets the element text attribute*/
  async getText(): Promise<string> {
    await this.customAct.logStep();
    try {
      console.log(`getText for ${this.selector}`);
      await this.getElement();
      return await this.element.getText();
    } catch (e) {
      await this.wdioCustomAct.logDetailedError(this.selector, e);
    }
  }

  /**Clears the value of an input element*/
  async clear(): Promise<void> {
    await this.customAct.logStep();
    try {
      console.log(`clear for ${this.selector}`);
      await this.getElement();
      return await this.element.clearValue();
    } catch (e) {
      await this.wdioCustomAct.logDetailedError(this.selector, e);
    }
  }

  /**Check if element exists in DOM */
  async isExisting(): Promise<boolean> {
    await this.customAct.logStep();
    try {
      console.log(`isExisting for ${this.selector}`);
      await this.getElement();
      return await this.element.isExisting();
    } catch (e) {
      await this.wdioCustomAct.logDetailedError(this.selector, e);
    }
  }

  /**Gets attribute of element
   * @param attribute - the attribute to find in an element
   */
  async getAttribute(attribute: string): Promise<string> {
    await this.customAct.logStep();
    try {
      console.log(`getAttribute for ${this.selector}`);
      await this.getElement();
      return await this.element.getAttribute(attribute);
    } catch (e) {
      await this.wdioCustomAct.logDetailedError(this.selector, e);
    }
  }

  /**Check if element is enabled */
  async isEnabled(): Promise<boolean> {
    await this.customAct.logStep();
    try {
      console.log(`isEnabled for ${this.selector}`);
      await this.getElement();
      return await this.element.isEnabled();
    } catch (e) {
      await this.wdioCustomAct.logDetailedError(this.selector, e);
    }
  }

  /**Set the value for input element
   * @param value - the value to set in input field
   */
  async setValue(value: string): Promise<void> {
    await this.customAct.logStep();
    try {
      console.log(`setValue for ${this.selector}`);
      await this.getElement();
      return await this.element.setValue(value);
    } catch (e) {
      await this.wdioCustomAct.logDetailedError(this.selector, e);
    }
    //workaround for Seetest setValue bug
    // if (this.wdio.sessionId.includes('CLOUD')) {
    //   await this.wdio.execute(`seetest:client.elementSendText(\"NATIVE\", \"${this.selector}\", \"0\", \"${value}\")`);

    // } else {
    //   const el = await this.wdio.$(this.selector);
    //   await el.setValue(value);
    // }
  }

  /**Wait for element to be displayed based on number passed in
   * @param time - the time to wait in milliseconds - default 1000
   */
  async waitForDisplayed(time: number = 1000): Promise<boolean> {
    await this.customAct.logStep();
    try {
      console.log(`waitForDisplayed for ${this.selector}`);
      await this.getElement();
      if (this.element !== undefined) {
        return await this.element.waitForDisplayed(time);
      } else {
        console.log('in waitForDisplayed - element undefined...');
      }
    } catch (e) {
      await this.wdioCustomAct.logDetailedError(this.selector, e);
    }
  }

  /**
   * Scroll device element into view
   */
  async scrollIntoView(): Promise<void> {
    await this.customAct.logStep();
    try {
      if (this.wdio === undefined) {
        this.wdio = browser.params.wdio;
      }
      const text = this.selector.match(/(?<=").*(?=")/)[0];
      this.selector = `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("${text}"))`;
      await this.getElement();
    } catch (e) {
      await this.wdioCustomAct.logDetailedError(this.selector, e);
    }
  }
}
