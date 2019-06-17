import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class AnexosComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-anexos div table .btn-danger'));
  title = element.all(by.css('jhi-anexos div h2#page-heading span')).first();

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

export class AnexosUpdatePage {
  pageTitle = element(by.id('jhi-anexos-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nomAnexoInput = element(by.id('field_nomAnexo'));
  descripcionInput = element(by.id('field_descripcion'));
  imgInput = element(by.id('file_img'));
  idPadreInput = element(by.id('field_idPadre'));
  idDocInput = element(by.id('field_idDoc'));
  documentoSGCSelect = element(by.id('field_documentoSGC'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomAnexoInput(nomAnexo) {
    await this.nomAnexoInput.sendKeys(nomAnexo);
  }

  async getNomAnexoInput() {
    return await this.nomAnexoInput.getAttribute('value');
  }

  async setDescripcionInput(descripcion) {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput() {
    return await this.descripcionInput.getAttribute('value');
  }

  async setImgInput(img) {
    await this.imgInput.sendKeys(img);
  }

  async getImgInput() {
    return await this.imgInput.getAttribute('value');
  }

  async setIdPadreInput(idPadre) {
    await this.idPadreInput.sendKeys(idPadre);
  }

  async getIdPadreInput() {
    return await this.idPadreInput.getAttribute('value');
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

export class AnexosDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-anexos-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-anexos'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
