import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class CargoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-cargo div table .btn-danger'));
  title = element.all(by.css('jhi-cargo div h2#page-heading span')).first();

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

export class CargoUpdatePage {
  pageTitle = element(by.id('jhi-cargo-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  cargoInput = element(by.id('field_cargo'));
  correoInstInput = element(by.id('field_correoInst'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCargoInput(cargo) {
    await this.cargoInput.sendKeys(cargo);
  }

  async getCargoInput() {
    return await this.cargoInput.getAttribute('value');
  }

  async setCorreoInstInput(correoInst) {
    await this.correoInstInput.sendKeys(correoInst);
  }

  async getCorreoInstInput() {
    return await this.correoInstInput.getAttribute('value');
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

export class CargoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-cargo-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-cargo'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
