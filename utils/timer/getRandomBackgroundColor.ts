export default function getTimerRandomBackgroundColor(): string {
	const colors = ['#12B76A', '#F4902F', '#B74D12', '#12B7AD', '#1272B7', '#A134B3'];

	return colors[Math.floor(Math.random() * colors.length)];
}