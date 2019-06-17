/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DocRevisionComponentsPage, DocRevisionDeleteDialog, DocRevisionUpdatePage } from './doc-revision.page-object';

const expect = chai.expect;

describe('DocRevision e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let docRevisionUpdatePage: DocRevisionUpdatePage;
  let docRevisionComponentsPage: DocRevisionComponentsPage;
  let docRevisionDeleteDialog: DocRevisionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DocRevisions', async () => {
    await navBarPage.goToEntity('doc-revision');
    docRevisionComponentsPage = new DocRevisionComponentsPage();
    await browser.wait(ec.visibilityOf(docRevisionComponentsPage.title), 5000);
    expect(await docRevisionComponentsPage.getTitle()).to.eq('sgcApp.docRevision.home.title');
  });

  it('should load create DocRevision page', async () => {
    await docRevisionComponentsPage.clickOnCreateButton();
    docRevisionUpdatePage = new DocRevisionUpdatePage();
    expect(await docRevisionUpdatePage.getPageTitle()).to.eq('sgcApp.docRevision.home.createOrEditLabel');
    await docRevisionUpdatePage.cancel();
  });

  it('should create and save DocRevisions', async () => {
    const nbButtonsBeforeCreate = await docRevisionComponentsPage.countDeleteButtons();

    await docRevisionComponentsPage.clickOnCreateButton();
    await promise.all([
      docRevisionUpdatePage.setCodeInput('5'),
      docRevisionUpdatePage.setIdUserInput('idUser'),
      docRevisionUpdatePage.setIdDocInput('5'),
      docRevisionUpdatePage.setComentario1Input('comentario1'),
      docRevisionUpdatePage.setComentario2Input('comentario2'),
      docRevisionUpdatePage.documentoSGCSelectLastOption(),
      docRevisionUpdatePage.userSelectLastOption()
    ]);
    expect(await docRevisionUpdatePage.getCodeInput()).to.eq('5', 'Expected code value to be equals to 5');
    expect(await docRevisionUpdatePage.getIdUserInput()).to.eq('idUser', 'Expected IdUser value to be equals to idUser');
    expect(await docRevisionUpdatePage.getIdDocInput()).to.eq('5', 'Expected idDoc value to be equals to 5');
    expect(await docRevisionUpdatePage.getComentario1Input()).to.eq(
      'comentario1',
      'Expected Comentario1 value to be equals to comentario1'
    );
    expect(await docRevisionUpdatePage.getComentario2Input()).to.eq(
      'comentario2',
      'Expected Comentario2 value to be equals to comentario2'
    );
    await docRevisionUpdatePage.save();
    expect(await docRevisionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await docRevisionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last DocRevision', async () => {
    const nbButtonsBeforeDelete = await docRevisionComponentsPage.countDeleteButtons();
    await docRevisionComponentsPage.clickOnLastDeleteButton();

    docRevisionDeleteDialog = new DocRevisionDeleteDialog();
    expect(await docRevisionDeleteDialog.getDialogTitle()).to.eq('sgcApp.docRevision.delete.question');
    await docRevisionDeleteDialog.clickOnConfirmButton();

    expect(await docRevisionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
