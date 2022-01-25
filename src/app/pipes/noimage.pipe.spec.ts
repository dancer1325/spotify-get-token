import { NoimagePipe } from "./noimage.pipe";

describe("NoimagePipe", () => {
  let pipe: NoimagePipe;

  beforeEach(() => {
    pipe = new NoimagePipe();
  });

  it("Test transform logic", () => {
    let images: any[];
    let valueTransformed: string;

    // No images sent
    (images = null), (valueTransformed = pipe.transform(images));
    expect(valueTransformed).toEqual("assets/img/noimage.png");

    // Length 0 -- images not initialized
    valueTransformed = pipe.transform(images);
    expect(valueTransformed).toEqual("assets/img/noimage.png");

    // Length > 0
    images = [
      {
        url: "url",
        name: "Jessica",
      },
      {
        url: "url",
        name: "Carol",
      },
    ];
    valueTransformed = pipe.transform(images);
    expect(valueTransformed).toEqual("url");
  });
});
