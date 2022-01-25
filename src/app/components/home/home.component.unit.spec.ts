import { HomeComponent } from "./home.component";
import { SpotifyService } from "src/app/services/spotify.service";
import { Observable, from, empty, throwError } from "rxjs";

describe("Home Component", () => {
  let homeComponent: HomeComponent;
  let data;

  // Ways to insantiate the service
  // 1) null -- Not allowed, since service requires it into the constructor
  //const service = new SpotifyService(null);
  // 2) Mocking HttpClient -- TODO: Check mocking the calls firsly to instantiate
  // let httpClientSpy: jasmine.SpyObj<HttpClient>;
  // const service = new SpotifyService(httpClientSpy);
  // 3) Mocking SpotifyService
  let service: jasmine.SpyObj<SpotifyService>;

  // TODO: Fix it
  xit("Should create HomeComponent", () => {
    // 1) Returning results
    data = "Perfect";
    spyOn(service, "getNewReleases").and.callFake(() => {
      // return Observable.from(data); // Not available from Angular 6
      return from(data);
    });
    homeComponent = new HomeComponent(service);
    expect(homeComponent).toBeTruthy();
    expect(homeComponent.nuevasCanciones).toEqual(data);
    expect(homeComponent.loading).toEqual(false);
    expect(homeComponent.error).toBeNull();
    expect(homeComponent.mensajeError).toBeNull();

    // 2) No results returned
    spyOn(service, "getNewReleases").and.callFake(() => {
      // return Observable.empty(); // Not available from Angular 6
      return empty();
    });
    homeComponent = new HomeComponent(service);
    expect(homeComponent).toBeTruthy();
    expect(homeComponent.nuevasCanciones).toEqual(null);
    expect(homeComponent.loading).toEqual(false);
    expect(homeComponent.error).toBeNull();
    expect(homeComponent.mensajeError).toBeNull();

    // 3) Throwing error
    const ERROR = "ERROR";
    spyOn(service, "getNewReleases").and.returnValue(throwError(ERROR));
    homeComponent = new HomeComponent(service);
    expect(homeComponent).toBeTruthy();
    expect(homeComponent.nuevasCanciones).toEqual(null);
    expect(homeComponent.loading).toEqual(false);
    expect(homeComponent.error).toBeTruthy();
    expect(homeComponent.mensajeError).toBeNull();
  });

  // TODO: Integration tests
  xit("", () => {});
});
