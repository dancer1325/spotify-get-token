import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: "app-artista",
  templateUrl: "./artista.component.html",
  styles: [],
})
export class ArtistaComponent {
  artista: any = {};
  topTracks: any[] = [];

  loadingArtist: boolean;

  constructor(private router: ActivatedRoute, private spotify: SpotifyService) {
    this.loadingArtist = true;

    // All the changes in the params received by the url
    this.router.params.subscribe((params) => {
      this.getArtista(params["id"]);
      this.getTopTracks(params["id"]);
      console.log("suscription");
    });
    console.log("constructour launched ");
  }

  getArtista(id: string) {
    this.loadingArtist = true;

    this.spotify.getArtista(id).subscribe(
      (artista) => {
        console.log(artista);
        this.artista = artista;

        this.loadingArtist = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTopTracks(id: string) {
    this.spotify.getTopTracks(id).subscribe(
      (topTracks) => {
        console.log(topTracks);
        this.topTracks = topTracks;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
