/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SolicitudComponentsPage, SolicitudDeleteDialog, SolicitudUpdatePage } from './solicitud.page-object';

const expect = chai.expect;

describe('Solicitud e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let solicitudUpdatePage: SolicitudUpdatePage;
  let solicitudComponentsPage: SolicitudComponentsPage;
  let solicitudDeleteDialog: SolicitudDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Solicituds', async () => {
    await navBarPage.goToEntity('solicitud');
    solicitudComponentsPage = new SolicitudComponentsPage();
    await browser.wait(ec.visibilityOf(solicitudComponentsPage.title), 5000);
    expect(await solicitudComponentsPage.getTitle()).to.eq('sgcApp.solicitud.home.title');
  });

  it('should load create Solicitud page', async () => {
    await solicitudComponentsPage.clickOnCreateButton();
    solicitudUpdatePage = new SolicitudUpdatePage();
    expect(await solicitudUpdatePage.getPageTitle()).to.eq('sgcApp.solicitud.home.createOrEditLabel');
    await solicitudUpdatePage.cancel();
  });

  it('should create and save Solicituds', async () => {
    const nbButtonsBeforeCreate = await solicitudComponentsPage.countDeleteButtons();

    await solicitudComponentsPage.clickOnCreateButton();
    await promise.all([
      solicitudUpdatePage.setCodeInput('5'),
      solicitudUpdatePage.setIdProcesoInput('5'),
      solicitudUpdatePage.setIdTipoDocInput('5'),
      solicitudUpdatePage.setIdTipoSolInput('5'),
      solicitudUpdatePage.setFechaSolInput('2000-12-31'),
      solicitudUpdatePage.setDescripcionInput('descripcion'),
      solicitudUpdatePage.setIdDocInput('5'),
      solicitudUpdatePage.procesoSelectLastOption(),
      solicitudUpdatePage.tipoDocSelectLastOption(),
      solicitudUpdatePage.tipoSolicitudSelectLastOption(),
      solicitudUpdatePage.documentoSGCSelectLastOption()
    ]);
    expect(await solicitudUpdatePage.getCodeInput()).to.eq('5', 'Expected code value to be equals to 5');
    expect(await solicitudUpdatePage.getIdProcesoInput()).to.eq('5', 'Expected idProceso value to be equals to 5');
    expect(await solicitudUpdatePage.getIdTipoDocInput()).to.eq('5', 'Expected idTipoDoc value to be equals to 5');
    expect(await solicitudUpdatePage.getIdTipoSolInput()).to.eq('5', 'Expected idTipoSol value to be equals to 5');
    expect(await solicitudUpdatePage.getFechaSolInput()).to.eq('2000-12-31', 'Expected fechaSol value to be equals to 2000-12-31');
    expect(await solicitudUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    expect(await solicitudUpdatePage.getIdDocInput()).to.eq('5', 'Expected idDoc value to be equals to 5');
    await solicitudUpdatePage.save();
    expect(await solicitudUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await solicitudComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Solicitud', async () => {
    const nbButtonsBeforeDelete = await solicitudComponentsPage.countDeleteButtons();
    await solicitudComponentsPage.clickOnLastDeleteButton();

    solicitudDeleteDialog = new SolicitudDeleteDialog();
    expect(await solicitudDeleteDialog.getDialogTitle()).to.eq('sgcApp.solicitud.delete.question');
    await solicitudDeleteDialog.clickOnConfirmButton();

    expect(await solicitudComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
