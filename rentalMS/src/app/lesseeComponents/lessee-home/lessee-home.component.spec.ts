import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesseeHomeComponent } from './lessee-home.component';

describe('LesseeHomeComponent', () => {
  let component: LesseeHomeComponent;
  let fixture: ComponentFixture<LesseeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LesseeHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LesseeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
