import { type ParentComponent } from 'solid-js';
import Badges from '@components/solidjs/Badges';
import { type IRecipeFieldsSubset } from '@customTypes/types';

export interface ICard {
	data: IRecipeFieldsSubset;
	cardNumber?: number;
}

const Card: ParentComponent<ICard> = (props) => {
	const { data, cardNumber } = props;

	return (
		<a href={`recipe/${data.slug}/`}>
			<article class="card card-side bg-base-100 shadow-xl">
				<figure class="w-2/5 flex-none bg-neutral">
					{data.imgUrl ? (
						<img
							{...(cardNumber > 5 ? { loading: 'lazy' } : {})}
							width="150"
							height="150"
							class="rounded-l-2xl"
							src={data.imgUrl + '?fm=webp'}
							alt=""
						/>
					) : (
						<img
							width="150"
							height="150"
							src="assets/placeholder.png"
							alt=""
							class="rounded-l-2xl"
						/>
					)}
				</figure>
				<div class="card-body p-3">
					<h2 class="card-title inline-block [hyphens:auto] [-webkit-hyphens:auto]">
						<span class="mr-1">{data.title}</span>
						{data.vegetarian && (
							<span
								class="badge badge-secondary"
								aria-label="Vegetarisches Gericht"
							>
								Veggi
							</span>
						)}
					</h2>
					<Badges duration={data.duration} category={data.category} />
					{props.children}
				</div>
			</article>
		</a>
	);
};

export default Card;
