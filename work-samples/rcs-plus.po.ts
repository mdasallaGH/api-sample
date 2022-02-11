import { WDIOElementWrapper } from '../../page-objects/wrappers';
import { browser } from 'protractor';
import { WDIOCustomActions } from '../../utils';

export class RCSPlusPageObject extends WDIOCustomActions {
  constructor() {
    super();
  }

  //********************************
  //**** Elements ****
  //********************************

  /**Contacts button on messages page */
  get contactsBtn(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper('(//*[@content-desc="Tab icon"])[1]');
  }

  /**Chatbot button on main page */
  get chatBotsBtn(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper('(//*[@content-desc="Chatbots"])[1]');
  }

  /**Messages button on main page */
  get messagesBtn(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper('(//*[@content-desc="Messages"])[1]');
  }

  /**Contact in list on messages page
   * @param contactName - The name of the contact
   */
  contact(contactName: string): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      `//android.widget.TextView[contains(@text,"${contactName}")]`
    );
  }

  /**Continue button on second setup page */
  get continueBtn(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.Button[contains(@text,"Continue")]'
    );
  }

  /**Generic button by text
   * @param text - text of button to find
   */
  buttonByTxt(text: string): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      `//android.widget.Button[contains(@text,"${text}")]`
    );
  }

  /**@BotStart button */
  get atBotStartBtn(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.Button[contains(@text,"@BOTSTART")]'
    );
  }

  /**Phone number input on initial verify phone page */
  get phoneInput(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper('android.widget.EditText');
  }

  /**Skip button on initial setup page */
  get skipBtn(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.Button[contains(@text,"Skip")]'
    );
  }

  /**Skip button on initial setup page */
  get startMsgBtn(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.TextView[contains(@text,"START")]'
    );
  }

  /**Terms checbox button on business message page */
  get termsChkbx(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper('//android.widget.CheckBox');
  }

  /**Yes button on phone confirmation dialog */
  get yesBtn(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.TextView[contains(@text,"YES")]'
    );
  }

  /**No button on phone confirmation dialog */
  get noBtn(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.TextView[contains(@text,"NO")]'
    );
  }

  /**Password input when registering device*/
  get passwordToRegisterInput(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.EditText[contains(@text,"Password")]'
    );
  }

  /**Next button on phone when regitering device*/
  get nextBtn(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.Button[contains(@text,"Next")]'
    );
  }

  /**Wit client back button*/
  get witGoBackBtn(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.ImageButton[@content-desc="Toolbar back action"]'
    );
  }

  /**Search back button*/
  get searchBackBtn(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.ImageButton[@content-desc="Collapse"]'
    );
  }

  /**Accept button when registering device*/
  get acceptTermsBtn(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.Button[contains(@text,"Accept")]'
    );
  }

  /**Text message input on vendor dialog */
  get textMsgInput(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.EditText[contains(@resource-id, "chat_input_message")]'
    );
  }

  /**Send button on messages page*/
  get sendMsgBtn(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.ImageButton[contains(@resource-id,"chat_send_button")]'
    );
  }

  /**Search glass button for companies*/
  get searchBtn(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.TextView[@content-desc="Search"]'
    );
  }

  /**Search input for companies*/
  get searchInput(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.EditText[contains(@resource-id, "search_src_text")]'
    );
  }

  /**Image text on messages page
   * @param text - text to verify of image
   */
  public imageText(text: string): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      `//android.widget.Image[contains(@text,"${text}")]`
    );
  }

  /**Send button on messages page*/
  get imagePreview(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.ImageView[contains(@resource-id,"file_transfer_preview")]'
    );
  }

  /**Send button on messages page*/
  get cardMedia(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.ImageView[contains(@resource-id, "card_media")]'
    );
  }

  /**Conversation text on messages page
   * @param text - The text of the conversation to get
   */
  public conversationText(text: string): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      `//android.widget.TextView[contains(@text,"${text}")]`
    );
  }

  /**More hamburger button */
  get moreBtn(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.FrameLayout[@content-desc="More"]'
    );
  }

  //*********** Settings Page*************/

  /**My number text on Settings page*/
  get myNumber(): WDIOElementWrapper {
    void this.customAct.logStep();
    return new WDIOElementWrapper(
      '//android.widget.TextView[contains(@text,"My number")]'
    );
  }

  //********************************
  //**** Actions ****
  //********************************

  /**Navigate to business account
   * @param businessName - business name to navigate to in app
   */
  async navigateToBiz(businessName: string): Promise<void> {
    await this.chatBotsBtn.click();
    await this.searchBtn.click();
    await this.searchInput.setValue(businessName);
    return await this.contact(businessName).click();
  }

  /**Search for business account
   * @param businessName - business name to navigate to in app
   */
  async searchForBiz(businessName: string): Promise<void> {
    await this.chatBotsBtn.click();
    return await this.setSearchInputValue(businessName);
  }

  /** Set SearchInput value*/
  async setSearchInputValue(text: string): Promise<void> {
    await this.searchBtn.click();
    await this.searchInput.setValue(text);
  }

  /**Navigate to bot in Messages tab
   * @param botName - business name to navigate to in app
   */
  async navigateToBotInMessages(botName: string): Promise<void> {
    await this.messagesBtn.waitForDisplayed();
    await this.messagesBtn.click();
    await browser.sleep(5000);
    await this.searchBtn.isDisplayed();
    await this.searchBtn.click();
    await this.searchInput.waitForDisplayed();
    await this.searchInput.setValue(botName);
    await this.contact(botName).waitForDisplayed();
    return await this.contact(botName).click();
  }

  /**Subscribe to business account
   * @param businessName - business name to subscribe to in app
   */
  async subscribeToBiz(businessName: string): Promise<void> {
    await this.chatBotsBtn.click();
    await browser.sleep(5000);
    await this.searchBtn.click();
    await this.searchInput.setValue(businessName);
    await this.contact(businessName).click();
    await this.atBotStartBtn.click();
    await this.textMsgInput.waitForDisplayed(60000);
  }

  /**Register new device
   * @param phoneNumber - phone number to register
   * @param password - password for the wit app
   */
  async registerNewDevice(
    phoneNumber: string,
    password?: string
  ): Promise<void> {
    const pass = password || '1234';
    await this.skipBtn.click();
    await this.continueBtn.click();
    await this.phoneInput.waitForDisplayed(60000);
    await this.phoneInput.setValue(phoneNumber);
    await this.yesBtn.waitForDisplayed(60000);
    await this.yesBtn.click();
    await this.passwordToRegisterInput.waitForDisplayed(60000);
    await this.passwordToRegisterInput.setValue(pass);
    await this.continueBtn.click();
    await this.acceptTermsBtn.waitForDisplayed(60000);
    await this.acceptTermsBtn.click();
    await this.continueBtn.waitForDisplayed(60000);
    await this.continueBtn.click();
  }

  /**Gets phone number from RCS client to be used later*/
  async getPhoneNumberInClient(): Promise<string> {
    await this.moreBtn.waitForDisplayed(10000);
    await this.moreBtn.click();
    await this.myNumber.waitForDisplayed();
    const number = await this.myNumber.getText();
    return number.match(/\+.*/)[0];
  }

  /**Send text message*/
  async sendTxtMsg(text: string): Promise<void> {
    //await this.textMsgInput.waitForDisplayed();
    await this.textMsgInput.setValue(text);
    await this.sendMsgBtn.click();
  }
}
