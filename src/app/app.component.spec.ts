import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, NavbarComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  it("should create the app", async(() => {
    expect(appComponent).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    expect(appComponent.title).toEqual("app");
  }));
  //TODO: Fix it
  xit("should render title in a h1 tag", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain(
      "Welcome to app!"
    );
  }));
  // TODO: Fix it since getting errors trying to get router directives
  xit("should have app-navbar and router-outlet directive", () => {
    // const routerLinkElements = fixture.debugElement.queryAll(
    //   By.directive(RouterLinkWithHref)
    // );
    // console.log(routerLinkElements);
  });
});
