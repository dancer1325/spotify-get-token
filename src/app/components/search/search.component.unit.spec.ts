import { SearchComponent } from "./search.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SpotifyService } from "../../services/spotify.service";
import { from } from "rxjs";
import { LoadingComponent } from "../shared/loading/loading.component";
import { TarjetasComponent } from "../tarjetas/tarjetas.component";
import { NoimagePipe } from "../../pipes/noimage.pipe";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

describe("Search Component - Unit Test", () => {
  let searchComoponent: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        LoadingComponent,
        TarjetasComponent,
        NoimagePipe,
      ],
      providers: [SpotifyService],
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])],
    }).compileComponents();
    fixture = TestBed.createComponent(SearchComponent);
    searchComoponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Check buscar functionality", () => {
    let termino = "termino";
    let data = "Cristina";
    service = TestBed.get(SpotifyService);
    const spy = spyOn(service, "getArtistas").and.callFake(() => {
      return from(data); // If data is a string -->
      // Several executions will be returned, if you don't handle it, responses can be overrided
    });

    searchComoponent.buscar(termino);

    console.log("artists ", searchComoponent.artistas);
    // Based on the buscar method impelementation --> Just the last element will be kept
    expect(searchComoponent.artistas).toBe(data[data.length - 1]);
    expect(searchComoponent.loading).toBeFalsy();
    expect(spy).toHaveBeenCalledWith("termino");
  });

  //TODO: Check html interaction with ts
  xit("html tests", () => {});
});
