export interface FoodLifeTimeType {
	emoji: string;
	name: string;
	lifeTime: Date;
	quantity: string;
}

export enum RecipeDifficulty {
	EASY = 'EASY',
	NORMAL = 'NORMAL',
	HARD = 'HARD',
}