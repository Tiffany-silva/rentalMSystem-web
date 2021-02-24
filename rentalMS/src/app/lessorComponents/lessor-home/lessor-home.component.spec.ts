import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessorHomeComponent } from './lessor-home.component';

describe('LessorHomeComponent', () => {
  let component: LessorHomeComponent;
  let fixture: ComponentFixture<LessorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessorHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
