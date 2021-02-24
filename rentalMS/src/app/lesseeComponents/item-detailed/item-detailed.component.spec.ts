import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailedComponent } from './item-detailed.component';

describe('ItemDetailedComponent', () => {
  let component: ItemDetailedComponent;
  let fixture: ComponentFixture<ItemDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
