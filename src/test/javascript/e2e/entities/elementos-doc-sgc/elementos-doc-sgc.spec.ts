/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ElementosDocSGCComponentsPage, ElementosDocSGCDeleteDialog, ElementosDocSGCUpdatePage } from './elementos-doc-sgc.page-object';

const expect = chai.expect;

describe('ElementosDocSGC e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let elementosDocSGCUpdatePage: ElementosDocSGCUpdatePage;
  let elementosDocSGCComponentsPage: ElementosDocSGCComponentsPage;
  let elementosDocSGCDeleteDialog: ElementosDocSGCDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ElementosDocSGCS', async () => {
    await navBarPage.goToEntity('elementos-doc-sgc');
    elementosDocSGCComponentsPage = new ElementosDocSGCComponentsPage();
    await browser.wait(ec.visibilityOf(elementosDocSGCComponentsPage.title), 5000);
    expect(await elementosDocSGCComponentsPage.getTitle()).to.eq('sgcApp.elementosDocSGC.home.title');
  });

  it('should load create ElementosDocSGC page', async () => {
    await elementosDocSGCComponentsPage.clickOnCreateButton();
    elementosDocSGCUpdatePage = new ElementosDocSGCUpdatePage();
    expect(await elementosDocSGCUpdatePage.getPageTitle()).to.eq('sgcApp.elementosDocSGC.home.createOrEditLabel');
    await elementosDocSGCUpdatePage.cancel();
  });

  it('should create and save ElementosDocSGCS', async () => {
    const nbButtonsBeforeCreate = await elementosDocSGCComponentsPage.countDeleteButtons();

    await elementosDocSGCComponentsPage.clickOnCreateButton();
    await promise.all([
      elementosDocSGCUpdatePage.setIdElementoInput('5'),
      elementosDocSGCUpdatePage.setIdDocInput('5'),
      elementosDocSGCUpdatePage.setValorInput('valor'),
      elementosDocSGCUpdatePage.documentoDocSGCSelectLastOption(),
      elementosDocSGCUpdatePage.elementosSelectLastOption()
    ]);
    expect(await elementosDocSGCUpdatePage.getIdElementoInput()).to.eq('5', 'Expected idElemento value to be equals to 5');
    expect(await elementosDocSGCUpdatePage.getIdDocInput()).to.eq('5', 'Expected idDoc value to be equals to 5');
    expect(await elementosDocSGCUpdatePage.getValorInput()).to.eq('valor', 'Expected Valor value to be equals to valor');
    await elementosDocSGCUpdatePage.save();
    expect(await elementosDocSGCUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await elementosDocSGCComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ElementosDocSGC', async () => {
    const nbButtonsBeforeDelete = await elementosDocSGCComponentsPage.countDeleteButtons();
    await elementosDocSGCComponentsPage.clickOnLastDeleteButton();

    elementosDocSGCDeleteDialog = new ElementosDocSGCDeleteDialog();
    expect(await elementosDocSGCDeleteDialog.getDialogTitle()).to.eq('sgcApp.elementosDocSGC.delete.question');
    await elementosDocSGCDeleteDialog.clickOnConfirmButton();

    expect(await elementosDocSGCComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
