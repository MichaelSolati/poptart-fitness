import { TestBed, async, inject } from '@angular/core/testing';

import { PlaceGuard } from './place.guard';

describe('PlaceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaceGuard]
    });
  });

  it('should ...', inject([PlaceGuard], (guard: PlaceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
