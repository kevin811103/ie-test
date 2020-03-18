import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstComponentComponent } from './first-component/first-component.component';
import { TestComponent } from './test/test.component';
import { TestReactiveFormComponent } from './test-reactive-form/test-reactive-form.component';
import { TestTabindexComponent } from './test-tabindex/test-tabindex.component';


const routes: Routes = [
  {
    path: '', // 首頁定義
    component: FirstComponentComponent, // 要指定顯示哪個 component
  },
  {
    path: 'test', // 首頁定義
    component: TestComponent, // 要指定顯示哪個 component
  },
  {
    path: 'test-reactive-form', // 首頁定義
    component: TestReactiveFormComponent, // 要指定顯示哪個 component
  },
  {
    path: 'test-tabindex', // 首頁定義
    component: TestTabindexComponent, // 要指定顯示哪個 component
  },

  {
    path: 'testlazyloading',
    loadChildren: () => import('./testlazyloading/testlazyloading.module').then(m => m.TestlazyloadingModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
