import { Component, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-testlazyloading',
  templateUrl: './testlazyloading.component.html',
  styleUrls: ['./testlazyloading.component.css']
})
export class TestlazyloadingComponent implements OnInit, AfterContentInit {
  testNgIf = true;
  constructor() { }
  ngAfterContentInit() {
    const aa = document.getElementsByTagName('a');
    console.log('aa:', aa);
    for (let i = 0; i < aa.length; i++) {
      console.log(aa[i]);
      console.log('top:', aa[i].offsetTop);
      console.log('height:', aa[i].offsetHeight);
      console.log('left:', aa[i].offsetLeft);
      aa[i].tabIndex = i + 1;
    }

  }
  ngOnInit() {

    setTimeout(() => {
      this.testNgIf = false;
    }, 2000);

    const aa = document.getElementsByTagName('input');
    console.log('aa:', aa);
    for (let i = 0; i < aa.length; i++) {
      console.log(aa[i]);
      console.log('top:', aa[i].offsetTop);
      console.log('height:', aa[i].offsetHeight);
      console.log('left:', aa[i].offsetLeft);
      aa[i].tabIndex = i + 1;
      aa[i].value = (i + 1).toString();
    }
  }

}
