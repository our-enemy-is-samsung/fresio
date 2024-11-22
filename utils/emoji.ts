/**
 * 음식 관련 타이머용 이모지를 무작위로 반환합니다.
 *
 * @returns {string} 미리 정의된 음식 관련 이모지 목록에서 무작위로 선택된 이모지.
 */
export function randomEmojiForTimer(): string {
	const foodEmojis = [
		"🍎", "🍊", "🍌", "🍉", "🍇", "🍓", "🍒", "🍑", "🍍", "🥭",
		"🥑", "🍆", "🥕", "🌽", "🥒", "🥬", "🥦", "🍔", "🍟", "🍕",
		"🌭", "🥪", "🌮", "🌯", "🥗", "🍿", "🍣", "🍱", "🍛", "🍜",
		"🍲", "🍤", "🍩", "🍪", "🎂", "🍰", "🧁", "🍫", "🍬", "🍭"
	];
	const randomIndex = Math.floor(Math.random() * foodEmojis.length);
	return foodEmojis[randomIndex];
}