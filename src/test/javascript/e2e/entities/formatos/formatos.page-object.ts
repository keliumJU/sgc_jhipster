import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class FormatosComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-formatos div table .btn-danger'));
  title = element.all(by.css('jhi-formatos div h2#page-heading span')).first();

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

export class FormatosUpdatePage {
  pageTitle = element(by.id('jhi-formatos-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nomFormatoInput = element(by.id('field_nomFormato'));
  rutaFormatoInput = element(by.id('file_rutaFormato'));
  idDocInput = element(by.id('field_idDoc'));
  documentoSGCSelect = element(by.id('field_documentoSGC'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomFormatoInput(nomFormato) {
    await this.nomFormatoInput.sendKeys(nomFormato);
  }

  async getNomFormatoInput() {
    return await this.nomFormatoInput.getAttribute('value');
  }

  async setRutaFormatoInput(rutaFormato) {
    await this.rutaFormatoInput.sendKeys(rutaFormato);
  }

  async getRutaFormatoInput() {
    return await this.rutaFormatoInput.getAttribute('value');
  }

  async setIdDocInput(idDoc) {
    await this.idDocInput.sendKeys(idDoc);
  }

  async getIdDocInput() {
    return await this.idDocInput.getAttribute('value');
  }

  async documentoSGCSelectLastOption(timeout?: number) {
    await this.documentoSGCSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async documentoSGCSelectOption(option) {
    await this.documentoSGCSelect.sendKeys(option);
  }

  getDocumentoSGCSelect(): ElementFinder {
    return this.documentoSGCSelect;
  }

  async getDocumentoSGCSelectedOption() {
    return await this.documentoSGCSelect.element(by.css('option:checked')).getText();
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

export class FormatosDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-formatos-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-formatos'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
