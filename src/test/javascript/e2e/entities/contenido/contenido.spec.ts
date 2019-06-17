/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ContenidoComponentsPage, ContenidoDeleteDialog, ContenidoUpdatePage } from './contenido.page-object';

const expect = chai.expect;

describe('Contenido e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let contenidoUpdatePage: ContenidoUpdatePage;
  let contenidoComponentsPage: ContenidoComponentsPage;
  let contenidoDeleteDialog: ContenidoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Contenidos', async () => {
    await navBarPage.goToEntity('contenido');
    contenidoComponentsPage = new ContenidoComponentsPage();
    await browser.wait(ec.visibilityOf(contenidoComponentsPage.title), 5000);
    expect(await contenidoComponentsPage.getTitle()).to.eq('sgcApp.contenido.home.title');
  });

  it('should load create Contenido page', async () => {
    await contenidoComponentsPage.clickOnCreateButton();
    contenidoUpdatePage = new ContenidoUpdatePage();
    expect(await contenidoUpdatePage.getPageTitle()).to.eq('sgcApp.contenido.home.createOrEditLabel');
    await contenidoUpdatePage.cancel();
  });

  it('should create and save Contenidos', async () => {
    const nbButtonsBeforeCreate = await contenidoComponentsPage.countDeleteButtons();

    await contenidoComponentsPage.clickOnCreateButton();
    await promise.all([
      contenidoUpdatePage.setActividadInput('actividad'),
      contenidoUpdatePage.setDescripcionInput('descripcion'),
      contenidoUpdatePage.setResponsableInput('responsable'),
      contenidoUpdatePage.setRegistroInput('registro'),
      contenidoUpdatePage.setIdDocInput('5'),
      contenidoUpdatePage.documentoSGCSelectLastOption()
    ]);
    expect(await contenidoUpdatePage.getActividadInput()).to.eq('actividad', 'Expected Actividad value to be equals to actividad');
    expect(await contenidoUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    expect(await contenidoUpdatePage.getResponsableInput()).to.eq('responsable', 'Expected Responsable value to be equals to responsable');
    expect(await contenidoUpdatePage.getRegistroInput()).to.eq('registro', 'Expected Registro value to be equals to registro');
    expect(await contenidoUpdatePage.getIdDocInput()).to.eq('5', 'Expected idDoc value to be equals to 5');
    await contenidoUpdatePage.save();
    expect(await contenidoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await contenidoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Contenido', async () => {
    const nbButtonsBeforeDelete = await contenidoComponentsPage.countDeleteButtons();
    await contenidoComponentsPage.clickOnLastDeleteButton();

    contenidoDeleteDialog = new ContenidoDeleteDialog();
    expect(await contenidoDeleteDialog.getDialogTitle()).to.eq('sgcApp.contenido.delete.question');
    await contenidoDeleteDialog.clickOnConfirmButton();

    expect(await contenidoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
