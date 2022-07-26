import { Component, createSignal } from 'solid-js';
import { getItemFromStorage } from '@utils/localStorage';
import Card from '@components/Card';
import Like from '@components/Like';

const FavoriteList: Component = () => {
	const [favorites] = createSignal<any[]>(getItemFromStorage('favorites'));

	return (
		<>
			{favorites().length ? (
				favorites().map((entry, index) => (
					<Card data={entry} cardNumber={index}>
						<Like data={entry} />
					</Card>
				))
			) : (
				<div class="toast toast-center">
					<div class="alert alert-success">
						<div class="inline">
							Füge ein Rezept deinen Favoriten hinzu indem du es mit einem
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className={`h-4 w-4 fill-error mx-1 inline`}
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
							markierst.
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default FavoriteList;
