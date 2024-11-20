export interface FoodLifeTimeType {
	emoji: string;
	name: string;
	lifeTime: Date;
	quantity: number;
}

export enum RecipeDifficultyType {
	EASY = 'EASY',
	NORMAL = 'NORMAL',
	HARD = 'HARD',
}