import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HscModalComponent } from './hsc-modal.component';

describe('HscModalComponent', () => {
  let component: HscModalComponent;
  let fixture: ComponentFixture<HscModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HscModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HscModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
