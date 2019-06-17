/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FormatosComponentsPage, FormatosDeleteDialog, FormatosUpdatePage } from './formatos.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Formatos e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let formatosUpdatePage: FormatosUpdatePage;
  let formatosComponentsPage: FormatosComponentsPage;
  let formatosDeleteDialog: FormatosDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Formatos', async () => {
    await navBarPage.goToEntity('formatos');
    formatosComponentsPage = new FormatosComponentsPage();
    await browser.wait(ec.visibilityOf(formatosComponentsPage.title), 5000);
    expect(await formatosComponentsPage.getTitle()).to.eq('sgcApp.formatos.home.title');
  });

  it('should load create Formatos page', async () => {
    await formatosComponentsPage.clickOnCreateButton();
    formatosUpdatePage = new FormatosUpdatePage();
    expect(await formatosUpdatePage.getPageTitle()).to.eq('sgcApp.formatos.home.createOrEditLabel');
    await formatosUpdatePage.cancel();
  });

  it('should create and save Formatos', async () => {
    const nbButtonsBeforeCreate = await formatosComponentsPage.countDeleteButtons();

    await formatosComponentsPage.clickOnCreateButton();
    await promise.all([
      formatosUpdatePage.setNomFormatoInput('nomFormato'),
      formatosUpdatePage.setRutaFormatoInput(absolutePath),
      formatosUpdatePage.setIdDocInput('5'),
      formatosUpdatePage.documentoSGCSelectLastOption()
    ]);
    expect(await formatosUpdatePage.getNomFormatoInput()).to.eq('nomFormato', 'Expected NomFormato value to be equals to nomFormato');
    expect(await formatosUpdatePage.getRutaFormatoInput()).to.endsWith(
      fileNameToUpload,
      'Expected RutaFormato value to be end with ' + fileNameToUpload
    );
    expect(await formatosUpdatePage.getIdDocInput()).to.eq('5', 'Expected idDoc value to be equals to 5');
    await formatosUpdatePage.save();
    expect(await formatosUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await formatosComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Formatos', async () => {
    const nbButtonsBeforeDelete = await formatosComponentsPage.countDeleteButtons();
    await formatosComponentsPage.clickOnLastDeleteButton();

    formatosDeleteDialog = new FormatosDeleteDialog();
    expect(await formatosDeleteDialog.getDialogTitle()).to.eq('sgcApp.formatos.delete.question');
    await formatosDeleteDialog.clickOnConfirmButton();

    expect(await formatosComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
