import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ProcesoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-proceso div table .btn-danger'));
  title = element.all(by.css('jhi-proceso div h2#page-heading span')).first();

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

export class ProcesoUpdatePage {
  pageTitle = element(by.id('jhi-proceso-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codeInput = element(by.id('field_code'));
  procesoInput = element(by.id('field_proceso'));
  idMacroProcesoInput = element(by.id('field_idMacroProceso'));
  codDocInput = element(by.id('field_codDoc'));
  macroProcesoSelect = element(by.id('field_macroProceso'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return await this.codeInput.getAttribute('value');
  }

  async setProcesoInput(proceso) {
    await this.procesoInput.sendKeys(proceso);
  }

  async getProcesoInput() {
    return await this.procesoInput.getAttribute('value');
  }

  async setIdMacroProcesoInput(idMacroProceso) {
    await this.idMacroProcesoInput.sendKeys(idMacroProceso);
  }

  async getIdMacroProcesoInput() {
    return await this.idMacroProcesoInput.getAttribute('value');
  }

  async setCodDocInput(codDoc) {
    await this.codDocInput.sendKeys(codDoc);
  }

  async getCodDocInput() {
    return await this.codDocInput.getAttribute('value');
  }

  async macroProcesoSelectLastOption(timeout?: number) {
    await this.macroProcesoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async macroProcesoSelectOption(option) {
    await this.macroProcesoSelect.sendKeys(option);
  }

  getMacroProcesoSelect(): ElementFinder {
    return this.macroProcesoSelect;
  }

  async getMacroProcesoSelectedOption() {
    return await this.macroProcesoSelect.element(by.css('option:checked')).getText();
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

export class ProcesoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-proceso-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-proceso'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
