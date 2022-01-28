import { TestBed } from '@angular/core/testing';

import { LeaderService } from '../services/leader.service';

describe('LeaderService', () => {
  let service: LeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
