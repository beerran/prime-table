import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowclassComponent } from './rowclass.component';

describe('RowclassComponent', () => {
  let component: RowclassComponent;
  let fixture: ComponentFixture<RowclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
