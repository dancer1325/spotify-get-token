import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { map } from "rxjs/operators";

// Decorator at class level which allows being provided / injected as dependency
@Injectable({
  providedIn: "root", // Injector which requires this injectable
})
export class SpotifyService {
  bearerToken: string;
  tokenUrl: string = "https://accounts.spotify.com/api/token";
  // Ways to define request's body
  // 1) URLSearchParams  -- It doesn't work --
  // tokenBody = new URLSearchParams().set("grant_type", "client_credentials");
  // 2) Declaring an object  -- It doesn't work --
  // tokenBody = {
  //   grant_type: "client_credentials",
  // };
  // 3) Declaring an object with literal templates  -- It doesn't work --
  // tokenBody = `grant_type=${grant_type}&client_credentials=${client_credentials}`;
  // 4) Declaring an object with literal templates  -- It doesn't work --
  // tokenBody = `grant_type=${client_credentials}`;
  // 5) Declaring via HttpParams, setting them -- It works --
  // tokenBody = new HttpParams().set("grant_type", "client_credentials");
  // 6) Declaring via HttpParams, fromObject -- It works --
  tokenBody = new HttpParams({
    fromObject: {
      grant_type: "client_credentials",
    },
  });
  // 7) Declaring via FormData -- It doesn't work --
  // tokenBody = new FormData().append("grant_type", "client_credentials");

  headers2 = {
    Authorization:
      "Basic ODEyZjBkOWNlOGJjNDlmNGI1Y2E3OWRkOWRiNzhlNGI6Y2E0YWUzYjM4NzdmNDBlMWI0ZWUyYjE5NjBhYTk4MmQ=",
    // ,
    // 'Content-Type': 'application/x-www-form-urlencoded'
  };

  constructor(private http: HttpClient) {
    console.log("Spotify Service Listo");
    this.http
      .post<any>(this.tokenUrl, this.tokenBody, { headers: this.headers2 }) // Construct an Observable
      .subscribe((data) => {
        // Data is the value received from the server once the response is receive
        console.log(data);
        this.bearerToken = data.token_type + " " + data.access_token;
      });
    // this.http.post<any>(this.tokenUrl, this.tokenBody, this.headers2 ).subscribe(data => {
    //   this.bearerToken = data.token_type + " " + data.access_token;
    // });
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    // Next value needs to be updated
    const headers = new HttpHeaders({
      Authorization:
        // "Bearer BQAKRQm6UKswq9g1NTWgDw0f0qUviSo0fNahJ6r8yq6yUCUv7R56WiWQT0RXoL_pmT1Ktzb3SiTah2TJMFs",
        // "Bearer BQCcuQ6VcjmypVj8sQ6oKdT_QH9MOUex-dJPRU7GEW_pndPFvDb4nwU2R69b5HqkrYEOx0fztLPUYmvHQlY",
        // "Bearer BQCGCZpFuscLxHooMLiEJyTFWbT5fsazuOYYVWSdSaB-IwOBbb9RvCohmQXBCixE9DQIIUNw-t-XjoZzkHc",
        // "Bearer BQDLxICR6baglZNVF6A8hoNQBKuVOOnbjv6PGL2D0RJwZxqsPxmv64vwJHg8-yVQ4dg3voyMrjhprtJ4e54",
        // "Bearer BQA-2ne3rBT-BXyd8Q9_MLbOk2glNELD5Nc38ZuoCDjiWK6Pl4Fk1-7BGv7T8AV2-2PFGe1CWpndiIVw9oc",
        // "Bearer BQA9D13VeX9Q2rbJ02LCW6CQCKdrTPBGQplk2v0LeY7Lwi7NAEukZYMo8BphTAoTpJsKl1mVAJ0lhlqbi9U",
        "Bearer BQBq2vWRGxldd2FaOhdZLyl3gEivFsEW7-zFdSirXbn6gNk7r2ePzk6qdLH7z6h1lfGM470aXqIhzuHNd1o",
      // this.bearerToken, // TODO: How to call to this value ??
    });

    return this.http.get(url, { headers }); // Construct an Observable
  }

  getNewReleases() {
    return this.getQuery("browse/new-releases?limit=20").pipe(
      map((data) => data["albums"].items) //Map to an object with just "albums.items"
    );
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map((data) => data["artists"].items) //Map to an object with just "artists.items"
    );
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
    // .pipe( map( data => data['artists'].items));
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data) => data["tracks"]) //Map to an object with just "tracks.items"
    );
    // ?country=us  Added the default one, because it's mandatory for this request
  }
}
