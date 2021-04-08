import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoutingService } from './../../services/routing.service';
import { Color } from './../../models/color';
import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css'],
})
export class ColorsComponent implements OnInit {
  colors: Color[] = [];
  filterText: string = '';
  colorEditForm: FormGroup;
  color: Color;
  isColorSetted: boolean = false;
  formMessage: any;

  constructor(
    private colorService: ColorService,
    private routingService: RoutingService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  createColorEditForm() {
    this.colorEditForm = this.formBuilder.group({
      id: [this.routingService.currentColor.id, Validators.required],
      name: [this.routingService.currentColor.name, Validators.required],
    });
  }

  ngDoCheck() {
    if (this.routingService.currentColor !== this.color) {
      console.log('aa');
      this.color = this.routingService.currentColor;
      this.createColorEditForm();
      this.isColorSetted = true;
    }
    if (this.colorService.allColors !== this.colors) {
      this.colors = this.colorService.allColors;
    }
  }

  setCurrentColor(color: Color) {
    this.routingService.setCurrentColor(color);
  }
  setCurrentColorDefault() {
    this.routingService.setCurrentColorDefault();
  }

  getColorClass(color: Color) {
    if (color === this.routingService.currentColor) {
      return 'list-group-item btn active';
    } else {
      return 'list-group-item btn';
    }
  }

  delete(color: Color) {
    if (confirm('Are you sure to delete ' + color.name + '?')) {
      this.colorService.delete(color).subscribe(() => {});
    }
  }

  editColor() {
    if (this.colorEditForm.valid) {
      this.colorService.editColor(this.colorEditForm.value).subscribe(
        (res: any) => {
          this.formMessage = {
            message: 'Color editted succesfully.',
            success: true,
          };
        },
        (err: any) => {
          console.log(err);
          this.formMessage = err;
        }
      );
    } else {
      this.formMessage = { message: 'Form is not valid', success: false };
    }
  }

  isAdmin() {
    return this.authService.user.IsAdmin;
  }
}
