/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CryptoEnDeService } from './crypto-en-de.service';

describe('Service: CryptoEnDe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoEnDeService]
    });
  });

  it('should ...', inject([CryptoEnDeService], (service: CryptoEnDeService) => {
    expect(service).toBeTruthy();
  }));
});
