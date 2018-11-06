import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReorderableComponent } from './reorderable.component';

describe('ReorderableComponent', () => {
  let component: ReorderableComponent;
  let fixture: ComponentFixture<ReorderableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReorderableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReorderableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
