import { PIWebAPIWithAngular2Page } from './app.po';

describe('pi-web-api-with-angular2 App', function() {
  let page: PIWebAPIWithAngular2Page;

  beforeEach(() => {
    page = new PIWebAPIWithAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
