/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { HistorialCambiosComponentsPage, HistorialCambiosDeleteDialog, HistorialCambiosUpdatePage } from './historial-cambios.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('HistorialCambios e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let historialCambiosUpdatePage: HistorialCambiosUpdatePage;
  let historialCambiosComponentsPage: HistorialCambiosComponentsPage;
  let historialCambiosDeleteDialog: HistorialCambiosDeleteDialog;
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

  it('should load HistorialCambios', async () => {
    await navBarPage.goToEntity('historial-cambios');
    historialCambiosComponentsPage = new HistorialCambiosComponentsPage();
    await browser.wait(ec.visibilityOf(historialCambiosComponentsPage.title), 5000);
    expect(await historialCambiosComponentsPage.getTitle()).to.eq('sgcApp.historialCambios.home.title');
  });

  it('should load create HistorialCambios page', async () => {
    await historialCambiosComponentsPage.clickOnCreateButton();
    historialCambiosUpdatePage = new HistorialCambiosUpdatePage();
    expect(await historialCambiosUpdatePage.getPageTitle()).to.eq('sgcApp.historialCambios.home.createOrEditLabel');
    await historialCambiosUpdatePage.cancel();
  });

  it('should create and save HistorialCambios', async () => {
    const nbButtonsBeforeCreate = await historialCambiosComponentsPage.countDeleteButtons();

    await historialCambiosComponentsPage.clickOnCreateButton();
    await promise.all([
      historialCambiosUpdatePage.setCodeInput('5'),
      historialCambiosUpdatePage.setActividadInput('actividad'),
      historialCambiosUpdatePage.setCambioInput('cambio'),
      historialCambiosUpdatePage.setFechaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      historialCambiosUpdatePage.setVVigenteInput('2000-12-31'),
      historialCambiosUpdatePage.setVObsoletaInput('2000-12-31'),
      historialCambiosUpdatePage.setIdDocInput('5'),
      historialCambiosUpdatePage.setRutaInput(absolutePath),
      historialCambiosUpdatePage.documentoSGCSelectLastOption()
    ]);
    expect(await historialCambiosUpdatePage.getCodeInput()).to.eq('5', 'Expected code value to be equals to 5');
    expect(await historialCambiosUpdatePage.getActividadInput()).to.eq('actividad', 'Expected Actividad value to be equals to actividad');
    expect(await historialCambiosUpdatePage.getCambioInput()).to.eq('cambio', 'Expected Cambio value to be equals to cambio');
    expect(await historialCambiosUpdatePage.getFechaInput()).to.contain(
      '2001-01-01T02:30',
      'Expected fecha value to be equals to 2000-12-31'
    );
    expect(await historialCambiosUpdatePage.getVVigenteInput()).to.eq('2000-12-31', 'Expected vVigente value to be equals to 2000-12-31');
    expect(await historialCambiosUpdatePage.getVObsoletaInput()).to.eq('2000-12-31', 'Expected vObsoleta value to be equals to 2000-12-31');
    expect(await historialCambiosUpdatePage.getIdDocInput()).to.eq('5', 'Expected idDoc value to be equals to 5');
    expect(await historialCambiosUpdatePage.getRutaInput()).to.endsWith(
      fileNameToUpload,
      'Expected Ruta value to be end with ' + fileNameToUpload
    );
    await historialCambiosUpdatePage.save();
    expect(await historialCambiosUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await historialCambiosComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last HistorialCambios', async () => {
    const nbButtonsBeforeDelete = await historialCambiosComponentsPage.countDeleteButtons();
    await historialCambiosComponentsPage.clickOnLastDeleteButton();

    historialCambiosDeleteDialog = new HistorialCambiosDeleteDialog();
    expect(await historialCambiosDeleteDialog.getDialogTitle()).to.eq('sgcApp.historialCambios.delete.question');
    await historialCambiosDeleteDialog.clickOnConfirmButton();

    expect(await historialCambiosComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
