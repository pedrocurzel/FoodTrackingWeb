import { MatSnackBar } from "@angular/material/snack-bar";

export function showSnackbar(snack: MatSnackBar, mss?: any) {
    snack.open(mss.error.message ?? "Unexpected Error!", undefined, {
        verticalPosition: 'top',
        duration: 5000,
        panelClass: ['red-snackbar']
    });
}