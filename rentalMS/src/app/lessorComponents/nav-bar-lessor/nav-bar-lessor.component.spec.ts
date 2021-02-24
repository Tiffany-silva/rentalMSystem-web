import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarLessorComponent } from './nav-bar-lessor.component';

describe('NavBarLessorComponent', () => {
  let component: NavBarLessorComponent;
  let fixture: ComponentFixture<NavBarLessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarLessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarLessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
