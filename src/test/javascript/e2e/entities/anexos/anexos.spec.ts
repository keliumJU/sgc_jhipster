/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AnexosComponentsPage, AnexosDeleteDialog, AnexosUpdatePage } from './anexos.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Anexos e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let anexosUpdatePage: AnexosUpdatePage;
  let anexosComponentsPage: AnexosComponentsPage;
  let anexosDeleteDialog: AnexosDeleteDialog;
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

  it('should load Anexos', async () => {
    await navBarPage.goToEntity('anexos');
    anexosComponentsPage = new AnexosComponentsPage();
    await browser.wait(ec.visibilityOf(anexosComponentsPage.title), 5000);
    expect(await anexosComponentsPage.getTitle()).to.eq('sgcApp.anexos.home.title');
  });

  it('should load create Anexos page', async () => {
    await anexosComponentsPage.clickOnCreateButton();
    anexosUpdatePage = new AnexosUpdatePage();
    expect(await anexosUpdatePage.getPageTitle()).to.eq('sgcApp.anexos.home.createOrEditLabel');
    await anexosUpdatePage.cancel();
  });

  it('should create and save Anexos', async () => {
    const nbButtonsBeforeCreate = await anexosComponentsPage.countDeleteButtons();

    await anexosComponentsPage.clickOnCreateButton();
    await promise.all([
      anexosUpdatePage.setNomAnexoInput('nomAnexo'),
      anexosUpdatePage.setDescripcionInput('descripcion'),
      anexosUpdatePage.setImgInput(absolutePath),
      anexosUpdatePage.setIdPadreInput('5'),
      anexosUpdatePage.setIdDocInput('5'),
      anexosUpdatePage.documentoSGCSelectLastOption()
    ]);
    expect(await anexosUpdatePage.getNomAnexoInput()).to.eq('nomAnexo', 'Expected NomAnexo value to be equals to nomAnexo');
    expect(await anexosUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    expect(await anexosUpdatePage.getImgInput()).to.endsWith(fileNameToUpload, 'Expected Img value to be end with ' + fileNameToUpload);
    expect(await anexosUpdatePage.getIdPadreInput()).to.eq('5', 'Expected idPadre value to be equals to 5');
    expect(await anexosUpdatePage.getIdDocInput()).to.eq('5', 'Expected idDoc value to be equals to 5');
    await anexosUpdatePage.save();
    expect(await anexosUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await anexosComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Anexos', async () => {
    const nbButtonsBeforeDelete = await anexosComponentsPage.countDeleteButtons();
    await anexosComponentsPage.clickOnLastDeleteButton();

    anexosDeleteDialog = new AnexosDeleteDialog();
    expect(await anexosDeleteDialog.getDialogTitle()).to.eq('sgcApp.anexos.delete.question');
    await anexosDeleteDialog.clickOnConfirmButton();

    expect(await anexosComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
