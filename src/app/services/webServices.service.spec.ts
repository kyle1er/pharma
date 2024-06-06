/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WebServicesService } from './webServices.service';

describe('Service: WebServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebServicesService]
    });
  });

  it('should ...', inject([WebServicesService], (service: WebServicesService) => {
    expect(service).toBeTruthy();
  }));
});
