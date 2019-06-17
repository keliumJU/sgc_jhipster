import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class HistorialCambiosComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-historial-cambios div table .btn-danger'));
  title = element.all(by.css('jhi-historial-cambios div h2#page-heading span')).first();

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

export class HistorialCambiosUpdatePage {
  pageTitle = element(by.id('jhi-historial-cambios-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codeInput = element(by.id('field_code'));
  actividadInput = element(by.id('field_actividad'));
  cambioInput = element(by.id('field_cambio'));
  fechaInput = element(by.id('field_fecha'));
  vVigenteInput = element(by.id('field_vVigente'));
  vObsoletaInput = element(by.id('field_vObsoleta'));
  idDocInput = element(by.id('field_idDoc'));
  rutaInput = element(by.id('file_ruta'));
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

  async setActividadInput(actividad) {
    await this.actividadInput.sendKeys(actividad);
  }

  async getActividadInput() {
    return await this.actividadInput.getAttribute('value');
  }

  async setCambioInput(cambio) {
    await this.cambioInput.sendKeys(cambio);
  }

  async getCambioInput() {
    return await this.cambioInput.getAttribute('value');
  }

  async setFechaInput(fecha) {
    await this.fechaInput.sendKeys(fecha);
  }

  async getFechaInput() {
    return await this.fechaInput.getAttribute('value');
  }

  async setVVigenteInput(vVigente) {
    await this.vVigenteInput.sendKeys(vVigente);
  }

  async getVVigenteInput() {
    return await this.vVigenteInput.getAttribute('value');
  }

  async setVObsoletaInput(vObsoleta) {
    await this.vObsoletaInput.sendKeys(vObsoleta);
  }

  async getVObsoletaInput() {
    return await this.vObsoletaInput.getAttribute('value');
  }

  async setIdDocInput(idDoc) {
    await this.idDocInput.sendKeys(idDoc);
  }

  async getIdDocInput() {
    return await this.idDocInput.getAttribute('value');
  }

  async setRutaInput(ruta) {
    await this.rutaInput.sendKeys(ruta);
  }

  async getRutaInput() {
    return await this.rutaInput.getAttribute('value');
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

export class HistorialCambiosDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-historialCambios-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-historialCambios'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
