import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { DiaryDTO } from '../../models/diary/DiaryDTO';
import { CreateDiaryDTO } from '../../models/diary/CreateDiaryDTO';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DiaryService {
    http = inject(HttpClient);

    endpoint = environment.api + "/Diary";

    userId = Number.parseInt(localStorage.getItem("user-id")!);

    constructor() { }

    /**
     * Get the diary based on a date and a user id.
     * @param chosenDate A nullable Date object, if null the function will use the current date.
     * @returns An `Observable` of `DiaryDTO`.
     */
    async getDiary(chosenDate: Date | null = null) {
        const date = chosenDate ?? new Date();
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();

        return await firstValueFrom(
            this.http.get<DiaryDTO>(this.endpoint + `/get/${this.userId}/${day}/${month}/${year}`)
        );
    }

    async createDiary(chosenDate: Date | null = null) {
        var createDiary = {} as CreateDiaryDTO;
        createDiary.userId = this.userId;
        createDiary.date = chosenDate ?? new Date();
         
        return await firstValueFrom(
            this.http.post(this.endpoint + `/create`, createDiary)
        );
    }
}
