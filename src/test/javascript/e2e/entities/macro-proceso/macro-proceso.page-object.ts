import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class MacroProcesoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-macro-proceso div table .btn-danger'));
  title = element.all(by.css('jhi-macro-proceso div h2#page-heading span')).first();

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

export class MacroProcesoUpdatePage {
  pageTitle = element(by.id('jhi-macro-proceso-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codeInput = element(by.id('field_code'));
  macroProcesoInput = element(by.id('field_macroProceso'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return await this.codeInput.getAttribute('value');
  }

  async setMacroProcesoInput(macroProceso) {
    await this.macroProcesoInput.sendKeys(macroProceso);
  }

  async getMacroProcesoInput() {
    return await this.macroProcesoInput.getAttribute('value');
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

export class MacroProcesoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-macroProceso-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-macroProceso'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
