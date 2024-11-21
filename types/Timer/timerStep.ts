export type TimerStepType = {
	id: string;
	hours: number;
	minutes: number;
	recipe: string;
}

export interface TimerStepModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (hours: number, minutes: number, recipe: string) => void;
    initialHours?: number;
    initialMinutes?: number;
    initialRecipe?: string;
    title?: string;
    submitText?: string;
}
