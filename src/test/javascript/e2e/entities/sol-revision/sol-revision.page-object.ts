import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class SolRevisionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-sol-revision div table .btn-danger'));
  title = element.all(by.css('jhi-sol-revision div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class SolRevisionUpdatePage {
  pageTitle = element(by.id('jhi-sol-revision-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codeInput = element(by.id('field_code'));
  idUserInput = element(by.id('field_idUser'));
  idSolInput = element(by.id('field_idSol'));
  estadoInput = element(by.id('field_estado'));
  userSelect = element(by.id('field_user'));
  solicitudSelect = element(by.id('field_solicitud'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return await this.codeInput.getAttribute('value');
  }

  async setIdUserInput(idUser) {
    await this.idUserInput.sendKeys(idUser);
  }

  async getIdUserInput() {
    return await this.idUserInput.getAttribute('value');
  }

  async setIdSolInput(idSol) {
    await this.idSolInput.sendKeys(idSol);
  }

  async getIdSolInput() {
    return await this.idSolInput.getAttribute('value');
  }

  getEstadoInput(timeout?: number) {
    return this.estadoInput;
  }

  async userSelectLastOption(timeout?: number) {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async solicitudSelectLastOption(timeout?: number) {
    await this.solicitudSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async solicitudSelectOption(option) {
    await this.solicitudSelect.sendKeys(option);
  }

  getSolicitudSelect(): ElementFinder {
    return this.solicitudSelect;
  }

  async getSolicitudSelectedOption() {
    return await this.solicitudSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class SolRevisionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-solRevision-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-solRevision'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
