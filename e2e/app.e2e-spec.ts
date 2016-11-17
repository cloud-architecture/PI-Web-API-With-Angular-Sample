import { SamplePiwebappAngular2Page } from './app.po';

describe('sample-piwebapp-angular2 App', function() {
  let page: SamplePiwebappAngular2Page;

  beforeEach(() => {
    page = new SamplePiwebappAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
