/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AccionDocComponentsPage, AccionDocDeleteDialog, AccionDocUpdatePage } from './accion-doc.page-object';

const expect = chai.expect;

describe('AccionDoc e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let accionDocUpdatePage: AccionDocUpdatePage;
  let accionDocComponentsPage: AccionDocComponentsPage;
  let accionDocDeleteDialog: AccionDocDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AccionDocs', async () => {
    await navBarPage.goToEntity('accion-doc');
    accionDocComponentsPage = new AccionDocComponentsPage();
    await browser.wait(ec.visibilityOf(accionDocComponentsPage.title), 5000);
    expect(await accionDocComponentsPage.getTitle()).to.eq('sgcApp.accionDoc.home.title');
  });

  it('should load create AccionDoc page', async () => {
    await accionDocComponentsPage.clickOnCreateButton();
    accionDocUpdatePage = new AccionDocUpdatePage();
    expect(await accionDocUpdatePage.getPageTitle()).to.eq('sgcApp.accionDoc.home.createOrEditLabel');
    await accionDocUpdatePage.cancel();
  });

  it('should create and save AccionDocs', async () => {
    const nbButtonsBeforeCreate = await accionDocComponentsPage.countDeleteButtons();

    await accionDocComponentsPage.clickOnCreateButton();
    await promise.all([accionDocUpdatePage.setAccionInput('accion')]);
    expect(await accionDocUpdatePage.getAccionInput()).to.eq('accion', 'Expected Accion value to be equals to accion');
    await accionDocUpdatePage.save();
    expect(await accionDocUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await accionDocComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last AccionDoc', async () => {
    const nbButtonsBeforeDelete = await accionDocComponentsPage.countDeleteButtons();
    await accionDocComponentsPage.clickOnLastDeleteButton();

    accionDocDeleteDialog = new AccionDocDeleteDialog();
    expect(await accionDocDeleteDialog.getDialogTitle()).to.eq('sgcApp.accionDoc.delete.question');
    await accionDocDeleteDialog.clickOnConfirmButton();

    expect(await accionDocComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
