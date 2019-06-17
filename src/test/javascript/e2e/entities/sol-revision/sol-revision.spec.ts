/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SolRevisionComponentsPage, SolRevisionDeleteDialog, SolRevisionUpdatePage } from './sol-revision.page-object';

const expect = chai.expect;

describe('SolRevision e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let solRevisionUpdatePage: SolRevisionUpdatePage;
  let solRevisionComponentsPage: SolRevisionComponentsPage;
  let solRevisionDeleteDialog: SolRevisionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SolRevisions', async () => {
    await navBarPage.goToEntity('sol-revision');
    solRevisionComponentsPage = new SolRevisionComponentsPage();
    await browser.wait(ec.visibilityOf(solRevisionComponentsPage.title), 5000);
    expect(await solRevisionComponentsPage.getTitle()).to.eq('sgcApp.solRevision.home.title');
  });

  it('should load create SolRevision page', async () => {
    await solRevisionComponentsPage.clickOnCreateButton();
    solRevisionUpdatePage = new SolRevisionUpdatePage();
    expect(await solRevisionUpdatePage.getPageTitle()).to.eq('sgcApp.solRevision.home.createOrEditLabel');
    await solRevisionUpdatePage.cancel();
  });

  it('should create and save SolRevisions', async () => {
    const nbButtonsBeforeCreate = await solRevisionComponentsPage.countDeleteButtons();

    await solRevisionComponentsPage.clickOnCreateButton();
    await promise.all([
      solRevisionUpdatePage.setCodeInput('5'),
      solRevisionUpdatePage.setIdUserInput('5'),
      solRevisionUpdatePage.setIdSolInput('5'),
      solRevisionUpdatePage.userSelectLastOption(),
      solRevisionUpdatePage.solicitudSelectLastOption()
    ]);
    expect(await solRevisionUpdatePage.getCodeInput()).to.eq('5', 'Expected code value to be equals to 5');
    expect(await solRevisionUpdatePage.getIdUserInput()).to.eq('5', 'Expected idUser value to be equals to 5');
    expect(await solRevisionUpdatePage.getIdSolInput()).to.eq('5', 'Expected idSol value to be equals to 5');
    const selectedEstado = solRevisionUpdatePage.getEstadoInput();
    if (await selectedEstado.isSelected()) {
      await solRevisionUpdatePage.getEstadoInput().click();
      expect(await solRevisionUpdatePage.getEstadoInput().isSelected(), 'Expected estado not to be selected').to.be.false;
    } else {
      await solRevisionUpdatePage.getEstadoInput().click();
      expect(await solRevisionUpdatePage.getEstadoInput().isSelected(), 'Expected estado to be selected').to.be.true;
    }
    await solRevisionUpdatePage.save();
    expect(await solRevisionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await solRevisionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last SolRevision', async () => {
    const nbButtonsBeforeDelete = await solRevisionComponentsPage.countDeleteButtons();
    await solRevisionComponentsPage.clickOnLastDeleteButton();

    solRevisionDeleteDialog = new SolRevisionDeleteDialog();
    expect(await solRevisionDeleteDialog.getDialogTitle()).to.eq('sgcApp.solRevision.delete.question');
    await solRevisionDeleteDialog.clickOnConfirmButton();

    expect(await solRevisionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
