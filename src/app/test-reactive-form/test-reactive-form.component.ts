import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-test-reactive-form',
  templateUrl: './test-reactive-form.component.html',
  styleUrls: ['./test-reactive-form.component.css']
})
export class TestReactiveFormComponent implements OnInit {
  public searchForm: FormGroup;
  constructor(private builder: FormBuilder) { }
  ngOnInit() {
    this.searchForm = this.builder.group({
      name: new FormControl('', [Validators.required, this.validPwd]),
    });
  }

  validPwd(control: AbstractControl): any {
    // 只能輸入小數點加數字
    const reg = /[0-9\.]/;
    // const reg = /^\w{6,12}$/;
    if (reg.test(control.value)) {
      // 通过验证时需要返回 null

      // 驗證小數點
      if (control.value.indexOf('.')) {
        console.log('是小數點')
      }
      // 驗證位數 

      return null;
    }
    return { status: 'error', message: '密码格式为数字字母下划线6-12位' }
  }
}
