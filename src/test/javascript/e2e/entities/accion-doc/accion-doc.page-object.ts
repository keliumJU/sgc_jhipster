import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class AccionDocComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-accion-doc div table .btn-danger'));
  title = element.all(by.css('jhi-accion-doc div h2#page-heading span')).first();

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

export class AccionDocUpdatePage {
  pageTitle = element(by.id('jhi-accion-doc-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  accionInput = element(by.id('field_accion'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAccionInput(accion) {
    await this.accionInput.sendKeys(accion);
  }

  async getAccionInput() {
    return await this.accionInput.getAttribute('value');
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

export class AccionDocDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-accionDoc-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-accionDoc'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
