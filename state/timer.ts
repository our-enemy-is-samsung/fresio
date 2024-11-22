import {create} from 'zustand';
import axios from 'axios';
import {TimerColor} from "@/enums/TimerColor";

// API 설정
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
const api = axios.create({
	baseURL: `${API_URL}/api`,
	timeout: 10000,
});

export interface TimerStepType {
	id: string;
	hours: number;
	minutes: number;
	recipe: string;
}

export interface TimerType {
	id: string;
	name: string;
	color: TimerColor;
	emoji: string;
	steps: TimerStepType[];
	createdAt: string;
	updatedAt: string;
}

// 목업 데이터
const MOCK_TIMERS: TimerType[] = [
	{
		id: "timer_1",
		name: "라면 끓이기",
		color: TimerColor.Red,
		emoji: "🍜",
		steps: [
			{id: "step_1", hours: 0, minutes: 3, recipe: "물 끓이기"},
			{id: "step_2", hours: 0, minutes: 4, recipe: "면과 스프 넣기"},
			{id: "step_3", hours: 0, minutes: 1, recipe: "계란 넣기"}
		],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: "timer_2",
		name: "김치찌개",
		color: TimerColor.Orange,
		emoji: "🍲",
		steps: [
			{id: "step_1", hours: 0, minutes: 5, recipe: "재료 손질"},
			{id: "step_2", hours: 0, minutes: 15, recipe: "끓이기"},
			{id: "step_3", hours: 0, minutes: 5, recipe: "간맞추기"}
		],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	}
];

// API 서비스 인터페이스
interface TimerService {
	getTimers: () => Promise<TimerType[]>;
	getTimerById: (id: string) => Promise<TimerType>;
	createTimer: (timer: Omit<TimerType, 'id' | 'createdAt' | 'updatedAt'>) => Promise<TimerType>;
	updateTimer: (timer: Omit<TimerType, 'createdAt' | 'updatedAt'>) => Promise<TimerType>;
	deleteTimer: (id: string) => Promise<void>;
}

// 실제 API 서비스 구현
const apiTimerService: TimerService = {
	getTimers: async () => {
		const response = await api.get<TimerType[]>('/timers');
		return response.data;
	},
	getTimerById: async (id: string) => {
		const response = await api.get<TimerType>(`/timers/${id}`);
		return response.data;
	},
	createTimer: async (timer) => {
		const response = await api.post<TimerType>('/timers', timer);
		return response.data;
	},
	updateTimer: async (timer) => {
		const response = await api.put<TimerType>(`/timers/${timer.id}`, timer);
		return response.data;
	},
	deleteTimer: async (id: string) => {
		await api.delete(`/timers/${id}`);
	}
};

// 목업 서비스 구현
const mockTimerService: TimerService = {
	getTimers: async () => {
		return Promise.resolve(MOCK_TIMERS);
	},
	getTimerById: async (id: string) => {
		const timer = MOCK_TIMERS.find(t => t.id === id);
		if (!timer) throw new Error('Timer not found');
		return Promise.resolve(timer);
	},
	createTimer: async (timer) => {
		const newTimer = {
			...timer,
			id: `timer_${Date.now()}`,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		MOCK_TIMERS.push(newTimer);
		return Promise.resolve(newTimer);
	},
	updateTimer: async (timer) => {
		const index = MOCK_TIMERS.findIndex(t => t.id === timer.id);
		if (index === -1) throw new Error('Timer not found');

		const updatedTimer = {
			...timer,
			updatedAt: new Date().toISOString(),
			createdAt: MOCK_TIMERS[index].createdAt,
		};
		MOCK_TIMERS[index] = updatedTimer;
		return Promise.resolve(updatedTimer);
	},
	deleteTimer: async (id: string) => {
		const index = MOCK_TIMERS.findIndex(t => t.id === id);
		if (index === -1) throw new Error('Timer not found');
		MOCK_TIMERS.splice(index, 1);
		return Promise.resolve();
	}
};

// 환경에 따라 서비스 선택
// const timerService: TimerService = process.env.EXPO_PUBLIC_USE_MOCK === 'true'
//	? mockTimerService
//	: apiTimerService;

const timerService: TimerService = mockTimerService;

interface TimerStore {
	timers: TimerType[];
	isLoading: boolean;
	error: string | null;
	fetchTimers: () => Promise<void>;
	getTimerById: (id: string) => Promise<TimerType | undefined>;
	addTimer: (timer: Omit<TimerType, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
	updateTimer: (timer: Omit<TimerType, 'createdAt' | 'updatedAt'>) => Promise<void>;
	deleteTimer: (id: string) => Promise<void>;
}

const useTimerStore = create<TimerStore>((set, get) => ({
	timers: [],
	isLoading: false,
	error: null,

	fetchTimers: async () => {
		set({isLoading: true, error: null});
		try {
			const timers = await timerService.getTimers();
			set({timers});
		} catch (error) {
			set({error: error instanceof Error ? error.message : '타이머 목록을 불러오는데 실패했습니다.'});
		} finally {
			set({isLoading: false});
		}
	},

	getTimerById: async (id: string) => {
		set({isLoading: true, error: null});
		try {
			const timer = await timerService.getTimerById(id);
			return timer;
		} catch (error) {
			set({error: error instanceof Error ? error.message : '타이머를 불러오는데 실패했습니다.'});
			return undefined;
		} finally {
			set({isLoading: false});
		}
	},

	addTimer: async (timer) => {
		set({isLoading: true, error: null});
		try {
			const newTimer = await timerService.createTimer(timer);
			set(state => ({
				timers: [...state.timers, newTimer]
			}));
		} catch (error) {
			set({error: error instanceof Error ? error.message : '타이머 생성에 실패했습니다.'});
			throw error;
		} finally {
			set({isLoading: false});
		}
	},

	updateTimer: async (timer) => {
		set({isLoading: true, error: null});
		try {
			const updatedTimer = await timerService.updateTimer(timer);
			set(state => ({
				timers: state.timers.map(t => t.id === timer.id ? updatedTimer : t)
			}));
		} catch (error) {
			set({error: error instanceof Error ? error.message : '타이머 수정에 실패했습니다.'});
			throw error;
		} finally {
			set({isLoading: false});
		}
	},

	deleteTimer: async (id: string) => {
		set({isLoading: true, error: null});
		try {
			await timerService.deleteTimer(id);
			set(state => ({
				timers: state.timers.filter(timer => timer.id !== id)
			}));
		} catch (error) {
			set({error: error instanceof Error ? error.message : '타이머 삭제에 실패했습니다.'});
			throw error;
		} finally {
			set({isLoading: false});
		}
	},
}));

export default useTimerStore;