/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DocumentoSGCComponentsPage, DocumentoSGCDeleteDialog, DocumentoSGCUpdatePage } from './documento-sgc.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('DocumentoSGC e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let documentoSGCUpdatePage: DocumentoSGCUpdatePage;
  let documentoSGCComponentsPage: DocumentoSGCComponentsPage;
  let documentoSGCDeleteDialog: DocumentoSGCDeleteDialog;
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

  it('should load DocumentoSGCS', async () => {
    await navBarPage.goToEntity('documento-sgc');
    documentoSGCComponentsPage = new DocumentoSGCComponentsPage();
    await browser.wait(ec.visibilityOf(documentoSGCComponentsPage.title), 5000);
    expect(await documentoSGCComponentsPage.getTitle()).to.eq('sgcApp.documentoSGC.home.title');
  });

  it('should load create DocumentoSGC page', async () => {
    await documentoSGCComponentsPage.clickOnCreateButton();
    documentoSGCUpdatePage = new DocumentoSGCUpdatePage();
    expect(await documentoSGCUpdatePage.getPageTitle()).to.eq('sgcApp.documentoSGC.home.createOrEditLabel');
    await documentoSGCUpdatePage.cancel();
  });

  it('should create and save DocumentoSGCS', async () => {
    const nbButtonsBeforeCreate = await documentoSGCComponentsPage.countDeleteButtons();

    await documentoSGCComponentsPage.clickOnCreateButton();
    await promise.all([
      documentoSGCUpdatePage.setCodigoInput('5'),
      documentoSGCUpdatePage.setIdProcesoInput('5'),
      documentoSGCUpdatePage.setIdTipoDocInput('5'),
      documentoSGCUpdatePage.setNomDocInput('nomDoc'),
      documentoSGCUpdatePage.setRutaInput(absolutePath),
      documentoSGCUpdatePage.setIdEstadoInput('5'),
      documentoSGCUpdatePage.setVersionInput('5'),
      documentoSGCUpdatePage.estadoDocSelectLastOption(),
      documentoSGCUpdatePage.procesoSelectLastOption(),
      documentoSGCUpdatePage.tipoDocSelectLastOption()
    ]);
    expect(await documentoSGCUpdatePage.getCodigoInput()).to.eq('5', 'Expected codigo value to be equals to 5');
    expect(await documentoSGCUpdatePage.getIdProcesoInput()).to.eq('5', 'Expected idProceso value to be equals to 5');
    expect(await documentoSGCUpdatePage.getIdTipoDocInput()).to.eq('5', 'Expected idTipoDoc value to be equals to 5');
    expect(await documentoSGCUpdatePage.getNomDocInput()).to.eq('nomDoc', 'Expected NomDoc value to be equals to nomDoc');
    expect(await documentoSGCUpdatePage.getRutaInput()).to.endsWith(
      fileNameToUpload,
      'Expected Ruta value to be end with ' + fileNameToUpload
    );
    expect(await documentoSGCUpdatePage.getIdEstadoInput()).to.eq('5', 'Expected idEstado value to be equals to 5');
    expect(await documentoSGCUpdatePage.getVersionInput()).to.eq('5', 'Expected version value to be equals to 5');
    await documentoSGCUpdatePage.save();
    expect(await documentoSGCUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await documentoSGCComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last DocumentoSGC', async () => {
    const nbButtonsBeforeDelete = await documentoSGCComponentsPage.countDeleteButtons();
    await documentoSGCComponentsPage.clickOnLastDeleteButton();

    documentoSGCDeleteDialog = new DocumentoSGCDeleteDialog();
    expect(await documentoSGCDeleteDialog.getDialogTitle()).to.eq('sgcApp.documentoSGC.delete.question');
    await documentoSGCDeleteDialog.clickOnConfirmButton();

    expect(await documentoSGCComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
