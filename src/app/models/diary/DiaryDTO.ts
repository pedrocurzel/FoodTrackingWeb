import { DiaryFoodDTO } from "./DiaryFoodDTO";

export interface DiaryDTO {
    id: number;
    date: string;
    userId: number;
    diaryFoods: DiaryFoodDTO[];
}