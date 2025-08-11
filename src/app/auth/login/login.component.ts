import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-login',
    imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    hide = signal(true);
    formBuilder = inject(FormBuilder);

    @Output() goToRegister = new EventEmitter();

    form = this.formBuilder.group({
        "username": ["", [Validators.required]],
        "password": ["", [Validators.required]]
    })

    passwordClick(event: MouseEvent) {
        this.hide.set(!this.hide());
        event.stopPropagation();
    }

    register() {
        this.goToRegister.emit();
    }

}
