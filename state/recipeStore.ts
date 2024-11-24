import {create} from 'zustand';
import {CustomAxios} from "@/utils/api";
import type {ToastStore} from "@/state/toast";
import {TimerColor} from "@/enums/TimerColor";


enum CookDifficulty {
	EASY = 'easy',
	MEDIUM = 'medium',
	HARD = 'hard'
}

// Types
export interface RecipeIngredient {
	name: string;
	quantity: string;
	units: string;
	thumbnailImage?: string;
}

export interface RecipeStep {
	id: string;
	description: string;
	thumbnailImage?: string;
}

export interface RecipeTimer {
	id: string;
	name: string;
	color: TimerColor;
	emoji: string;
	steps: {
		time: number;
		recipe: string;
	}[];
	createdAt: string;
	updatedAt: string;
}

export interface Recipe {
	id: string;
	name: string;
	description: string;
	thumbnailImage: string;
	estimatedTime: number;
	difficulty: CookDifficulty;
	servings: number;
	ingredients: RecipeIngredient[];
	steps: RecipeStep[];
	timer?: RecipeTimer;
	youtubeId?: string;
	createdAt: string;
	updatedAt: string;
}

// Mock Data
const MOCK_RECIPES: Recipe[] = [
	{
		id: '1',
		name: "김치찌개",
		description: "김치찌개는 한국의 전통 음식 중 하나로, 김치와 돼지고기를 주재료로 하는 찌개입니다.",
		thumbnailImage: "https://recipe1.ezmember.co.kr/cache/recipe/2022/08/10/f5e0b95c2ca77f31083a04c21ff50a741.jpg",
		estimatedTime: 30,
		difficulty: CookDifficulty.EASY,
		servings: 4,
		ingredients: [
			{name: "김치", quantity: "200", units: "g", thumbnailImage: ""},
			{name: "두부", quantity: "200", units: "g", thumbnailImage: ""},
			{name: "돼지고기", quantity: "200", units: "g", thumbnailImage: ""}
		],
		steps: [
			{
				id: "step_1",
				description: "냄비에 물을 붓고 김치를 넣어 끓인다.",
				thumbnailImage: "https://static.wtable.co.kr/image/production/service/recipe/291/4x3/a2421dff-e56c-40bd-8b40-06a91fc000a9.jpg"
			}
		],
		timer: {
			id: "timer_1",
			name: "김치찌개 타이머",
			color: TimerColor.Orange,
			emoji: "🍲",
			steps: [
				{time: 10, recipe: "냄비에 물을 붓고 김치를 넣어 끓인다."},
				{time: 10, recipe: "두부와 돼지고기를 넣고 끓인다."}
			],
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		},
		youtubeId: "qWbHSOplcvY",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: '2',
		name: '메추리알 소고기 장조림 황금레시피',
		description: '짜지않고 살짝~ 매콤, 담백한 쇠고기 장조림입니다.\n\n' +
			'미리 만들어놓고,\n' +
			'꺼내먹을때 먹을만큼 데워서 먹으면, 밑반찬으로 아주 그만이네요.\n' +
			'만드는 방법은 아주 간단합니다. :)',
		thumbnailImage: 'https://recipe1.ezmember.co.kr/cache/recipe/2017/05/24/6314bc68ff3e9c45b1110c30739e83071.jpg',
		estimatedTime: 60,
		difficulty: CookDifficulty.EASY,
		servings: 4,
		ingredients: [
			{name: '소고기 홍두깨살', quantity: '800', units: 'g'},
			{name: '메추리알', quantity: '350', units: 'g'},
			{name: '청량고추', quantity: '8', units: '개'},
			{name: '양파', quantity: '1/2', units: '개'},
			{name: '깨', quantity: '1', units: 't'},
			{name: '진간장', quantity: '1', units: '컵'},
			{name: '소고기 우러물', quantity: '3', units: '컵'},
			{name: '맛술', quantity: '1/5', units: '컵'},
			{name: '매실액', quantity: '1/5', units: '컵'},
			{name: '후추', quantity: '1', units: '작은술'},
			{name: '다진마늘', quantity: '1', units: '큰술'}
		],
		steps: [
			{
				id: 'step_1',
				description: '소고기를 40분 정도 물에 담가 핏물을 빼주세요.',
				thumbnailImage: 'https://recipe1.ezmember.co.kr/cache/recipe/2017/05/24/72e98e261297ca37448075103901528d1.jpg',
			},
			{
				id: 'step_2',
				description: '물이 끓으면 핏물 뺀 소고기를 넣고 40~50분간 끓여주세요. 이때 거품이 올라오면 제거해주세요.',
				thumbnailImage: 'https://recipe1.ezmember.co.kr/cache/recipe/2017/05/24/68ee4cb304ba12a00ce3ef9ddec6d45a1.jpg'
			},
			{
				id: 'step_3',
				description: '양파와 후추를 함께 넣고 끓여주세요. 고기가 익으면 양파는 건져내 버립니다.',
				thumbnailImage: 'https://recipe1.ezmember.co.kr/cache/recipe/2017/05/24/d2f36bc8163614fe715d8069b023f0dd1.jpg',
			},
			{
				id: 'step_4',
				description: '청량고추는 씨를 제거하고 송송 썰어주세요. (매운맛이 부담스러우시면 꽈리고추로 대체 가능합니다)'
			},
			{
				id: 'step_5',
				description: '메추리알은 끓는 물에 한번 데쳐주세요.'
			},
			{
				id: 'step_6',
				description: '익은 소고기를 건져서 손으로 찢어주세요.',
				thumbnailImage: 'https://recipe1.ezmember.co.kr/cache/recipe/2017/05/24/fe1d9a8e29136efcc724ec0b96328d471.jpg'
			},
			{
				id: 'step_7',
				description: '간장과 소고기 우린물을 1:3 비율로 넣어주세요. (입맛에 따라 간장을 더 넣으실 수 있습니다)',
				thumbnailImage: 'https://recipe1.ezmember.co.kr/cache/recipe/2017/05/25/6795b3be5533ae26c47fe8ab4456c8311.jpg'
			},
			{
				id: 'step_8',
				description: '맛술과 매실액을 각각 1/5컵씩 넣고, 다진마늘도 추가해주세요.'
			},
			{
				id: 'step_9',
				description: '모든 재료를 넣고 5분 정도 더 끓여주세요.'
			},
			{
				id: 'step_10',
				description: '그릇에 담고 통깨를 뿌려 완성합니다.',
				thumbnailImage: 'https://recipe1.ezmember.co.kr/cache/recipe/2017/05/25/bbcc73d115cc834581f2d9a59156d1b71.jpg'
			}
		],
		timer: {
			id: 'timer_2',
			name: '메추리알 소고기 장조림 타이머',
			color: TimerColor.Green,
			emoji: '🍳',
			steps: [
				{
					time: 40,
					recipe: '소고기 핏물 빼기'
				},
				{
					time: 45,
					recipe: '소고기 삶기 (거품 걷어내기)'
				},
				{
					time: 10,
					recipe: '양파와 후추 넣고 끓이기'
				},
				{
					time: 3,
					recipe: '메추리알 데치기'
				},
				{
					time: 5,
					recipe: '간장, 맛술, 매실액, 다진마늘과 함께 끓이기'
				},
				{
					time: 5,
					recipe: '청량고추와 함께 마무리 조리'
				}
			],
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		},
		youtubeId: "VDn_dcC88mc",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	}
];

// Service Interface
interface RecipeService {
	getRecipe: (id: string) => Promise<Recipe>;
	createRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Recipe>;
	updateRecipe: (id: string, recipe: Partial<Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<Recipe>;
	deleteRecipe: (id: string) => Promise<void>;
}

// API Implementation
const apiRecipeService: RecipeService = {
	getRecipe: async (id: string) => {
		const response = await CustomAxios.get<{ data: Recipe }>(`/recipe/${id}`);
		return response.data.data;
	},
	createRecipe: async (recipe) => {
		const response = await CustomAxios.post<{ data: Recipe }>('/recipe', recipe);
		return response.data.data;
	},
	updateRecipe: async (id: string, recipe) => {
		const response = await CustomAxios.put<{ data: Recipe }>(`/recipe/${id}`, recipe);
		return response.data.data;
	},
	deleteRecipe: async (id: string) => {
		await CustomAxios.delete(`/recipe/${id}`);
	}
};

// Mock Implementation
const mockRecipeService: RecipeService = {
	getRecipe: async (id: string) => {
		const recipe = MOCK_RECIPES.find(r => r.id === id);
		if (!recipe) throw new Error('Recipe not found');
		return Promise.resolve(recipe);
	},
	createRecipe: async (recipe) => {
		const newRecipe = {
			...recipe,
			id: `recipe_${Date.now()}`,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};
		MOCK_RECIPES.push(newRecipe);
		return Promise.resolve(newRecipe);
	},
	updateRecipe: async (id: string, recipeUpdate) => {
		const index = MOCK_RECIPES.findIndex(r => r.id === id);
		if (index === -1) throw new Error('Recipe not found');

		const updatedRecipe = {
			...MOCK_RECIPES[index],
			...recipeUpdate,
			updatedAt: new Date().toISOString()
		};
		MOCK_RECIPES[index] = updatedRecipe;
		return Promise.resolve(updatedRecipe);
	},
	deleteRecipe: async (id: string) => {
		const index = MOCK_RECIPES.findIndex(r => r.id === id);
		if (index === -1) throw new Error('Recipe not found');
		MOCK_RECIPES.splice(index, 1);
		return Promise.resolve();
	}
};

// Select service based on environment
const recipeService: RecipeService = apiRecipeService;

// Store Interface
interface RecipeStore {
	recipe: Recipe | null;
	isLoading: boolean;
	error: string | null;
	fetchRecipe: (id: string, toast: ToastStore) => Promise<void>;
	createRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>, toast: ToastStore) => Promise<void>;
	updateRecipe: (id: string, recipe: Partial<Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>>, toast: ToastStore) => Promise<void>;
	deleteRecipe: (id: string, toast: ToastStore) => Promise<void>;
}

// Zustand Store
const useRecipeStore = create<RecipeStore>((set) => ({
	recipe: null,
	isLoading: false,
	error: null,

	fetchRecipe: async (id: string, toast) => {
		set({isLoading: true, error: null});
		try {
			const recipe = await recipeService.getRecipe(id);
			set({recipe});
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : '레시피를 불러오는데 실패했습니다.';
			set({error: errorMessage});
			toast.addToast(errorMessage, 'error');
		} finally {
			set({isLoading: false});
		}
	},

	createRecipe: async (recipe, toast) => {
		set({isLoading: true, error: null});
		try {
			const newRecipe = await recipeService.createRecipe(recipe);
			set({recipe: newRecipe});
			toast.addToast('레시피가 성공적으로 생성되었습니다.', 'success');
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : '레시피 생성에 실패했습니다.';
			set({error: errorMessage});
			toast.addToast(errorMessage, 'error');
			throw error;
		} finally {
			set({isLoading: false});
		}
	},

	updateRecipe: async (id: string, recipe, toast) => {
		set({isLoading: true, error: null});
		try {
			const updatedRecipe = await recipeService.updateRecipe(id, recipe);
			set({recipe: updatedRecipe});
			toast.addToast('레시피가 성공적으로 수정되었습니다.', 'success');
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : '레시피 수정에 실패했습니다.';
			set({error: errorMessage});
			toast.addToast(errorMessage, 'error');
			throw error;
		} finally {
			set({isLoading: false});
		}
	},

	deleteRecipe: async (id: string, toast) => {
		set({isLoading: true, error: null});
		try {
			await recipeService.deleteRecipe(id);
			set({recipe: null});
			toast.addToast('레시피가 성공적으로 삭제되었습니다.', 'success');
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : '레시피 삭제에 실패했습니다.';
			set({error: errorMessage});
			toast.addToast(errorMessage, 'error');
			throw error;
		} finally {
			set({isLoading: false});
		}
	}
}));

export default useRecipeStore;