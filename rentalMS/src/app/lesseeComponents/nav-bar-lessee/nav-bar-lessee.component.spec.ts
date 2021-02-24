import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarLesseeComponent } from './nav-bar-lessee.component';

describe('NavBarLesseeComponent', () => {
  let component: NavBarLesseeComponent;
  let fixture: ComponentFixture<NavBarLesseeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarLesseeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarLesseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
