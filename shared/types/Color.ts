export interface IColorToken {
	// Surface colors
	surface: string;
	surfaceDim: string;

	// Brand colors
	brand: string;
	brandDim: string;
	brandDark: string;
	brandContainer: string;

	// Error colors
	error: string;
	errorBackground: string;

	// Content colors
	content: string;
	contentDim: string;
	contentSecondary: string;

	// Container colors
	container: string;
	containerDark: string;
	containerDarker: string;
	containerDarkest: string;
}

export interface IColor {
	light: IColorToken;
	dark: IColorToken;
}