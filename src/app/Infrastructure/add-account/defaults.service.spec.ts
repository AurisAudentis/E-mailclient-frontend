import { TestBed, inject } from '@angular/core/testing';

import { DefaultServerService } from './default-server.service';

describe('DefaultServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultServerService]
    });
  });

  it('should be created', inject([DefaultServerService], (service: DefaultServerService) => {
    expect(service).toBeTruthy();
  }));
});
