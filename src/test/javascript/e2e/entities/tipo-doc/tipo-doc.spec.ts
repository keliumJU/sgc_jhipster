/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TipoDocComponentsPage, TipoDocDeleteDialog, TipoDocUpdatePage } from './tipo-doc.page-object';

const expect = chai.expect;

describe('TipoDoc e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoDocUpdatePage: TipoDocUpdatePage;
  let tipoDocComponentsPage: TipoDocComponentsPage;
  let tipoDocDeleteDialog: TipoDocDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoDocs', async () => {
    await navBarPage.goToEntity('tipo-doc');
    tipoDocComponentsPage = new TipoDocComponentsPage();
    await browser.wait(ec.visibilityOf(tipoDocComponentsPage.title), 5000);
    expect(await tipoDocComponentsPage.getTitle()).to.eq('sgcApp.tipoDoc.home.title');
  });

  it('should load create TipoDoc page', async () => {
    await tipoDocComponentsPage.clickOnCreateButton();
    tipoDocUpdatePage = new TipoDocUpdatePage();
    expect(await tipoDocUpdatePage.getPageTitle()).to.eq('sgcApp.tipoDoc.home.createOrEditLabel');
    await tipoDocUpdatePage.cancel();
  });

  it('should create and save TipoDocs', async () => {
    const nbButtonsBeforeCreate = await tipoDocComponentsPage.countDeleteButtons();

    await tipoDocComponentsPage.clickOnCreateButton();
    await promise.all([
      tipoDocUpdatePage.setCodeInput('5'),
      tipoDocUpdatePage.setTipoDocInput('tipoDoc'),
      tipoDocUpdatePage.setCodTipInput('codTip')
    ]);
    expect(await tipoDocUpdatePage.getCodeInput()).to.eq('5', 'Expected code value to be equals to 5');
    expect(await tipoDocUpdatePage.getTipoDocInput()).to.eq('tipoDoc', 'Expected TipoDoc value to be equals to tipoDoc');
    expect(await tipoDocUpdatePage.getCodTipInput()).to.eq('codTip', 'Expected CodTip value to be equals to codTip');
    await tipoDocUpdatePage.save();
    expect(await tipoDocUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoDocComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoDoc', async () => {
    const nbButtonsBeforeDelete = await tipoDocComponentsPage.countDeleteButtons();
    await tipoDocComponentsPage.clickOnLastDeleteButton();

    tipoDocDeleteDialog = new TipoDocDeleteDialog();
    expect(await tipoDocDeleteDialog.getDialogTitle()).to.eq('sgcApp.tipoDoc.delete.question');
    await tipoDocDeleteDialog.clickOnConfirmButton();

    expect(await tipoDocComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
