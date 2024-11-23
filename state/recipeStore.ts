import {create} from 'zustand';
import {CustomAxios} from "@/utils/api";
import {ToastStore} from "@/state/toast";

// Types
export interface RecipeIngredient {
    name: string;
    quantity: string;
}

export interface RecipeStep {
    description: string;
    thumbnailUrl?: string;
}

export interface RecipeTimerStep {
    description: string;
    time: number;
}

export interface RecipeTimer {
    backgroundColor: string;
    emoji: string;
    steps: RecipeTimerStep[];
}

export interface Recipe {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    estimatedTime: number;
    servings: number;
    ingredients: RecipeIngredient[];
    steps: RecipeStep[];
    timer: RecipeTimer;
    youtubeId?: string;
}

// Mock Data
const MOCK_RECIPE: Recipe = {
    id: '1',
    name: "김치찌개",
    description: "김치찌개는 한국의 전통 음식 중 하나로, 김치와 돼지고기를 주재료로 하는 찌개이다. 김치찌개는 김치와 돼지고기를 주재료로 하며, 두 재료를 함께 끓여내면서 각종 야채나 고기를 넣어 만든다. 김치찌개는 김치와 돼지고기를 주재료로 하며, 두 재료를 함께 끓여내면서 각종 야채나 고기를 넣어 만든다.",
    thumbnail: "https://recipe1.ezmember.co.kr/cache/recipe/2022/08/10/f5e0b95c2ca77f31083a04c21ff50a741.jpg",
    estimatedTime: 30,
    servings: 4,
    ingredients: [
        {name: "김치", quantity: "200g"},
        {name: "두부", quantity: "200g"},
        {name: "돼지고기", quantity: "200g"},
        {name: "양파", quantity: "200g"},
        {name: "대파", quantity: "200g"},
        {name: "고추", quantity: "200g"}
    ],
    steps: [
        {description: "냄비에 물을 붓고 김치를 넣어 끓인다.", thumbnailUrl: "https://static.wtable.co.kr/image-resize/production/service/recipe/291/4x3/a2421dff-e56c-40bd-8b40-06a91fc000a9.jpg"},
        {description: "두부와 돼지고기를 넣고 끓인다."},
        {description: "양파와 대파를 넣고 끓인다."},
        {description: "고추를 넣고 끓인다."}
    ],
    timer: {
        backgroundColor: "#FF0000",
        emoji: "⏰",
        steps: [
            {description: "냄비에 물을 붓고 김치를 넣어 끓인다.", time: 10},
            {description: "두부와 돼지고기를 넣고 끓인다.", time: 10},
            {description: "양파와 대파를 넣고 끓인다.", time: 5},
            {description: "고추를 넣고 끓인다.", time: 5}
        ]
    },
    youtubeId: "qWbHSOplcvY"
};

// Service Interface
interface RecipeService {
    getRecipe: (id: string) => Promise<Recipe>;
    createRecipe: (recipe: Recipe) => Promise<Recipe>;
    updateRecipe: (id: string, recipe: Partial<Recipe>) => Promise<Recipe>;
    deleteRecipe: (id: string) => Promise<void>;
}

// API Implementation
const apiRecipeService: RecipeService = {
    getRecipe: async (id: string) => {
        const response = await CustomAxios.get<{ data: Recipe }>(`/recipes/${id}`);
        return response.data.data;
    },
    createRecipe: async (recipe: Recipe) => {
        const response = await CustomAxios.post<{ data: Recipe }>('/recipes', recipe);
        return response.data.data;
    },
    updateRecipe: async (id: string, recipe: Partial<Recipe>) => {
        const response = await CustomAxios.put<{ data: Recipe }>(`/recipes/${id}`, recipe);
        return response.data.data;
    },
    deleteRecipe: async (id: string) => {
        await CustomAxios.delete(`/recipes/${id}`);
    }
};

// Mock Implementation
const mockRecipeService: RecipeService = {
    getRecipe: async () => {
        return Promise.resolve(MOCK_RECIPE);
    },
    createRecipe: async (recipe: Recipe) => {
        return Promise.resolve(recipe);
    },
    updateRecipe: async (id: string, recipe: Partial<Recipe>) => {
        return Promise.resolve({...MOCK_RECIPE, ...recipe});
    },
    deleteRecipe: async () => {
        return Promise.resolve();
    }
};

// Select service based on environment
const recipeService: RecipeService = mockRecipeService;

// Store Interface
interface RecipeStore {
    recipe: Recipe | null;
    isLoading: boolean;
    error: string | null;
    fetchRecipe: (id: string, toast: ToastStore) => Promise<void>;
    createRecipe: (recipe: Recipe, toast: ToastStore) => Promise<void>;
    updateRecipe: (id: string, recipe: Partial<Recipe>, toast: ToastStore) => Promise<void>;
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

    createRecipe: async (recipe: Recipe, toast) => {
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

    updateRecipe: async (id: string, recipe: Partial<Recipe>, toast) => {
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