import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReactiveFormComponent } from './test-reactive-form.component';

describe('TestReactiveFormComponent', () => {
  let component: TestReactiveFormComponent;
  let fixture: ComponentFixture<TestReactiveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestReactiveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
