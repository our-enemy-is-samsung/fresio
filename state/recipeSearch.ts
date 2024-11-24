import {create} from 'zustand';
import {CustomAxios} from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RECENT_SEARCHES_KEY = '@recent_searches';
const MAX_RECENT_SEARCHES = 10;

export interface Recipe {
    id: string;
    name: string;
    imageUrl: string;
    cookTime: string;
    difficulty: string;
    category: string;
}

export interface TrendingSearch {
    id: string;
    keyword: string;
    trend: 'up' | 'down' | 'same';
    count: number;
}

export interface RecentSearch {
    keyword: string;
    timestamp: number;
}

interface RecipeSearchService {
    searchRecipes: (query: string) => Promise<Recipe[]>;
    getTrendingSearches: () => Promise<TrendingSearch[]>;
}

const MOCK_RECIPES: Recipe[] = [
	{
		id: "1",
		name: "김치찌개",
		imageUrl: "https://example.com/kimchi.jpg",
		cookTime: "30분",
		difficulty: "쉬움",
		category: "한식"
	},
	{
		id: "2",
		name: "된장찌개",
		imageUrl: "https://example.com/doenjang.jpg",
		cookTime: "25분",
		difficulty: "쉬움",
		category: "한식"
	},
	{
		id: "3",
		name: "스파게티",
		imageUrl: "https://example.com/pasta.jpg",
		cookTime: "20분",
		difficulty: "보통",
		category: "양식"
	}
];

const MOCK_TRENDING: TrendingSearch[] = [
	{id: '1', keyword: '김치찌개', trend: 'up', count: 1200},
	{id: '2', keyword: '된장찌개', trend: 'same', count: 800},
	{id: '3', keyword: '라면', trend: 'down', count: 750},
	{id: '4', keyword: '비빔밥', trend: 'up', count: 950},
	{id: '5', keyword: '삼겹살', trend: 'same', count: 600}
];

const apiRecipeSearchService: RecipeSearchService = {
	searchRecipes: async (query: string) => {
		const response = await CustomAxios.get<{ data: Recipe[] }>(`/recipes/search?q=${query}`);
		return response.data.data;
	},
	getTrendingSearches: async () => {
		const response = await CustomAxios.get<{ data: TrendingSearch[] }>('/recipes/trending');
		return response.data.data;
	}
};

const mockRecipeSearchService: RecipeSearchService = {
	searchRecipes: async (query: string) => {
		await new Promise(resolve => setTimeout(resolve, 1000));
		return MOCK_RECIPES.filter(recipe =>
			recipe.name.toLowerCase().includes(query.toLowerCase()) ||
			recipe.category.toLowerCase().includes(query.toLowerCase())
		);
	},
	getTrendingSearches: async () => {
		await new Promise(resolve => setTimeout(resolve, 500));
		return MOCK_TRENDING;
	}
};

const recipeSearchService: RecipeSearchService = apiRecipeSearchService;

interface RecipeSearchStore {
    recipes: Recipe[];
    trending: TrendingSearch[];
    recentSearches: RecentSearch[];
    isLoading: boolean;
    isTrendingLoading: boolean;
    error: string | null;
    trendingError: string | null;
    searchRecipes: (query: string) => Promise<Recipe[]>;
    fetchTrending: () => Promise<void>;
    loadRecentSearches: () => Promise<void>;
    addRecentSearch: (keyword: string) => Promise<void>;
    clearRecentSearches: () => Promise<void>;
}

const useRecipeSearchStore = create<RecipeSearchStore>((set, get) => ({
    recipes: [],
    trending: [],
    recentSearches: [],
    isLoading: false,
    isTrendingLoading: false,
    error: null,
    trendingError: null,

    searchRecipes: async (query: string): Promise<Recipe[]> => {
        set({isLoading: true, error: null});
        try {
            const results = await recipeSearchService.searchRecipes(query);
            set({recipes: results});
            await get().addRecentSearch(query);
			return results;
        } catch (error) {
            set({error: error instanceof Error ? error.message : '레시피 검색에 실패했습니다'});
            throw error;
        } finally {
            set({isLoading: false});
        }
    },

    fetchTrending: async () => {
        set({isTrendingLoading: true, trendingError: null});
        try {
            const trending = await recipeSearchService.getTrendingSearches();
            set({trending});
        } catch (error) {
            set({trendingError: error instanceof Error ? error.message : '인기 검색어를 불러오는데 실패했습니다'});
            throw error;
        } finally {
            set({isTrendingLoading: false});
        }
    },

    loadRecentSearches: async () => {
        try {
            const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
            const searches = stored ? JSON.parse(stored) : [];
            set({ recentSearches: searches });
        } catch (error) {
            console.error('Failed to load recent searches:', error);
        }
    },

    addRecentSearch: async (keyword: string) => {
        try {
            const newSearch: RecentSearch = {
                keyword: keyword.trim(),
                timestamp: Date.now(),
            };

            const currentSearches = get().recentSearches;
            const filtered = currentSearches.filter(s => s.keyword !== keyword);
            const updated = [newSearch, ...filtered].slice(0, MAX_RECENT_SEARCHES);

            await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
            set({ recentSearches: updated });
        } catch (error) {
            console.error('Failed to save recent search:', error);
        }
    },

    clearRecentSearches: async () => {
        try {
            await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
            set({ recentSearches: [] });
        } catch (error) {
            console.error('Failed to clear recent searches:', error);
        }
    },
}));

export default useRecipeSearchStore;