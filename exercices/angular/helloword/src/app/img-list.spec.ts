import { TestBed } from '@angular/core/testing';

import { ImgList } from './img-list';

describe('ImgList', () => {
  let service: ImgList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
