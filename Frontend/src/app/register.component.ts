import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styles: [`
      .error {
        background-color: '#ff0f0f'
      }

  `]
})
export class RegisterComponent {
    form;
    constructor(private fb: FormBuilder, private auth: AuthService) {
        this.form = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, {validator: mismatchedfields('password', 'confirmPassword')});
    }

    onSubmit() {
        console.log(this.form.valid);
        this.auth.register(this.form.value);
    }

    isValid(control) {
        return this.form.controls[control].invalid && this.form.controls[control].touched;
    }

}

function mismatchedfields(field1, field2) {
    return form => {
        if (form.controls[field1].value !== form.controls[field2].value) {
            console.log('true');
            return {mismatchedfields: true};
        }
    };
}
