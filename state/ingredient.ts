import {create} from 'zustand';
import {CustomAxios} from "@/utils/api";

// Types
export interface RecipeStep {
	id: string;
	description: string;
	thumbnailImage: string;
}

export interface RecipeIngredient {
	id: string;
	createdAt: string;
	units: string;
	quantity: string;
	thumbnailImage: string;
	recipeStep: RecipeStep[];
}

export interface RecommendRecipe {
	id: string;
	name: string;
	createdAt: string;
	thumbnailImage: string;
	ingredientList: RecipeIngredient[];
}

export interface Ingredient {
	id: string;
	name: string;
	createdAt: string;
	expiredAt: string;
	quantity: string;
	thumbnailImage: string;
}

// 생성 시 필요한 타입
export type CreateIngredientInput = Omit<Ingredient, 'id' | 'createdAt'>;

// 업데이트 시 필요한 타입
export type UpdateIngredientInput = Partial<Omit<Ingredient, 'id' | 'createdAt'>> & { id: string };

export interface IngredientDetail extends Ingredient {
	ingredientList: Ingredient[];
	recommendRecipe: RecommendRecipe[];
}

// Mock Data
const MOCK_INGREDIENTS: Ingredient[] = [
	{
		id: "1",
		name: "토마토",
		createdAt: "2024-01-01",
		expiredAt: "2024-01-10",
		quantity: "3",
		thumbnailImage: "",
	},
	{
		id: "2",
		name: "양파",
		createdAt: "2024-01-02",
		expiredAt: "2024-01-15",
		quantity: "2",
		thumbnailImage: "",
	}
];

const MOCK_INGREDIENT_DETAILS: IngredientDetail[] = [
	{
		id: "1",
		name: "토마토",
		createdAt: "2024-01-01",
		expiredAt: "2024-01-10",
		quantity: "3",
		thumbnailImage: "",
		ingredientList: [
			{
				id: "1-1",
				createdAt: "2024-01-01",
				expiredAt: "2024-01-10",
				quantity: "1",
				thumbnailImage: "",
				name: "토마토"
			}
		],
		recommendRecipe: [
			{
				id: "recipe-1",
				name: "토마토 파스타",
				createdAt: "2024-01-01",
				thumbnailImage: "",
				ingredientList: [
					{
						id: "1",
						createdAt: "2024-01-01",
						units: "개",
						quantity: "2",
						thumbnailImage: "",
						recipeStep: [
							{
								id: "step-1",
								description: "토마토를 깨끗이 씻어주세요.",
								thumbnailImage: ""
							}
						]
					}
				]
			}
		]
	}
];

// API Service Interface
interface IngredientService {
	getIngredients: () => Promise<Ingredient[]>;
	getIngredientById: (id: string) => Promise<IngredientDetail>;
	createIngredient: (ingredient: CreateIngredientInput) => Promise<Ingredient>;
	updateIngredient: (ingredient: UpdateIngredientInput) => Promise<Ingredient>;
	deleteIngredient: (id: string) => Promise<void>;
}

// API Service Implementation
const apiIngredientService: IngredientService = {
	getIngredients: async () => {
		const response = await CustomAxios.get<{ data: { ingredient: Ingredient[] } }>('/ingredient/list');
		return response.data.data.ingredient;
	},
	getIngredientById: async (id: string) => {
		const response = await CustomAxios.get<{ data: IngredientDetail }>(`/ingredient/detail/${id}`);
		return response.data.data;
	},
	createIngredient: async (ingredient) => {
		const response = await CustomAxios.post<{ data: Ingredient }>('/ingredient', ingredient);
		return response.data.data;
	},
	updateIngredient: async (ingredient) => {
		const response = await CustomAxios.put<{ data: Ingredient }>(`/ingredient/${ingredient.id}`, ingredient);
		return response.data.data;
	},
	deleteIngredient: async (id: string) => {
		await CustomAxios.delete(`/ingredient/${id}`);
	}
};

// Mock Service Implementation
const mockIngredientService: IngredientService = {
	getIngredients: async () => {
		return Promise.resolve(MOCK_INGREDIENTS);
	},
	getIngredientById: async (id: string) => {
		const ingredient = MOCK_INGREDIENT_DETAILS.find(i => i.id === id);
		if (!ingredient) throw new Error('Ingredient not found');
		return Promise.resolve(ingredient);
	},
	createIngredient: async (ingredient) => {
		const newIngredient: Ingredient = {
			...ingredient,
			id: `ingredient_${Date.now()}`,
			createdAt: new Date().toISOString(),
		};
		MOCK_INGREDIENTS.push(newIngredient);
		return Promise.resolve(newIngredient);
	},
	updateIngredient: async (ingredient) => {
		const index = MOCK_INGREDIENTS.findIndex(i => i.id === ingredient.id);
		if (index === -1) throw new Error('Ingredient not found');

		const updatedIngredient: Ingredient = {
			...MOCK_INGREDIENTS[index],
			...ingredient,
			createdAt: MOCK_INGREDIENTS[index].createdAt // 생성일은 유지
		};

		MOCK_INGREDIENTS[index] = updatedIngredient;
		return Promise.resolve(updatedIngredient);
	},
	deleteIngredient: async (id: string) => {
		const index = MOCK_INGREDIENTS.findIndex(i => i.id === id);
		if (index === -1) throw new Error('Ingredient not found');
		MOCK_INGREDIENTS.splice(index, 1);
		return Promise.resolve();
	}
};

// Select service based on environment
const ingredientService: IngredientService = mockIngredientService;

// Zustand Store
interface IngredientStore {
	ingredients: Ingredient[];
	currentIngredient: IngredientDetail | null;
	isLoading: boolean;
	error: string | null;
	fetchIngredients: () => Promise<void>;
	fetchIngredientById: (id: string) => Promise<void>;
	addIngredient: (ingredient: CreateIngredientInput) => Promise<void>;
	updateIngredient: (ingredient: UpdateIngredientInput) => Promise<void>;
	deleteIngredient: (id: string) => Promise<void>;
}

const useIngredientStore = create<IngredientStore>((set, get) => ({
	ingredients: [],
	currentIngredient: null,
	isLoading: false,
	error: null,

	fetchIngredients: async () => {
		set({isLoading: true, error: null});
		try {
			const ingredients = await ingredientService.getIngredients();
			set({ingredients});
		} catch (error) {
			set({error: error instanceof Error ? error.message : '재료 목록을 불러오는데 실패했습니다.'});
		} finally {
			set({isLoading: false});
		}
	},

	fetchIngredientById: async (id: string) => {
		set({isLoading: true, error: null});
		try {
			const ingredient = await ingredientService.getIngredientById(id);
			set({currentIngredient: ingredient});
		} catch (error) {
			set({error: error instanceof Error ? error.message : '재료 상세정보를 불러오는데 실패했습니다.'});
		} finally {
			set({isLoading: false});
		}
	},

	addIngredient: async (ingredient) => {
		set({isLoading: true, error: null});
		try {
			const newIngredient = await ingredientService.createIngredient(ingredient);
			set(state => ({
				ingredients: [...state.ingredients, newIngredient]
			}));
		} catch (error) {
			set({error: error instanceof Error ? error.message : '재료 추가에 실패했습니다.'});
			throw error;
		} finally {
			set({isLoading: false});
		}
	},

	updateIngredient: async (ingredient) => {
		set({isLoading: true, error: null});
		try {
			const updatedIngredient = await ingredientService.updateIngredient(ingredient);
			set(state => ({
				ingredients: state.ingredients.map(i =>
					i.id === ingredient.id ? updatedIngredient : i
				)
			}));
		} catch (error) {
			set({error: error instanceof Error ? error.message : '재료 수정에 실패했습니다.'});
			throw error;
		} finally {
			set({isLoading: false});
		}
	},

	deleteIngredient: async (id: string) => {
		set({isLoading: true, error: null});
		try {
			await ingredientService.deleteIngredient(id);
			set(state => ({
				ingredients: state.ingredients.filter(ingredient => ingredient.id !== id)
			}));
		} catch (error) {
			set({error: error instanceof Error ? error.message : '재료 삭제에 실패했습니다.'});
			throw error;
		} finally {
			set({isLoading: false});
		}
	},
}));

export default useIngredientStore;