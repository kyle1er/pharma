/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MotOublieComponent } from './mot-oublie.component';

describe('MotOublieComponent', () => {
  let component: MotOublieComponent;
  let fixture: ComponentFixture<MotOublieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotOublieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotOublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
