import { TestBed, inject } from '@angular/core/testing';

import { WaitrsBookService } from './waiters-book.service';

describe('WaitersBookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WaitrsBookService]
    });
  });

  it('should be created', inject([WaitrsBookService], (service: WaitrsBookService) => {
    expect(service).toBeTruthy();
  }));
});