/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProcesoComponentsPage, ProcesoDeleteDialog, ProcesoUpdatePage } from './proceso.page-object';

const expect = chai.expect;

describe('Proceso e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let procesoUpdatePage: ProcesoUpdatePage;
  let procesoComponentsPage: ProcesoComponentsPage;
  let procesoDeleteDialog: ProcesoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Procesos', async () => {
    await navBarPage.goToEntity('proceso');
    procesoComponentsPage = new ProcesoComponentsPage();
    await browser.wait(ec.visibilityOf(procesoComponentsPage.title), 5000);
    expect(await procesoComponentsPage.getTitle()).to.eq('sgcApp.proceso.home.title');
  });

  it('should load create Proceso page', async () => {
    await procesoComponentsPage.clickOnCreateButton();
    procesoUpdatePage = new ProcesoUpdatePage();
    expect(await procesoUpdatePage.getPageTitle()).to.eq('sgcApp.proceso.home.createOrEditLabel');
    await procesoUpdatePage.cancel();
  });

  it('should create and save Procesos', async () => {
    const nbButtonsBeforeCreate = await procesoComponentsPage.countDeleteButtons();

    await procesoComponentsPage.clickOnCreateButton();
    await promise.all([
      procesoUpdatePage.setCodeInput('5'),
      procesoUpdatePage.setProcesoInput('proceso'),
      procesoUpdatePage.setIdMacroProcesoInput('5'),
      procesoUpdatePage.setCodDocInput('codDoc'),
      procesoUpdatePage.macroProcesoSelectLastOption()
    ]);
    expect(await procesoUpdatePage.getCodeInput()).to.eq('5', 'Expected code value to be equals to 5');
    expect(await procesoUpdatePage.getProcesoInput()).to.eq('proceso', 'Expected Proceso value to be equals to proceso');
    expect(await procesoUpdatePage.getIdMacroProcesoInput()).to.eq('5', 'Expected idMacroProceso value to be equals to 5');
    expect(await procesoUpdatePage.getCodDocInput()).to.eq('codDoc', 'Expected CodDoc value to be equals to codDoc');
    await procesoUpdatePage.save();
    expect(await procesoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await procesoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Proceso', async () => {
    const nbButtonsBeforeDelete = await procesoComponentsPage.countDeleteButtons();
    await procesoComponentsPage.clickOnLastDeleteButton();

    procesoDeleteDialog = new ProcesoDeleteDialog();
    expect(await procesoDeleteDialog.getDialogTitle()).to.eq('sgcApp.proceso.delete.question');
    await procesoDeleteDialog.clickOnConfirmButton();

    expect(await procesoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
