import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DiaryService } from '../services/diary/diary.service';
import { catchError, EMPTY, Observable, of, switchMap, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { showSnackbar } from '../utils/snackbar';
import { DiaryDTO } from '../models/diary/DiaryDTO';
import { AsyncPipe } from '@angular/common';
import { DatePipe } from '../pipes/diary/date.pipe';

@Component({
    selector: 'app-diary',
    imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatSnackBarModule, DatePipe],
    templateUrl: './diary.component.html',
    styleUrl: './diary.component.scss'
})
export class DiaryComponent implements OnInit {
    diaryService = inject(DiaryService);
    _snackBar = inject(MatSnackBar);

    diary?: DiaryDTO;

    wentBack = signal(0);

    constructor() {
        document.title = "Diary";
    }

    async ngOnInit() {
        this.diary = await this.getTodaysDiary();
        console.log(this.diary);
        
    }

    async getTodaysDiary(): Promise<DiaryDTO> {
        try {
            return await this.diaryService.getDiary();
        } catch (error: any) {
            await this.diaryService.createDiary();
            return await this.diaryService.getDiary();
        }
    }

    async nextDiary() {
        const nextDate: Date = new Date(this.diary?.date!);
        nextDate.setDate(nextDate.getDate() + 1);

        try {
            this.diary = await this.diaryService.getDiary(nextDate);
            this.wentBack.set(this.wentBack() - 1);
        } catch (error) {
            showSnackbar(this._snackBar, "Can't create tomorrow's diary manually!");
        }
    }

    async previousDiary() {
        const prevDate: Date = new Date(this.diary?.date!);
        prevDate.setDate(prevDate.getDate() - 1);

        try {
            this.diary = await this.diaryService.getDiary(prevDate);
            this.wentBack.set(this.wentBack() + 1);
        } catch (error) {
            showSnackbar(this._snackBar, "Previous Diary doesn't exist!");
        }
    }
}
