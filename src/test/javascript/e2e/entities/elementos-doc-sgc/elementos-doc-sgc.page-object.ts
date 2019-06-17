import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ElementosDocSGCComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-elementos-doc-sgc div table .btn-danger'));
  title = element.all(by.css('jhi-elementos-doc-sgc div h2#page-heading span')).first();

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

export class ElementosDocSGCUpdatePage {
  pageTitle = element(by.id('jhi-elementos-doc-sgc-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  idElementoInput = element(by.id('field_idElemento'));
  idDocInput = element(by.id('field_idDoc'));
  valorInput = element(by.id('field_valor'));
  documentoDocSGCSelect = element(by.id('field_documentoDocSGC'));
  elementosSelect = element(by.id('field_elementos'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdElementoInput(idElemento) {
    await this.idElementoInput.sendKeys(idElemento);
  }

  async getIdElementoInput() {
    return await this.idElementoInput.getAttribute('value');
  }

  async setIdDocInput(idDoc) {
    await this.idDocInput.sendKeys(idDoc);
  }

  async getIdDocInput() {
    return await this.idDocInput.getAttribute('value');
  }

  async setValorInput(valor) {
    await this.valorInput.sendKeys(valor);
  }

  async getValorInput() {
    return await this.valorInput.getAttribute('value');
  }

  async documentoDocSGCSelectLastOption(timeout?: number) {
    await this.documentoDocSGCSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async documentoDocSGCSelectOption(option) {
    await this.documentoDocSGCSelect.sendKeys(option);
  }

  getDocumentoDocSGCSelect(): ElementFinder {
    return this.documentoDocSGCSelect;
  }

  async getDocumentoDocSGCSelectedOption() {
    return await this.documentoDocSGCSelect.element(by.css('option:checked')).getText();
  }

  async elementosSelectLastOption(timeout?: number) {
    await this.elementosSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async elementosSelectOption(option) {
    await this.elementosSelect.sendKeys(option);
  }

  getElementosSelect(): ElementFinder {
    return this.elementosSelect;
  }

  async getElementosSelectedOption() {
    return await this.elementosSelect.element(by.css('option:checked')).getText();
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

export class ElementosDocSGCDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-elementosDocSGC-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-elementosDocSGC'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
