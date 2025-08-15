import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function verifyPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    
    if (password != confirmPassword) {
        return {
            message: "Passwords do not match!",
            mismatch: true
        };
    }
    
    return null;
}
