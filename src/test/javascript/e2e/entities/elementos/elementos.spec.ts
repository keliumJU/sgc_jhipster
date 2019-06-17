/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ElementosComponentsPage, ElementosDeleteDialog, ElementosUpdatePage } from './elementos.page-object';

const expect = chai.expect;

describe('Elementos e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let elementosUpdatePage: ElementosUpdatePage;
  let elementosComponentsPage: ElementosComponentsPage;
  let elementosDeleteDialog: ElementosDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Elementos', async () => {
    await navBarPage.goToEntity('elementos');
    elementosComponentsPage = new ElementosComponentsPage();
    await browser.wait(ec.visibilityOf(elementosComponentsPage.title), 5000);
    expect(await elementosComponentsPage.getTitle()).to.eq('sgcApp.elementos.home.title');
  });

  it('should load create Elementos page', async () => {
    await elementosComponentsPage.clickOnCreateButton();
    elementosUpdatePage = new ElementosUpdatePage();
    expect(await elementosUpdatePage.getPageTitle()).to.eq('sgcApp.elementos.home.createOrEditLabel');
    await elementosUpdatePage.cancel();
  });

  it('should create and save Elementos', async () => {
    const nbButtonsBeforeCreate = await elementosComponentsPage.countDeleteButtons();

    await elementosComponentsPage.clickOnCreateButton();
    await promise.all([elementosUpdatePage.setElementoInput('elemento'), elementosUpdatePage.setDescripcionInput('descripcion')]);
    expect(await elementosUpdatePage.getElementoInput()).to.eq('elemento', 'Expected Elemento value to be equals to elemento');
    expect(await elementosUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    await elementosUpdatePage.save();
    expect(await elementosUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await elementosComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Elementos', async () => {
    const nbButtonsBeforeDelete = await elementosComponentsPage.countDeleteButtons();
    await elementosComponentsPage.clickOnLastDeleteButton();

    elementosDeleteDialog = new ElementosDeleteDialog();
    expect(await elementosDeleteDialog.getDialogTitle()).to.eq('sgcApp.elementos.delete.question');
    await elementosDeleteDialog.clickOnConfirmButton();

    expect(await elementosComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
