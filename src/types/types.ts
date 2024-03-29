export interface IRecipeFieldsSubset {
	title: string;
	slug: string;
	duration: 'Gering' | 'Hoch';
	vegetarian: boolean;
	category: 'Reis' | 'Nudeln' | 'Kartoffeln' | 'Backwaren' | 'Sonstiges';
	imgAlt?: string;
	imgUrl?: string;
}
