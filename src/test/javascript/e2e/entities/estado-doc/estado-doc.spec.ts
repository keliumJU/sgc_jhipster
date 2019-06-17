/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EstadoDocComponentsPage, EstadoDocDeleteDialog, EstadoDocUpdatePage } from './estado-doc.page-object';

const expect = chai.expect;

describe('EstadoDoc e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let estadoDocUpdatePage: EstadoDocUpdatePage;
  let estadoDocComponentsPage: EstadoDocComponentsPage;
  let estadoDocDeleteDialog: EstadoDocDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load EstadoDocs', async () => {
    await navBarPage.goToEntity('estado-doc');
    estadoDocComponentsPage = new EstadoDocComponentsPage();
    await browser.wait(ec.visibilityOf(estadoDocComponentsPage.title), 5000);
    expect(await estadoDocComponentsPage.getTitle()).to.eq('sgcApp.estadoDoc.home.title');
  });

  it('should load create EstadoDoc page', async () => {
    await estadoDocComponentsPage.clickOnCreateButton();
    estadoDocUpdatePage = new EstadoDocUpdatePage();
    expect(await estadoDocUpdatePage.getPageTitle()).to.eq('sgcApp.estadoDoc.home.createOrEditLabel');
    await estadoDocUpdatePage.cancel();
  });

  it('should create and save EstadoDocs', async () => {
    const nbButtonsBeforeCreate = await estadoDocComponentsPage.countDeleteButtons();

    await estadoDocComponentsPage.clickOnCreateButton();
    await promise.all([estadoDocUpdatePage.setEstadoInput('estado')]);
    expect(await estadoDocUpdatePage.getEstadoInput()).to.eq('estado', 'Expected Estado value to be equals to estado');
    await estadoDocUpdatePage.save();
    expect(await estadoDocUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await estadoDocComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last EstadoDoc', async () => {
    const nbButtonsBeforeDelete = await estadoDocComponentsPage.countDeleteButtons();
    await estadoDocComponentsPage.clickOnLastDeleteButton();

    estadoDocDeleteDialog = new EstadoDocDeleteDialog();
    expect(await estadoDocDeleteDialog.getDialogTitle()).to.eq('sgcApp.estadoDoc.delete.question');
    await estadoDocDeleteDialog.clickOnConfirmButton();

    expect(await estadoDocComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
