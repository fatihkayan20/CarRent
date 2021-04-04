import { ActivatedRoute } from '@angular/router';
import { RentAddModel } from './../../models/rentAddModel';
import { RentalService } from './../../services/rental.service';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
  errorMessage: any;
  successMessage: string = '';
  minDate?: string = '';
  maxDate?: string = '';
  rentMessage: string = '';
  lastPrice: number;
  rentAddModel: RentAddModel;
  carId: number;

  @Input() dailyPrice: number;
  @Input() isAvailable: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private rentalService: RentalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.carId = Number(param['carId'].split('-')[0]);
    });
    this.createCarRentForm();
    this.createPaymentForm();

    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
  }

  createCarRentForm() {
    this.carRentForm = this.formBuilder.group({
      carId: [this.carId],
      rentDate: ['', Validators.required],
      returnDate: [null],
    });
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      owner: ['', Validators.required],
      number: ['', Validators.required],
      cvv: ['', Validators.required],
      expiryYear: [0, Validators.required],
      expiryMonth: [0, Validators.required],
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
    if (this.paymentForm.valid) {
      this.rentAddModel = {
        payment: this.paymentForm.value,
        rental: this.carRentForm.value,
      };

      this.rentalService.rent(this.rentAddModel).subscribe(
        (res) => {
          this.successMessage = 'Car rented successfully.';
        },
        (err) => {
          this.errorMessage = err.error;
        }
      );
    } else {
      this.errorMessage = { success: false, message: 'Form must be valid' };
    }
  }

  minDateChange(date: any) {
    this.minDate = date.target.value;
    this.maxDate = this.datePipe.transform(
      new Date(
        new Date(this.minDate).setFullYear(new Date().getFullYear() + 1)
      ),
      'yyyy-MM-dd'
    );
  }

  maxDateChange(date: any) {
    let differance =
      new Date(this.carRentForm.value.returnDate).getTime() -
      new Date(this.carRentForm.value.rentDate).getTime();

    let price = new Date(differance).getDate();
    this.lastPrice = price * this.dailyPrice;

    this.rentMessage = `${this.lastPrice}$ for  ${price} days`;
  }
}
