import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rent-modal',
  templateUrl: './rent-modal.component.html',
  styleUrls: ['./rent-modal.component.css'],
})
export class RentModalComponent implements OnInit {
  state: number = 1;

  constructor() {}

  ngOnInit(): void {}

  routeToPayment() {
    this.state = 2;
  }
}
