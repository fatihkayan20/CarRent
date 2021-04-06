import { ColorService } from './../../../../services/color.service';
import { ResponseModel } from './../../../../models/responseModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
})
export class ColorAddComponent implements OnInit {
  addForm: FormGroup;
  message: ResponseModel;

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService
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
      this.colorService.add(this.addForm.value).subscribe(
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
