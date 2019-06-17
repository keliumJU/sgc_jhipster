/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MacroProcesoComponentsPage, MacroProcesoDeleteDialog, MacroProcesoUpdatePage } from './macro-proceso.page-object';

const expect = chai.expect;

describe('MacroProceso e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let macroProcesoUpdatePage: MacroProcesoUpdatePage;
  let macroProcesoComponentsPage: MacroProcesoComponentsPage;
  let macroProcesoDeleteDialog: MacroProcesoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MacroProcesos', async () => {
    await navBarPage.goToEntity('macro-proceso');
    macroProcesoComponentsPage = new MacroProcesoComponentsPage();
    await browser.wait(ec.visibilityOf(macroProcesoComponentsPage.title), 5000);
    expect(await macroProcesoComponentsPage.getTitle()).to.eq('sgcApp.macroProceso.home.title');
  });

  it('should load create MacroProceso page', async () => {
    await macroProcesoComponentsPage.clickOnCreateButton();
    macroProcesoUpdatePage = new MacroProcesoUpdatePage();
    expect(await macroProcesoUpdatePage.getPageTitle()).to.eq('sgcApp.macroProceso.home.createOrEditLabel');
    await macroProcesoUpdatePage.cancel();
  });

  it('should create and save MacroProcesos', async () => {
    const nbButtonsBeforeCreate = await macroProcesoComponentsPage.countDeleteButtons();

    await macroProcesoComponentsPage.clickOnCreateButton();
    await promise.all([macroProcesoUpdatePage.setCodeInput('5'), macroProcesoUpdatePage.setMacroProcesoInput('macroProceso')]);
    expect(await macroProcesoUpdatePage.getCodeInput()).to.eq('5', 'Expected code value to be equals to 5');
    expect(await macroProcesoUpdatePage.getMacroProcesoInput()).to.eq(
      'macroProceso',
      'Expected MacroProceso value to be equals to macroProceso'
    );
    await macroProcesoUpdatePage.save();
    expect(await macroProcesoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await macroProcesoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MacroProceso', async () => {
    const nbButtonsBeforeDelete = await macroProcesoComponentsPage.countDeleteButtons();
    await macroProcesoComponentsPage.clickOnLastDeleteButton();

    macroProcesoDeleteDialog = new MacroProcesoDeleteDialog();
    expect(await macroProcesoDeleteDialog.getDialogTitle()).to.eq('sgcApp.macroProceso.delete.question');
    await macroProcesoDeleteDialog.clickOnConfirmButton();

    expect(await macroProcesoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
