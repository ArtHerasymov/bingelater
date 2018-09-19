import { TestBed } from '@angular/core/testing';

import { ServersideService } from './serverside.service';

describe('ServersideService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServersideService = TestBed.get(ServersideService);
    expect(service).toBeTruthy();
  });
});
