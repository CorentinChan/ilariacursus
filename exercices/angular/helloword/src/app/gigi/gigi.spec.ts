import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gigi } from './gigi';

describe('Gigi', () => {
  let component: Gigi;
  let fixture: ComponentFixture<Gigi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gigi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gigi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
