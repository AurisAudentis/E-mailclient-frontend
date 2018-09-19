import { TestBed } from '@angular/core/testing';

import { MailDataService } from './mail-data.service';

describe('MailDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MailDataService = TestBed.get(MailDataService);
    expect(service).toBeTruthy();
  });
});
