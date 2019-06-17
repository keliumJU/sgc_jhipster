import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class DocRevisionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-doc-revision div table .btn-danger'));
  title = element.all(by.css('jhi-doc-revision div h2#page-heading span')).first();

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

export class DocRevisionUpdatePage {
  pageTitle = element(by.id('jhi-doc-revision-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codeInput = element(by.id('field_code'));
  idUserInput = element(by.id('field_idUser'));
  idDocInput = element(by.id('field_idDoc'));
  comentario1Input = element(by.id('field_comentario1'));
  comentario2Input = element(by.id('field_comentario2'));
  documentoSGCSelect = element(by.id('field_documentoSGC'));
  userSelect = element(by.id('field_user'));

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

  async setIdDocInput(idDoc) {
    await this.idDocInput.sendKeys(idDoc);
  }

  async getIdDocInput() {
    return await this.idDocInput.getAttribute('value');
  }

  async setComentario1Input(comentario1) {
    await this.comentario1Input.sendKeys(comentario1);
  }

  async getComentario1Input() {
    return await this.comentario1Input.getAttribute('value');
  }

  async setComentario2Input(comentario2) {
    await this.comentario2Input.sendKeys(comentario2);
  }

  async getComentario2Input() {
    return await this.comentario2Input.getAttribute('value');
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

export class DocRevisionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-docRevision-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-docRevision'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
