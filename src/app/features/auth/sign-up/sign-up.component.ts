import { group } from '@angular/animations';
import { JsonPipe } from '@angular/common';
import { Component, OnInit, ValueEqualityFn, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  private readonly maxNameLength = 16;
  private readonly fb = inject(FormBuilder);
  signupForm = this.fb.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.maxLength(this.maxNameLength),
        this.badNameValidator('bidzina'),
      ],
    ],
    lastName: [
      '',
      [Validators.required, Validators.maxLength(this.maxNameLength)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  });

  ngOnInit(): void {
   
    // this.controls.confirmPassword.setValidators(
    //   this.confirmPassword(this.controls.password),
    // );
    // this.controls.password.valueChanges.subscribe(() => {
    //  this.controls.confirmPassword.updateValueAndValidity()
    // });
    this.signupForm.addValidators(this.passwordsMatchValidator());
  }
  get controls() {
    return this.signupForm.controls;
  }
  onAutofill() {
    // this.controls.firstName.setValue('john');
    // this.controls.lastName.setValue('doe');

    // this.signupForm.patchValue
    this.signupForm.setValue({
      firstName: 'john',
      lastName: 'doe',
      email: 'john.doe@gmail.com',
      password: 'password',
      confirmPassword: 'pasword',
    });
  }
  onSubmit() {
    console.log(this.signupForm.value);
  }
  // firstName = new FormControl('', [
  //   Validators.required,
  //   Validators.maxLength(16),
  //   // Validators.pattern()
  // ]);

  badNameValidator(pattern: string): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      return control.value.includes(pattern)
        ? { badName: `pattern "${pattern}" is prohibited!` }
        : null;
    };
  }

  // ეს ჩემი დაწერილი არაა, ლექციამდე ამოხსნა ვერ მოვასწარი და მერე ლექციაზე რომ ახსენი ეგ შპარგალკასავით გამოვიდა

  // confirmPassword(compareTo: FormControl<string | null>): ValidatorFn {
  //   return (control: AbstractControl<string>): ValidationErrors | null => {
  //     return control.value === compareTo.value
  //       ? null
  //       : { confirmPassword: 'passwords do no match!' };
  //   };
  // }
  passwordsMatchValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value.password === control.value.confirmPassword
        ? null
        : {
            passwordsMatch: 'Passwords do not match!',
          };
    };
  }
}
