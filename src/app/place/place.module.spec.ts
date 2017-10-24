import { PlaceModule } from './place.module';

describe('PlaceModule', () => {
  let placeModule: PlaceModule;

  beforeEach(() => {
    placeModule = new PlaceModule();
  });

  it('should create an instance', () => {
    expect(placeModule).toBeTruthy();
  });
});
