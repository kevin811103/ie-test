import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-tabindex',
  templateUrl: './test-tabindex.component.html',
  styleUrls: ['./test-tabindex.component.css']
})
export class TestTabindexComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const aa = document.getElementsByTagName('input');
    console.log('aa:', aa);
    for (let i = 1; i < aa.length; i++) {
      console.log(aa[i]);
      aa[i].tabIndex = i;
    }
  }

}
