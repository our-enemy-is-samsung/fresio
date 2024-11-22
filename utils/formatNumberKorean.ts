// lib/formatNumber.ts

/**
 * 숫자를 천, 만, 억 단위로 변환하여 반환합니다.
 *
 * @param {number} num - 변환할 숫자.
 * @returns {string} 변환된 숫자를 포함한 문자열.
 */
export const formatNumberKorean = (num?: number): string => {
	// num이 undefined나 null 또는 숫자가 아닐 경우 처리
	if (num === undefined || num === null || isNaN(num)) {
		return '0'; // 기본값으로 '0'을 반환
	}

	if (num >= 100000000) {
		return (num / 100000000).toFixed(1) + '억';
	} else if (num >= 10000) {
		return (num / 10000).toFixed(1) + '만';
	} else if (num >= 1000) {
		return (num / 1000).toFixed(1) + '천';
	} else {
		return num.toString();
	}
};