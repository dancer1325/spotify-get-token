import { HomeComponent } from "./home.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { SpotifyService } from "src/app/services/spotify.service";
import { LoadingComponent } from "../shared/loading/loading.component";
import { TarjetasComponent } from "../tarjetas/tarjetas.component";
import { NoimagePipe } from "src/app/pipes/noimage.pipe";
import { RouterTestingModule } from "@angular/router/testing";

describe("Home Component", () => {
  let homeComponent: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        // Required to add the rest of the components because they are inserted in the html
        LoadingComponent,
        TarjetasComponent,
        NoimagePipe,
      ], // Required declare all the components contained into .html
      providers: [SpotifyService],
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])],
      // Necessary to the Router, since a inheir component required
    });
    fixture = TestBed.createComponent(HomeComponent);
    homeComponent = fixture.componentInstance;
  });

  it("Should create HomeComponent", () => {
    expect(homeComponent).toBeTruthy();
  });

  // TODO: Integration tests
  xit("", () => {});
});
