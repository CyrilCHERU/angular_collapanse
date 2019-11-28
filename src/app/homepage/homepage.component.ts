import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  newt = '';

  constructor() { }

  ngOnInit() {
    const str = '0323809427';
    for (let i = 0; i < 5; i++) {

      const temp = str.slice(0, 2);
      this.newt = temp + '.';
    }
    console.log(this.newt);
  }

}
