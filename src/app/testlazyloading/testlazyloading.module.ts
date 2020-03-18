import { TestlazyloadingComponent } from './testlazyloading.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TestlazyloadingRoute } from './testlazyloading.route';

@NgModule({
    declarations: [
        TestlazyloadingComponent,
    ],
    imports: [CommonModule, RouterModule.forChild(TestlazyloadingRoute), FormsModule, ReactiveFormsModule]
})
export class TestlazyloadingModule {

}
