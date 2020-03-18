import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestlazyloadingComponent } from './testlazyloading.component';

describe('TestlazyloadingComponent', () => {
  let component: TestlazyloadingComponent;
  let fixture: ComponentFixture<TestlazyloadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestlazyloadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestlazyloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
