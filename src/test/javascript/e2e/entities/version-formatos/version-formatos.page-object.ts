import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class VersionFormatosComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-version-formatos div table .btn-danger'));
  title = element.all(by.css('jhi-version-formatos div h2#page-heading span')).first();

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

export class VersionFormatosUpdatePage {
  pageTitle = element(by.id('jhi-version-formatos-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codeInput = element(by.id('field_code'));
  idFormatoInput = element(by.id('field_idFormato'));
  rutaFormatoInput = element(by.id('file_rutaFormato'));
  nomFormatoInput = element(by.id('field_nomFormato'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return await this.codeInput.getAttribute('value');
  }

  async setIdFormatoInput(idFormato) {
    await this.idFormatoInput.sendKeys(idFormato);
  }

  async getIdFormatoInput() {
    return await this.idFormatoInput.getAttribute('value');
  }

  async setRutaFormatoInput(rutaFormato) {
    await this.rutaFormatoInput.sendKeys(rutaFormato);
  }

  async getRutaFormatoInput() {
    return await this.rutaFormatoInput.getAttribute('value');
  }

  async setNomFormatoInput(nomFormato) {
    await this.nomFormatoInput.sendKeys(nomFormato);
  }

  async getNomFormatoInput() {
    return await this.nomFormatoInput.getAttribute('value');
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

export class VersionFormatosDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-versionFormatos-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-versionFormatos'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
