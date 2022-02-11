import { browser } from 'protractor';
import { RCSPlusPageObject } from '../../page-objects-mobile/wit-rcs-plus';
import {
  AppLoginPagePo,
  ChatbotConversationsPage
} from '../../page-objects/amc';
import { MMPApiHelper, CustomActions } from '../../utils';

describe('P2A messages to device', () => {
  const mmpApiHelper = new MMPApiHelper();
  const rcsPlusPO = new RCSPlusPageObject();
  const chatbotConversationPO = new ChatbotConversationsPage();
  const customAct = new CustomActions();
  const params = browser.params;
  const appiumConf = params.appium;
  let accntSchema;
  const appLoginPage = new AppLoginPagePo();

  beforeAll(async () => {
    //connect to an device and get phone number
    const session = await rcsPlusPO.connectToDevice(
      appiumConf.localServer,
      appiumConf.seetestEmulatorAvailable
    );

    //get phone number
    const number = await rcsPlusPO.getPhoneNumberInClient();
    //create a customer account via API
    accntSchema = await mmpApiHelper.onboardNewOrgCheck(
      params,
      __dirname,
      true
    );

    //ensure device number is configured in bot as whitelist number
    await rcsPlusPO.botSetupForDevice(
      accntSchema.organizationId,
      accntSchema.accountId,
      accntSchema.accessToken,
      [number]
    );

    //subscribe to bot
    await rcsPlusPO.navigateToBotInMessages(accntSchema.businessName);
    await rcsPlusPO.textMsgInput.click();
    await chatbotConversationPO.navigateTo(
      accntSchema.email,
      accntSchema.tempPassword
    );
  });

  beforeEach(async () => {
    //await rcsPlusPO.navigateToBiz(accntSchema.businessName);
  });

  afterEach(async () => {
    //shutdown appium session in case a failure happens during test case
    await rcsPlusPO.witGoBackBtn.click();
  });

  afterAll(async () => {
    //shutdown appium session in case a failure happens during test case
    await rcsPlusPO.deleteSession();
  });

  it('MMP-25102-Verify user receives P2A message when the chatbot is active', async () => {
    const msgToBot = 'hi from device1!';
    await rcsPlusPO.sendTxtMsg(msgToBot);
    //got to amc and verify bot got message
    await chatbotConversationPO.botResponsesTab.click();
    await chatbotConversationPO.conversationsTab.click();
    await chatbotConversationPO.firstConversation.click();
    const deviceMsg = await chatbotConversationPO.deviceMsgTxt(1).getText();
    await expect(deviceMsg).toContain(msgToBot);
  });
});
