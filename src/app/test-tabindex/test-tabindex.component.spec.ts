import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTabindexComponent } from './test-tabindex.component';

describe('TestTabindexComponent', () => {
  let component: TestTabindexComponent;
  let fixture: ComponentFixture<TestTabindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTabindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTabindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
