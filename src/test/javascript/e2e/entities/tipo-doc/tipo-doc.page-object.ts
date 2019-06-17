import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class TipoDocComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tipo-doc div table .btn-danger'));
  title = element.all(by.css('jhi-tipo-doc div h2#page-heading span')).first();

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

export class TipoDocUpdatePage {
  pageTitle = element(by.id('jhi-tipo-doc-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codeInput = element(by.id('field_code'));
  tipoDocInput = element(by.id('field_tipoDoc'));
  codTipInput = element(by.id('field_codTip'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return await this.codeInput.getAttribute('value');
  }

  async setTipoDocInput(tipoDoc) {
    await this.tipoDocInput.sendKeys(tipoDoc);
  }

  async getTipoDocInput() {
    return await this.tipoDocInput.getAttribute('value');
  }

  async setCodTipInput(codTip) {
    await this.codTipInput.sendKeys(codTip);
  }

  async getCodTipInput() {
    return await this.codTipInput.getAttribute('value');
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

export class TipoDocDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tipoDoc-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tipoDoc'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
