import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ContenidoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-contenido div table .btn-danger'));
  title = element.all(by.css('jhi-contenido div h2#page-heading span')).first();

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

export class ContenidoUpdatePage {
  pageTitle = element(by.id('jhi-contenido-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  actividadInput = element(by.id('field_actividad'));
  descripcionInput = element(by.id('field_descripcion'));
  responsableInput = element(by.id('field_responsable'));
  registroInput = element(by.id('field_registro'));
  idDocInput = element(by.id('field_idDoc'));
  documentoSGCSelect = element(by.id('field_documentoSGC'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setActividadInput(actividad) {
    await this.actividadInput.sendKeys(actividad);
  }

  async getActividadInput() {
    return await this.actividadInput.getAttribute('value');
  }

  async setDescripcionInput(descripcion) {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput() {
    return await this.descripcionInput.getAttribute('value');
  }

  async setResponsableInput(responsable) {
    await this.responsableInput.sendKeys(responsable);
  }

  async getResponsableInput() {
    return await this.responsableInput.getAttribute('value');
  }

  async setRegistroInput(registro) {
    await this.registroInput.sendKeys(registro);
  }

  async getRegistroInput() {
    return await this.registroInput.getAttribute('value');
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

export class ContenidoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-contenido-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-contenido'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
