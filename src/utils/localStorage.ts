export const getItemFromStorage = (storage: string) => {
	return JSON.parse(localStorage.getItem(storage)) || [];
};

export const addItemToStorage = (
	storage: string,
	item: { [x: string]: any }
) => {
	let currentStorage: any[] = getItemFromStorage(storage);
	currentStorage = [...currentStorage, item];
	localStorage.setItem(storage, JSON.stringify(currentStorage));
};

export const removeItemFromStorage = (
	storage: string,
	item: { [x: string]: any }
) => {
	let currentStorage: any[] = getItemFromStorage(storage);
	currentStorage = currentStorage.filter((recipe) => recipe.slug !== item.slug);
	localStorage.setItem(storage, JSON.stringify(currentStorage));
};

export const isItemInStorage = (
	storage: string,
	item: { [x: string]: any }
): boolean => {
	return getItemFromStorage(storage).some(
		(recipe) => recipe.slug === item.slug
	);
};
