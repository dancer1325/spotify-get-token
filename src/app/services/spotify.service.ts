import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SpotifyService {
  bearerToken: string;
  tokenUrl: string = "https://accounts.spotify.com/api/token";
  tokenBody = new URLSearchParams().set("grant_type", "client_credentials");
  // tokenBody ={
  //   'grant_type': 'client_credentials'
  // };
  // tokenBody = `grant_type=${grant_type}&client_credentials=${client_credentials}`;
  // tokenBody = `grant_type=${client_credentials}`;
  // tokenBody = new HttpParams().set('grant_type', client_credentials);
  // tokenBody = new HttpParams({
  //   fromObject: {
  //     grant_type: 'client_credentials'
  //   }
  // });
  // tokenBody = new FormData().append('grant_type', 'client_credentials');
  headers2 = {
    Authorization:
      "Basic ODEyZjBkOWNlOGJjNDlmNGI1Y2E3OWRkOWRiNzhlNGI6Y2E0YWUzYjM4NzdmNDBlMWI0ZWUyYjE5NjBhYTk4MmQ=",
    // ,
    // 'Content-Type': 'application/x-www-form-urlencoded'
  };

  constructor(private http: HttpClient) {
    console.log("Spotify Service Listo");
    this.http
      .post<any>(this.tokenUrl, this.tokenBody, { headers: this.headers2 })
      .subscribe((data) => {
        this.bearerToken = data.token_type + " " + data.access_token;
      });
    // this.http.post<any>(this.tokenUrl, this.tokenBody, this.headers2 ).subscribe(data => {
    //   this.bearerToken = data.token_type + " " + data.access_token;
    // });
    console.log(this.bearerToken);
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization:
        "Bearer BQAKRQm6UKswq9g1NTWgDw0f0qUviSo0fNahJ6r8yq6yUCUv7R56WiWQT0RXoL_pmT1Ktzb3SiTah2TJMFs",
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery("browse/new-releases?limit=20").pipe(
      map((data) => data["albums"].items)
    );
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map((data) => data["artists"].items)
    );
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
    // .pipe( map( data => data['artists'].items));
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data) => data["tracks"])
    );
  }
}
