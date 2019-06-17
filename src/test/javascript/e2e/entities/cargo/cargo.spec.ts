/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CargoComponentsPage, CargoDeleteDialog, CargoUpdatePage } from './cargo.page-object';

const expect = chai.expect;

describe('Cargo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cargoUpdatePage: CargoUpdatePage;
  let cargoComponentsPage: CargoComponentsPage;
  let cargoDeleteDialog: CargoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Cargos', async () => {
    await navBarPage.goToEntity('cargo');
    cargoComponentsPage = new CargoComponentsPage();
    await browser.wait(ec.visibilityOf(cargoComponentsPage.title), 5000);
    expect(await cargoComponentsPage.getTitle()).to.eq('sgcApp.cargo.home.title');
  });

  it('should load create Cargo page', async () => {
    await cargoComponentsPage.clickOnCreateButton();
    cargoUpdatePage = new CargoUpdatePage();
    expect(await cargoUpdatePage.getPageTitle()).to.eq('sgcApp.cargo.home.createOrEditLabel');
    await cargoUpdatePage.cancel();
  });

  it('should create and save Cargos', async () => {
    const nbButtonsBeforeCreate = await cargoComponentsPage.countDeleteButtons();

    await cargoComponentsPage.clickOnCreateButton();
    await promise.all([cargoUpdatePage.setCargoInput('cargo'), cargoUpdatePage.setCorreoInstInput('correoInst')]);
    expect(await cargoUpdatePage.getCargoInput()).to.eq('cargo', 'Expected Cargo value to be equals to cargo');
    expect(await cargoUpdatePage.getCorreoInstInput()).to.eq('correoInst', 'Expected CorreoInst value to be equals to correoInst');
    await cargoUpdatePage.save();
    expect(await cargoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await cargoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Cargo', async () => {
    const nbButtonsBeforeDelete = await cargoComponentsPage.countDeleteButtons();
    await cargoComponentsPage.clickOnLastDeleteButton();

    cargoDeleteDialog = new CargoDeleteDialog();
    expect(await cargoDeleteDialog.getDialogTitle()).to.eq('sgcApp.cargo.delete.question');
    await cargoDeleteDialog.clickOnConfirmButton();

    expect(await cargoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
