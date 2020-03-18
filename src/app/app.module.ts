import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponentComponent } from './first-component/first-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TestReactiveFormComponent } from './test-reactive-form/test-reactive-form.component';
import { XmlToJsonComponent } from './xml-to-json/xml-to-json.component';
import { TestTabindexComponent } from './test-tabindex/test-tabindex.component';
// import { TestlazyloadingComponent } from './testlazyloading/testlazyloading.component';
@NgModule({
  declarations: [
    AppComponent,
    FirstComponentComponent,
    TestComponent,
    TestReactiveFormComponent,
    XmlToJsonComponent,
    TestTabindexComponent,
    // TestlazyloadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
