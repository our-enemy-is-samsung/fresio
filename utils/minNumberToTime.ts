export function minNumberToTime(min: number): string {
	const hour = Math.floor(min / 60);
	const minute = min % 60;

	return `${hour}시간 ${minute}분`;
}