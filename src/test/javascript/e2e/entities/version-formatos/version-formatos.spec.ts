/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VersionFormatosComponentsPage, VersionFormatosDeleteDialog, VersionFormatosUpdatePage } from './version-formatos.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('VersionFormatos e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let versionFormatosUpdatePage: VersionFormatosUpdatePage;
  let versionFormatosComponentsPage: VersionFormatosComponentsPage;
  let versionFormatosDeleteDialog: VersionFormatosDeleteDialog;
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

  it('should load VersionFormatos', async () => {
    await navBarPage.goToEntity('version-formatos');
    versionFormatosComponentsPage = new VersionFormatosComponentsPage();
    await browser.wait(ec.visibilityOf(versionFormatosComponentsPage.title), 5000);
    expect(await versionFormatosComponentsPage.getTitle()).to.eq('sgcApp.versionFormatos.home.title');
  });

  it('should load create VersionFormatos page', async () => {
    await versionFormatosComponentsPage.clickOnCreateButton();
    versionFormatosUpdatePage = new VersionFormatosUpdatePage();
    expect(await versionFormatosUpdatePage.getPageTitle()).to.eq('sgcApp.versionFormatos.home.createOrEditLabel');
    await versionFormatosUpdatePage.cancel();
  });

  it('should create and save VersionFormatos', async () => {
    const nbButtonsBeforeCreate = await versionFormatosComponentsPage.countDeleteButtons();

    await versionFormatosComponentsPage.clickOnCreateButton();
    await promise.all([
      versionFormatosUpdatePage.setCodeInput('5'),
      versionFormatosUpdatePage.setIdFormatoInput('5'),
      versionFormatosUpdatePage.setRutaFormatoInput(absolutePath),
      versionFormatosUpdatePage.setNomFormatoInput('nomFormato')
    ]);
    expect(await versionFormatosUpdatePage.getCodeInput()).to.eq('5', 'Expected code value to be equals to 5');
    expect(await versionFormatosUpdatePage.getIdFormatoInput()).to.eq('5', 'Expected idFormato value to be equals to 5');
    expect(await versionFormatosUpdatePage.getRutaFormatoInput()).to.endsWith(
      fileNameToUpload,
      'Expected RutaFormato value to be end with ' + fileNameToUpload
    );
    expect(await versionFormatosUpdatePage.getNomFormatoInput()).to.eq(
      'nomFormato',
      'Expected NomFormato value to be equals to nomFormato'
    );
    await versionFormatosUpdatePage.save();
    expect(await versionFormatosUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await versionFormatosComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last VersionFormatos', async () => {
    const nbButtonsBeforeDelete = await versionFormatosComponentsPage.countDeleteButtons();
    await versionFormatosComponentsPage.clickOnLastDeleteButton();

    versionFormatosDeleteDialog = new VersionFormatosDeleteDialog();
    expect(await versionFormatosDeleteDialog.getDialogTitle()).to.eq('sgcApp.versionFormatos.delete.question');
    await versionFormatosDeleteDialog.clickOnConfirmButton();

    expect(await versionFormatosComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
