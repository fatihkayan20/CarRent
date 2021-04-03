import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rental } from 'src/app/models/rental';

@Component({
  selector: 'app-rent-modal',
  templateUrl: './rent-modal.component.html',
  styleUrls: ['./rent-modal.component.css'],
})
export class RentModalComponent implements OnInit {
  state: number = 1;
  rent?: Rental;
  carRentForm: FormGroup;
  paymentForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createCarRentForm();
    this.createPaymentForm();
  }

  createCarRentForm() {
    this.carRentForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: [''],
    });
  }
  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      owner: ['', Validators.required],
      number: ['', Validators.required],
      cvv: ['', Validators.required],
      expiryYear: ['', Validators.required],
      expiryMonth: ['', Validators.required],
    });
  }

  routeToPayment() {
    if (this.carRentForm.valid) {
      this.state = 2;
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Rent date must be valid';
    }
  }

  completePayment() {
    console.log(this.paymentForm.value);
    if (this.paymentForm.valid) {
      this.state = 2;
    } else {
      this.errorMessage = 'Form must be valid';
    }
  }
}
