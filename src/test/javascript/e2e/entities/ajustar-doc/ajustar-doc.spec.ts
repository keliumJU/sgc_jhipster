/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AjustarDocComponentsPage, AjustarDocDeleteDialog, AjustarDocUpdatePage } from './ajustar-doc.page-object';

const expect = chai.expect;

describe('AjustarDoc e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ajustarDocUpdatePage: AjustarDocUpdatePage;
  let ajustarDocComponentsPage: AjustarDocComponentsPage;
  let ajustarDocDeleteDialog: AjustarDocDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AjustarDocs', async () => {
    await navBarPage.goToEntity('ajustar-doc');
    ajustarDocComponentsPage = new AjustarDocComponentsPage();
    await browser.wait(ec.visibilityOf(ajustarDocComponentsPage.title), 5000);
    expect(await ajustarDocComponentsPage.getTitle()).to.eq('sgcApp.ajustarDoc.home.title');
  });

  it('should load create AjustarDoc page', async () => {
    await ajustarDocComponentsPage.clickOnCreateButton();
    ajustarDocUpdatePage = new AjustarDocUpdatePage();
    expect(await ajustarDocUpdatePage.getPageTitle()).to.eq('sgcApp.ajustarDoc.home.createOrEditLabel');
    await ajustarDocUpdatePage.cancel();
  });

  it('should create and save AjustarDocs', async () => {
    const nbButtonsBeforeCreate = await ajustarDocComponentsPage.countDeleteButtons();

    await ajustarDocComponentsPage.clickOnCreateButton();
    await promise.all([
      ajustarDocUpdatePage.setCodeInput('5'),
      ajustarDocUpdatePage.setIdUserInput('idUser'),
      ajustarDocUpdatePage.setIdCargoInput('5'),
      ajustarDocUpdatePage.setIdAccionInput('5'),
      ajustarDocUpdatePage.setIdDocInput('5'),
      ajustarDocUpdatePage.documentoSGCSelectLastOption(),
      ajustarDocUpdatePage.userSelectLastOption(),
      ajustarDocUpdatePage.cargoSelectLastOption(),
      ajustarDocUpdatePage.accionDocSelectLastOption()
    ]);
    expect(await ajustarDocUpdatePage.getCodeInput()).to.eq('5', 'Expected code value to be equals to 5');
    expect(await ajustarDocUpdatePage.getIdUserInput()).to.eq('idUser', 'Expected IdUser value to be equals to idUser');
    expect(await ajustarDocUpdatePage.getIdCargoInput()).to.eq('5', 'Expected idCargo value to be equals to 5');
    expect(await ajustarDocUpdatePage.getIdAccionInput()).to.eq('5', 'Expected idAccion value to be equals to 5');
    expect(await ajustarDocUpdatePage.getIdDocInput()).to.eq('5', 'Expected idDoc value to be equals to 5');
    await ajustarDocUpdatePage.save();
    expect(await ajustarDocUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ajustarDocComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last AjustarDoc', async () => {
    const nbButtonsBeforeDelete = await ajustarDocComponentsPage.countDeleteButtons();
    await ajustarDocComponentsPage.clickOnLastDeleteButton();

    ajustarDocDeleteDialog = new AjustarDocDeleteDialog();
    expect(await ajustarDocDeleteDialog.getDialogTitle()).to.eq('sgcApp.ajustarDoc.delete.question');
    await ajustarDocDeleteDialog.clickOnConfirmButton();

    expect(await ajustarDocComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
