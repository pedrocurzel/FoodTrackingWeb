export interface DiaryFoodDTO {
    id: number;
    diaryId: number;
    foodId: number;
    foodGramsQuantity: number;
    mealCategory: MealCategory;
}

export enum MealCategory
{
    Breakfast = 0,
    Lunch = 1,
    Snacks = 2,
    Dinner = 3
}
