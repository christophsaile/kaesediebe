import { Component, createSignal } from 'solid-js';
import { IRecipeFields } from '@customTypes/generated/contentful';
import {
	addItemToStorage,
	removeItemFromStorage,
	isItemInStorage,
} from '@utils/localStorage';

export interface ILike {
	data: IRecipeFields;
}

const Like: Component<ILike> = (props) => {
	const { data } = props;
	const [active, setActive] = createSignal(isItemInStorage('favorites', data));

	const handleClick = (event: Event) => {
		event.preventDefault();
		setActive(!active());
		updateLocalStorage();
	};

	const updateLocalStorage = () => {
		active()
			? addItemToStorage('favorites', data)
			: removeItemFromStorage('favorites', data);
	};

	return (
		<span class="absolute bottom-3 right-3">
			<svg
				onClick={(e: Event) => handleClick(e)}
				xmlns="http://www.w3.org/2000/svg"
				className={`h-6 w-6 ${active() ? 'fill-error' : ''}`}
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
				/>
			</svg>
		</span>
	);
};

export default Like;
