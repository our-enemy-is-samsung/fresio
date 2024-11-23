/**
 * Toast 상태 관리를 위한 Zustand 스토어
 *
 * 애플리케이션 전역에서 토스트 메시지를 관리하는 스토어입니다.
 * 여러 개의 토스트를 동시에 표시할 수 있으며, 각 토스트는 고유한 ID를 가집니다.
 *
 * @example
 * ```tsx
 * const { addToast } = useToastStore();
 *
 * // 성공 토스트 표시
 * addToast('업로드 완료!', 'success', 3000);
 *
 * // 에러 토스트 표시
 * addToast('업로드 실패', 'error', 3000);
 * ```
 */

import {create} from 'zustand';

export type ToastType = 'info' | 'success' | 'error' | 'warn';

interface Toast {
	id: string;
	text: string;
	type: ToastType;
	duration: number;
	createdAt: number; // 생성 시간을 저장하여 순서 보장
}

export interface ToastStore {
	/** 현재 표시 중인 토스트 목록 */
	toasts: Toast[];
	/**
	 * 새로운 토스트를 추가합니다
	 * @param text - 표시할 메시지
	 * @param type - 토스트 타입
	 * @param duration - 표시 지속 시간 (ms)
	 */
	addToast: (text: string, type?: ToastType, duration?: number) => void;
	/**
	 * 특정 토스트를 제거합니다
	 * @param id - 제거할 토스트의 ID
	 */
	removeToast: (id: string) => void;
	/** 모든 토스트를 제거합니다 */
	clearToasts: () => void;
}

const MAX_TOASTS = 3; // 동시에 표시할 수 있는 최대 토스트 수
const DEFAULT_DURATION = 3000; // 기본 지속 시간 (3초)

const useToastStore = create<ToastStore>((set, get) => ({
	toasts: [],

	addToast: (text: string, type: ToastType = 'info', duration: number = DEFAULT_DURATION) => {
		const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
		const newToast: Toast = {
			id,
			text,
			type,
			duration,
			createdAt: Date.now(),
		};

		set((state) => {
			// 최대 개수를 초과하는 경우 가장 오래된 토스트 제거
			let updatedToasts = [...state.toasts, newToast];
			if (updatedToasts.length > MAX_TOASTS) {
				updatedToasts = updatedToasts.slice(-MAX_TOASTS);
			}

			return {toasts: updatedToasts};
		});

		// 지정된 시간 후 자동 제거
		setTimeout(() => {
			// 이미 제거되었는지 확인 후 제거
			if (get().toasts.find(toast => toast.id === id)) {
				set((state) => ({
					toasts: state.toasts.filter((toast) => toast.id !== id),
				}));
			}
		}, duration + 300); // 애니메이션 시간 고려
	},

	removeToast: (id: string) => {
		set((state) => ({
			toasts: state.toasts.filter((toast) => toast.id !== id),
		}));
	},

	clearToasts: () => {
		set({toasts: []});
	},
}));

export default useToastStore;