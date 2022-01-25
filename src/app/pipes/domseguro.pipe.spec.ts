import { DomseguroPipe } from "./domseguro.pipe";
import { TestBed, getTestBed } from "@angular/core/testing";
import {
  BrowserModule,
  DomSanitizer,
  SafeResourceUrl,
} from "@angular/platform-browser";

describe("DomseguroPipe tests", () => {
  let pipe: DomseguroPipe;

  beforeEach(() => {
    // 1) Mocking DomSanitizer
    //   TestBed.configureTestingModule({
    //     declarations: [DomseguroPipe],
    //     providers: [
    //       DomseguroPipe,
    //       {
    //         provide: DomSanitizer,
    //         useValue: {
    //           bypassSecurityTrustResourceUrl() {},
    //         },
    //       },
    //     ],
    //   });
    // Ways to get the TestBed
    // pipe = getTestBed().get(DomseguroPipe);
    // pipe = TestBed.get(DomseguroPipe);

    // 2) Without mocking DomSanitizer === using BrowserModule
    TestBed.configureTestingModule({
      imports: [BrowserModule],
    });
    const domSanitizer = TestBed.get(DomSanitizer);
    pipe = new DomseguroPipe(domSanitizer);
  });

  it("Test initialization", () => {
    expect(pipe).toBeTruthy();
  });

  it("Test transform logic", () => {
    const VALUE = "VALUE";

    // let transformed: SafeResourceUrl = pipe.transform(VALUE); // It's an interface --> It doesn't work
    // let transformed: SafeResourceUrlImpl = pipe.transform(VALUE); // SafeResourceUrlImpl not found --> It doesn't work
    let transformed = pipe.transform(VALUE);

    expect(transformed.changingThisBreaksApplicationSecurity).toBe(
      "https://open.spotify.com/embed?uri=".concat(VALUE)
    );

    console.log("hello", transformed);
  });
});
