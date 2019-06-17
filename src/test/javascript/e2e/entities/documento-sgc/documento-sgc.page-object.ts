import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class DocumentoSGCComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-documento-sgc div table .btn-danger'));
  title = element.all(by.css('jhi-documento-sgc div h2#page-heading span')).first();

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

export class DocumentoSGCUpdatePage {
  pageTitle = element(by.id('jhi-documento-sgc-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codigoInput = element(by.id('field_codigo'));
  idProcesoInput = element(by.id('field_idProceso'));
  idTipoDocInput = element(by.id('field_idTipoDoc'));
  nomDocInput = element(by.id('field_nomDoc'));
  rutaInput = element(by.id('file_ruta'));
  idEstadoInput = element(by.id('field_idEstado'));
  versionInput = element(by.id('field_version'));
  estadoDocSelect = element(by.id('field_estadoDoc'));
  procesoSelect = element(by.id('field_proceso'));
  tipoDocSelect = element(by.id('field_tipoDoc'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodigoInput(codigo) {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput() {
    return await this.codigoInput.getAttribute('value');
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

  async setNomDocInput(nomDoc) {
    await this.nomDocInput.sendKeys(nomDoc);
  }

  async getNomDocInput() {
    return await this.nomDocInput.getAttribute('value');
  }

  async setRutaInput(ruta) {
    await this.rutaInput.sendKeys(ruta);
  }

  async getRutaInput() {
    return await this.rutaInput.getAttribute('value');
  }

  async setIdEstadoInput(idEstado) {
    await this.idEstadoInput.sendKeys(idEstado);
  }

  async getIdEstadoInput() {
    return await this.idEstadoInput.getAttribute('value');
  }

  async setVersionInput(version) {
    await this.versionInput.sendKeys(version);
  }

  async getVersionInput() {
    return await this.versionInput.getAttribute('value');
  }

  async estadoDocSelectLastOption(timeout?: number) {
    await this.estadoDocSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async estadoDocSelectOption(option) {
    await this.estadoDocSelect.sendKeys(option);
  }

  getEstadoDocSelect(): ElementFinder {
    return this.estadoDocSelect;
  }

  async getEstadoDocSelectedOption() {
    return await this.estadoDocSelect.element(by.css('option:checked')).getText();
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

export class DocumentoSGCDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-documentoSGC-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-documentoSGC'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
