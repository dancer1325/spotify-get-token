import { TarjetasComponent } from "./tarjetas.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { NoimagePipe } from "../../pipes/noimage.pipe";
import { By } from "@angular/platform-browser";

class FakeRouter {
  navigate(params) {}
}

describe("Tarjetas Component", () => {
  let tarjetaComponent: TarjetasComponent;
  let fixture: ComponentFixture<TarjetasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarjetasComponent, NoimagePipe], // NoimagePipe required to work the initialization
      providers: [{ provide: Router, useClass: FakeRouter }],
    }).compileComponents();
    fixture = TestBed.createComponent(TarjetasComponent);
    tarjetaComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Check verArtista functionality", () => {
    let item;
    let returned;
    const router = TestBed.get(Router);
    const spy = spyOn(router, "navigate");

    // 1) Item - null
    item = null;
    returned = tarjetaComponent.verArtista(item);
    expect(returned).toBeNull();
    expect(spy).not.toHaveBeenCalled();

    // 2) Item - without type and without artists
    item = "Carol";
    returned = tarjetaComponent.verArtista(item);
    expect(returned).toBeNull();
    expect(spy).not.toHaveBeenCalled();

    // 3) Item - without type, but with artists
    item = {
      artists: [
        {
          id: "id",
          name: "Carol",
        },
        {
          id: "id2",
          name: "Jessica",
        },
      ],
    };
    returned = tarjetaComponent.verArtista(item);
    expect(returned).toBeUndefined();
    expect(spy).toHaveBeenCalledWith(["/artist", "id"]);

    // 4) Item - with type, but without artists
    item = {
      type: "artist",
      id: "id",
    };
    returned = tarjetaComponent.verArtista(item);
    expect(returned).toBeUndefined();
    expect(spy).toHaveBeenCalledWith(["/artist", "id"]);

    // 5) Item - with type but not artist, and artists
    item = {
      type: "type",
      artists: [
        {
          id: "id",
          name: "Carol",
        },
        {
          id: "id2",
          name: "Jessica",
        },
      ],
    };
    returned = tarjetaComponent.verArtista(item);
    expect(returned).toBeUndefined();
    expect(spy).toHaveBeenCalledWith(["/artist", "id"]);
  });

  //TODO: Fix it because input is null
  xit("Check html logic", () => {
    let item = {
      type: "artist",
      id: "id",
    };

    tarjetaComponent.verArtista(item);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const input = fixture.debugElement.query(By.css("h5"));
      console.log("input: ", input);
    });
  });
});
