import { SpotifyService } from "./spotify.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed, getTestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";

describe("SpotifyService", () => {
  let service: SpotifyService;

  // 1) Via @angular/common/http/testing
  let injector;
  let httpMock: HttpTestingController; // Controller which allows: A) mocking requests, B) flushing requests
  const QUERYRESPONSE = {
    albums: ["First", "Second", "Third"],
    artists: ["Carol", "Noelia", "Jessica"],
    tracks: ["Do not regret"],
  };

  // 2) Via Spy
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    // 1) Via @angular/common/http/testing
    TestBed.configureTestingModule({
      // Declarations no defined since there is no component to define
      providers: [SpotifyService],
      imports: [HttpClientTestingModule],
    });

    // Get
    // 1.1) Via TestBed directly
    service = TestBed.get(SpotifyService); // It launches the constructor of the class
    httpMock = TestBed.get(HttpTestingController);

    // 1.2) Via TestBed instance
    // injector = getTestBed();
    // service = injector.get(SpotifyService); // It launches the constructor of the class
    // httpMock = injector.get(HttpTestingController);

    // 2) Via Spy
    // let tokenResponse = {
    //   access_token: "access_token",
    //   token_type: "token_type",
    // };
    // httpClientSpy = jasmine.createSpyObj("HttpClient", ["post", "get"]);
    // httpClientSpy.post.and.returnValue(asyncData(tokenResponse)); // TODO: Fix it
    // service = new SpotifyService(httpClientSpy);
  });

  it("Check constructor initialization", () => {
    expect(service).toBeTruthy();
    expect(service.tokenUrl).toEqual("https://accounts.spotify.com/api/token");
    expect(service.headers2["Authorization"]).toEqual(
      "Basic ODEyZjBkOWNlOGJjNDlmNGI1Y2E3OWRkOWRiNzhlNGI6Y2E0YWUzYjM4NzdmNDBlMWI0ZWUyYjE5NjBhYTk4MmQ="
    );
    expect(service.tokenBody.get("grant_type")).toEqual("client_credentials");
    // expect(service.) // TODO: How to get the dependency?
  });

  xit("Check getQuery", () => {
    const QUERYPARAM = "QUERYPARAM";

    service.getQuery(QUERYPARAM).subscribe((element) => {
      expect(element).toEqual(QUERYRESPONSE);
    });

    console.log(httpMock);

    const request = httpMock.expectOne(
      // TODO: Fix it
      // (r) => true // Return several, since all match this condition
      (r) => r.url === `https://api.spotify.com/v1/QUERYPARAM}`
      // &&
      // r.headers.get("Authorization") ===
      //   "Bearer BQCcuQ6VcjmypVj8sQ6oKdT_QH9MOUex-dJPRU7GEW_pndPFvDb4nwU2R69b5HqkrYEOx0fztLPUYmvHQlY"
    );

    expect(request.request.method).toBe("GET");
    request.flush(QUERYRESPONSE); // Provide dummyy values as responses
  });
});
function asyncData(tokenResponse: {
  access_token: string;
  token_type: string;
}): any {
  throw new Error("Function not implemented.");
}
