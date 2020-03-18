import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlToJsonComponent } from './xml-to-json.component';

describe('XmlToJsonComponent', () => {
  let component: XmlToJsonComponent;
  let fixture: ComponentFixture<XmlToJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XmlToJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlToJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
