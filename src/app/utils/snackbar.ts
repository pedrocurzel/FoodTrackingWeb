import { MatSnackBar } from "@angular/material/snack-bar";

export function showSnackbar(snack: MatSnackBar, mss?: string) {
    snack.open(mss ?? "Unexpected Error!", undefined, {
        verticalPosition: 'top',
        duration: 5000,
        panelClass: ['red-snackbar']
    });
}