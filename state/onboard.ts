import {create} from "zustand";

type FoodCheck = 'too-much' | 'just-right' | 'too-little' | null;

interface OnboardData {
	selectedAge: string;

	foodCheckPasta: FoodCheck;
	foodCheckPizza: FoodCheck;
	foodCheckCutlet: FoodCheck;
	foodCheckRamen: FoodCheck;
	foodCheckBibimbap: FoodCheck;

	setSelectedAge: (age: string) => void;

	setFoodCheckPasta: (foodCheckPasta: FoodCheck) => void;
	setFoodCheckPizza: (foodCheckPizza: FoodCheck) => void;
	setFoodCheckCutlet: (foodCheckCutlet: FoodCheck) => void;
	setFoodCheckRamen: (foodCheckRamen: FoodCheck) => void;
	setFoodCheckBibimbap: (foodCheckBibimbap: FoodCheck) => void;
}

const useOnboardData = create<OnboardData>((set) => ({
	selectedAge: '',

	foodCheckPasta: null,
	foodCheckPizza: null,
	foodCheckCutlet: null,
	foodCheckRamen: null,
	foodCheckBibimbap: null,

	setSelectedAge: (age) => set({selectedAge: age}),
	setFoodCheckPasta: (foodCheckPasta) => set({foodCheckPasta}),
	setFoodCheckPizza: (foodCheckPizza) => set({foodCheckPizza}),
	setFoodCheckCutlet: (foodCheckCutlet) => set({foodCheckCutlet}),
	setFoodCheckRamen: (foodCheckRamen) => set({foodCheckRamen}),
	setFoodCheckBibimbap: (foodCheckBibimbap) => set({foodCheckBibimbap}),
}));

export default useOnboardData;