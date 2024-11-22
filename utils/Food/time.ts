import {Colors} from "@/constants/Color";

/**
 * 주어진 날짜까지 남은 일수를 계산합니다.
 *
 * @param targetDate - 목표 날짜 (Date 객체 또는 ISO 문자열)
 * @returns {string} 남은 일수에 대한 설명
 *
 * @example
 * // 양수일 경우: "n일 남음"
 * // 당일일 경우: "오늘까지"
 * // 음수일 경우: "n일 지남"
 */
export const calculateRemainingDays = (targetDate: Date | string): string => {
	// 목표 날짜를 Date 객체로 변환
	const target = new Date(targetDate);

	// 현재 날짜의 자정 시간 설정 (시간 차이로 인한 오차 방지)
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	target.setHours(0, 0, 0, 0);

	// 밀리초 차이를 일 단위로 변환
	const diffTime = target.getTime() - today.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays > 0) {
		return `${diffDays}일 남음`;
	} else if (diffDays === 0) {
		return '오늘까지';
	} else {
		return `${Math.abs(diffDays)}일 지남`;
	}
};

/**
 * 남은 일수에 따라 색상 키를 반환합니다.
 *
 * @param targetDate - 목표 날짜
 * @returns {keyof typeof Colors.light & keyof typeof Colors.dark} 색상 키
 */
export const getLifeTimeColor = (targetDate: Date | string): keyof typeof Colors => {
	const target = new Date(targetDate);
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	target.setHours(0, 0, 0, 0);

	const diffTime = target.getTime() - today.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays < 0) {
		return 'error';  // 빨간색 - 유통기한 지남
	} else if (diffDays <= 2) {
		return 'error';   // 노란색 - 임박
	} else if (diffDays <= 5) {
		return 'brandDark';   // 노란색 - 곧 만료
	} else {
		return 'contentDim'; // 기본 색상
	}
};