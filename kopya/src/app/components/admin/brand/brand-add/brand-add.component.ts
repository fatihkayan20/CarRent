import { BrandService } from './../../../../services/brand.service';
import { ResponseModel } from './../../../../models/responseModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  addForm: FormGroup;
  message: ResponseModel;

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  add() {
    if (this.addForm.valid) {
      this.brandService.add(this.addForm.value).subscribe(
        () => {
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.message = { message: 'Form is not valid', success: false };
    }
  }
}
