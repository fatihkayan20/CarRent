import { ColorService } from './../../../../services/color.service';
import { ResponseModel } from './../../../../models/responseModel';
import { Color } from './../../../../models/color';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css'],
})
export class ColorUpdateComponent implements OnInit {
  updateForm: FormGroup;
  isFormCreated: boolean = false;
  colors: Color[] = this.colorService.allColors;
  message: ResponseModel;

  constructor(
    private colorService: ColorService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  createUpdateForm(color: Color) {
    this.updateForm = this.formBuilder.group({
      id: [color.id],
      name: [color.name, [Validators.required]],
    });
  }

  updateModal(color: Color) {
    this.createUpdateForm(color);
    this.isFormCreated = true;
  }

  ngDoCheck() {
    if (this.colorService.allColors !== this.colors) {
      this.colors = this.colorService.allColors;
    }
  }

  update() {
    if (this.updateForm.valid) {
      this.colorService.editColor(this.updateForm.value).subscribe(
        () => {
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.message = {
        success: false,
        message: 'Form is not valid!',
      };
    }
  }

  delete(color: Color) {
    if (window.confirm('Do you wanna delete this car?')) {
      this.colorService.delete(color).subscribe(() => {
        this.colorService.getColors();
      });
    }
  }
}
