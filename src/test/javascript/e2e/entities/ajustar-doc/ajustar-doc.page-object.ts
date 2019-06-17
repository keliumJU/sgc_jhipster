import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class AjustarDocComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ajustar-doc div table .btn-danger'));
  title = element.all(by.css('jhi-ajustar-doc div h2#page-heading span')).first();

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

export class AjustarDocUpdatePage {
  pageTitle = element(by.id('jhi-ajustar-doc-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codeInput = element(by.id('field_code'));
  idUserInput = element(by.id('field_idUser'));
  idCargoInput = element(by.id('field_idCargo'));
  idAccionInput = element(by.id('field_idAccion'));
  idDocInput = element(by.id('field_idDoc'));
  documentoSGCSelect = element(by.id('field_documentoSGC'));
  userSelect = element(by.id('field_user'));
  cargoSelect = element(by.id('field_cargo'));
  accionDocSelect = element(by.id('field_accionDoc'));

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

  async setIdCargoInput(idCargo) {
    await this.idCargoInput.sendKeys(idCargo);
  }

  async getIdCargoInput() {
    return await this.idCargoInput.getAttribute('value');
  }

  async setIdAccionInput(idAccion) {
    await this.idAccionInput.sendKeys(idAccion);
  }

  async getIdAccionInput() {
    return await this.idAccionInput.getAttribute('value');
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

  async cargoSelectLastOption(timeout?: number) {
    await this.cargoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async cargoSelectOption(option) {
    await this.cargoSelect.sendKeys(option);
  }

  getCargoSelect(): ElementFinder {
    return this.cargoSelect;
  }

  async getCargoSelectedOption() {
    return await this.cargoSelect.element(by.css('option:checked')).getText();
  }

  async accionDocSelectLastOption(timeout?: number) {
    await this.accionDocSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async accionDocSelectOption(option) {
    await this.accionDocSelect.sendKeys(option);
  }

  getAccionDocSelect(): ElementFinder {
    return this.accionDocSelect;
  }

  async getAccionDocSelectedOption() {
    return await this.accionDocSelect.element(by.css('option:checked')).getText();
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

export class AjustarDocDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ajustarDoc-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ajustarDoc'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
