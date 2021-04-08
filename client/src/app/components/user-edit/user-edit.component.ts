import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Customer } from './../../models/customer';
import { UserForUpdate } from './../../services/userForUpdate';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  editForm: FormGroup;
  loaded: boolean = false;
  message: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngDoCheck() {
    if (this.authService.user.CustomerId > 0) {
      if (!this.loaded) {
        this.createEditForm();
        this.loaded = true;
      }
    }
  }

  createEditForm() {
    this.editForm = this.formBuilder.group({
      firstName: [
        this.authService.user.Name.split(' ')
          .slice(0, this.authService.user.Name.split(' ').length - 1)
          .toString()
          .replace(',', ' ')
          .replace(',', ' '),
        Validators.required,
      ],
      lastName: [
        this.authService.user.Name.split(' ')[
          this.authService.user.Name.split(' ').length - 1
        ],
        Validators.required,
      ],
      email: [
        this.authService.user.Email,
        [Validators.required, Validators.email],
      ],
      companyName: [this.authService.user.CompanyName, Validators.required],
    });
  }

  updateUser() {
    this.message = {};
    if (this.editForm.valid) {
      let user: UserForUpdate = {
        email: '',
        firstName: '',
        id: 0,
        lastName: '',
      };
      let customer: Customer = {
        id: 0,
        companyName: '',
        userId: 0,
      };
      user.id = Number(this.authService.user.Id);
      user.email = this.editForm.value.email;
      user.firstName = this.editForm.value.firstName;
      user.lastName = this.editForm.value.lastName;

      customer.id = Number(this.authService.user.CustomerId);
      customer.userId = Number(this.authService.user.Id);
      customer.companyName = this.editForm.value.companyName;

      this.userService.updateUser(user, customer).subscribe(
        () => {
          this.authService.setUser();
          this.router.navigate(['/']);
        },
        (err) => {
          this.message = err.errors;
        }
      );
    } else {
      this.message = {
        success: false,
        message: 'Invalid form please check it',
      };
    }
  }
}
