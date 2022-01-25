import { from, Subject, throwError } from "rxjs";
import { ArtistaComponent } from "./artista.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from "src/app/services/spotify.service";
import { LoadingComponent } from "../shared/loading/loading.component";
import { NoimagePipe } from "../../pipes/noimage.pipe";
import { DomseguroPipe } from "../../pipes/domseguro.pipe";
import { HttpClientModule } from "@angular/common/http";

class FakeActivatedRoute {
  private subject = new Subject();

  push(valor) {
    this.subject.next(valor);
  }

  get params() {
    return this.subject.asObservable();
  }
}

describe("ArtistaComponent", () => {
  let artistComponent: ArtistaComponent;
  let fixture: ComponentFixture<ArtistaComponent>;
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ArtistaComponent,
        LoadingComponent,
        NoimagePipe,
        DomseguroPipe,
      ],
      providers: [
        { provide: ActivatedRoute, useClass: FakeActivatedRoute },
        SpotifyService,
      ],
      imports: [HttpClientModule],
    }).compileComponents();
    fixture = TestBed.createComponent(ArtistaComponent);
    artistComponent = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.get(SpotifyService);
  });

  it("Check constructor ", () => {
    let returnedArtist = {
      name: "Carol",
      type: "singer",
    };
    let returnedTopTracks = "topTracks";

    expect(artistComponent.loadingArtist).toBeTruthy(); // Check previously to mock nothig, since it's already launched

    const activatedRoute: FakeActivatedRoute = TestBed.get(ActivatedRoute);
    const spy = spyOn(service, "getArtista").and.returnValue(
      from([returnedArtist])
    );
    const spyTopTracks = spyOn(service, "getTopTracks").and.returnValue(
      from(returnedTopTracks) // Sine the returned value is a string
      // --> several responses will be returned, and will keep the last item
    );
    activatedRoute.push({
      id: "id1",
    });

    expect(artistComponent.artista).toBe(returnedArtist);
    expect(artistComponent.loadingArtist).toBeFalsy();
    expect(artistComponent.topTracks).toBe(
      returnedTopTracks[returnedTopTracks.length - 1]
    );
    expect(spy).toHaveBeenCalled();
  });

  it("Check getArtista -- Returning a value", () => {
    const ID = "ID";

    let returnedValue = {
      name: "Carol",
      type: "singer",
    };
    const spy = spyOn(service, "getArtista").and.returnValue(
      from([returnedValue])
    );

    artistComponent.getArtista(ID);

    expect(artistComponent.topTracks).toBeNull;
    expect(artistComponent.artista).toBe(returnedValue);
    expect(artistComponent.loadingArtist).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });

  // Necessary to add error handling to make a test throwing an error
  it("Check getArtista -- Throwing an error", () => {
    const ID = "ID";
    let error = "error";
    // Not possible to spyOn an object already spied upon --> Create another test
    const spyWithError = spyOn(service, "getArtista").and.returnValue(
      throwError(error)
    );

    artistComponent.getArtista(ID);

    expect(artistComponent.topTracks.length).toBe(0);
    expect(artistComponent.artista).toBeNull;
    expect(artistComponent.loadingArtist).toBeTruthy();
    expect(spyWithError).toHaveBeenCalled();
  });

  it("Check getTopTracks -- Returning a value", () => {
    const ID = "ID";

    // 1) Returning a value
    let returnedValue = "topTracks";
    const spy = spyOn(service, "getTopTracks").and.returnValue(
      from(returnedValue) // Sine the returned value is a string
      // --> several responses will be returned, and will keep the last item
    );

    artistComponent.getTopTracks(ID);

    expect(artistComponent.topTracks).toBe(
      returnedValue[returnedValue.length - 1]
    );
    expect(artistComponent.artista).toBeNull;
    expect(artistComponent.loadingArtist).toBeTruthy();
    expect(spy).toHaveBeenCalled();

    // 2) Throwing an error
    // Not possible to spyOn an object already spied upon --> Create another test
    // let error = "error";
    // const spyWithError = spyOn(service, "getTopTracks").and.returnValue(
    //   throwError(error)
    // );

    // artistComponent.getTopTracks(ID);

    // expect(artistComponent.topTracks).toBe(returnedValue);
    // expect(spyWithError).toHaveBeenCalled();
  });

  // Necessary to add error handling to make a test throwing an error
  it("Check getTopTracks -- Throwing an error", () => {
    const ID = "ID";
    let error = "error";
    // Not possible to spyOn an object already spied upon --> Create another test
    const spyWithError = spyOn(service, "getTopTracks").and.returnValue(
      throwError(error)
    );

    artistComponent.getTopTracks(ID);

    expect(artistComponent.topTracks.length).toBe(0);
    expect(artistComponent.artista).toBeNull;
    expect(artistComponent.loadingArtist).toBeTruthy();
    expect(spyWithError).toHaveBeenCalled();
  });
});
