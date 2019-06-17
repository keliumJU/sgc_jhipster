import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class TipoSolicitudComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tipo-solicitud div table .btn-danger'));
  title = element.all(by.css('jhi-tipo-solicitud div h2#page-heading span')).first();

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

export class TipoSolicitudUpdatePage {
  pageTitle = element(by.id('jhi-tipo-solicitud-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codeInput = element(by.id('field_code'));
  tipoSolInput = element(by.id('field_tipoSol'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return await this.codeInput.getAttribute('value');
  }

  async setTipoSolInput(tipoSol) {
    await this.tipoSolInput.sendKeys(tipoSol);
  }

  async getTipoSolInput() {
    return await this.tipoSolInput.getAttribute('value');
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

export class TipoSolicitudDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tipoSolicitud-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tipoSolicitud'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
