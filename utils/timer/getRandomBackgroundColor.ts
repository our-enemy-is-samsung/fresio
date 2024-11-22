import {TimerColor} from "@/enums/TimerColor";

export default function getTimerRandomBackgroundColor(): TimerColor {
	const colors = [
		TimerColor.Red,
		TimerColor.Orange,
		TimerColor.Green,
		TimerColor.Mint,
		TimerColor.Blue,
		TimerColor.Purple,
	];

	return colors[Math.floor(Math.random() * colors.length)];
}