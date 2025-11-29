import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nono } from './nono';

describe('Nono', () => {
  let component: Nono;
  let fixture: ComponentFixture<Nono>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nono]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nono);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
