import { TestBed } from '@angular/core/testing';

import { SuscribeGuard } from './suscribe.guard';

describe('SuscribeGuard', () => {
  let guard: SuscribeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SuscribeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
