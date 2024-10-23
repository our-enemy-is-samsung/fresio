// lib/timeAgo.ts

/**
 * 주어진 날짜로부터 현재까지 경과한 시간을 "n시간 전", "n분 전" 등의 형식으로 반환합니다.
 *
 * @param {Date} date - 비교할 날짜 (optional).
 * @returns {string} 경과된 시간을 나타내는 문자열.
 */
export const timeAgo = (date?: Date): string => {
	// date가 유효하지 않으면 '방금 전'을 반환
	if (!date) return '방금 전';

	const now = new Date();
	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	// 영어로 유지한 intervals 객체
	const intervals: { [key: string]: number } = {
		year: 31536000,
		month: 2592000,
		day: 86400,
		hour: 3600,
		minute: 60,
		second: 1,
	};

	// 각 단위를 한국어로 변환하는 맵핑
	const unitMapping: { [key: string]: string } = {
		year: '년',
		month: '달',
		day: '일',
		hour: '시간',
		minute: '분',
		second: '초',
	};

	for (const unit in intervals) {
		const interval = Math.floor(seconds / intervals[unit]);
		if (interval >= 1) {
			// 영어 단위를 한국어로 변환
			const koreanUnit = unitMapping[unit];
			return `${interval}${koreanUnit} 전`;
		}
	}

	return '방금 전';
};