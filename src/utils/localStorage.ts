export const getItemFromStorage = (storage: string) => {
	const item = localStorage.getItem(storage);
	if (item === null) {
		return []; // or any other default value you want to return for null
	}
	return JSON.parse(item);
};

export const addItemToStorage = (
	storage: string,
	item: { [x: string]: any },
) => {
	let currentStorage: any[] = getItemFromStorage(storage);
	currentStorage = [...currentStorage, item];
	localStorage.setItem(storage, JSON.stringify(currentStorage));
};

export const removeItemFromStorage = (
	storage: string,
	item: { [x: string]: any },
) => {
	let currentStorage: any[] = getItemFromStorage(storage);
	currentStorage = currentStorage.filter((recipe) => recipe.slug !== item.slug);
	localStorage.setItem(storage, JSON.stringify(currentStorage));
};

export const isItemInStorage = (
	storage: string,
	item: { [x: string]: any },
): boolean => {
	return getItemFromStorage(storage).some(
		(recipe) => recipe.slug === item.slug,
	);
};
