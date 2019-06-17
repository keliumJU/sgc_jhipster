import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class SolicitudComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-solicitud div table .btn-danger'));
  title = element.all(by.css('jhi-solicitud div h2#page-heading span')).first();

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

export class SolicitudUpdatePage {
  pageTitle = element(by.id('jhi-solicitud-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codeInput = element(by.id('field_code'));
  idProcesoInput = element(by.id('field_idProceso'));
  idTipoDocInput = element(by.id('field_idTipoDoc'));
  idTipoSolInput = element(by.id('field_idTipoSol'));
  fechaSolInput = element(by.id('field_fechaSol'));
  descripcionInput = element(by.id('field_descripcion'));
  idDocInput = element(by.id('field_idDoc'));
  procesoSelect = element(by.id('field_proceso'));
  tipoDocSelect = element(by.id('field_tipoDoc'));
  tipoSolicitudSelect = element(by.id('field_tipoSolicitud'));
  documentoSGCSelect = element(by.id('field_documentoSGC'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return await this.codeInput.getAttribute('value');
  }

  async setIdProcesoInput(idProceso) {
    await this.idProcesoInput.sendKeys(idProceso);
  }

  async getIdProcesoInput() {
    return await this.idProcesoInput.getAttribute('value');
  }

  async setIdTipoDocInput(idTipoDoc) {
    await this.idTipoDocInput.sendKeys(idTipoDoc);
  }

  async getIdTipoDocInput() {
    return await this.idTipoDocInput.getAttribute('value');
  }

  async setIdTipoSolInput(idTipoSol) {
    await this.idTipoSolInput.sendKeys(idTipoSol);
  }

  async getIdTipoSolInput() {
    return await this.idTipoSolInput.getAttribute('value');
  }

  async setFechaSolInput(fechaSol) {
    await this.fechaSolInput.sendKeys(fechaSol);
  }

  async getFechaSolInput() {
    return await this.fechaSolInput.getAttribute('value');
  }

  async setDescripcionInput(descripcion) {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput() {
    return await this.descripcionInput.getAttribute('value');
  }

  async setIdDocInput(idDoc) {
    await this.idDocInput.sendKeys(idDoc);
  }

  async getIdDocInput() {
    return await this.idDocInput.getAttribute('value');
  }

  async procesoSelectLastOption(timeout?: number) {
    await this.procesoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async procesoSelectOption(option) {
    await this.procesoSelect.sendKeys(option);
  }

  getProcesoSelect(): ElementFinder {
    return this.procesoSelect;
  }

  async getProcesoSelectedOption() {
    return await this.procesoSelect.element(by.css('option:checked')).getText();
  }

  async tipoDocSelectLastOption(timeout?: number) {
    await this.tipoDocSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoDocSelectOption(option) {
    await this.tipoDocSelect.sendKeys(option);
  }

  getTipoDocSelect(): ElementFinder {
    return this.tipoDocSelect;
  }

  async getTipoDocSelectedOption() {
    return await this.tipoDocSelect.element(by.css('option:checked')).getText();
  }

  async tipoSolicitudSelectLastOption(timeout?: number) {
    await this.tipoSolicitudSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoSolicitudSelectOption(option) {
    await this.tipoSolicitudSelect.sendKeys(option);
  }

  getTipoSolicitudSelect(): ElementFinder {
    return this.tipoSolicitudSelect;
  }

  async getTipoSolicitudSelectedOption() {
    return await this.tipoSolicitudSelect.element(by.css('option:checked')).getText();
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

export class SolicitudDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-solicitud-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-solicitud'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
