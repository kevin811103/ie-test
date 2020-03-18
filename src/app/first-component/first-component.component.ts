import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.css']
})
export class FirstComponentComponent implements OnInit {
  // 做一個有賣便當和飲料的格式 用form array
  public searchForm: FormGroup;
  testString = '測試文字';
  constructor(
    private builder: FormBuilder,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit() {
    this.searchForm = this.builder.group({
      name: new FormControl('', Validators.required),
      bandonList: this.builder.array(
        [this.create_bando()]
      ),
      drinkList: this.builder.array(
        [this.create_drink()]
      ),
      bandonType: new FormControl('2')
    });
    setInterval((viewportScroller: ViewportScroller) => {
      // const el: HTMLDivElement = document.getElementById('detailDiv') as HTMLDivElement;
      // const rect = el.getBoundingClientRect();
      // viewportScroller.scrollToPosition([0, rect.top - 48]);

      console.log('t:', viewportScroller.getScrollPosition());
      console.log('555555555555555555:');
    }, 1000, this.viewportScroller);
  }
  create_drink() {
    return this.builder.group({
      drink_name: new FormControl('', Validators.required),
      drink_price: new FormControl('', Validators.required)
    });
  }
  create_bando() {
    return this.builder.group({
      bandon_name: new FormControl('雞腿便當', Validators.required),
      bandon_price: new FormControl('500', Validators.required)
    });
  }

  testForm() {

    alert('is test IE');
  }

}
