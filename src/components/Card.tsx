import { ParentComponent, createSignal } from 'solid-js';
import Badges from '@components/Badges';
import type { IRecipeFields } from '@customTypes/generated/contentful';

export interface ICard {
	data: IRecipeFields;
	cardNumber: number;
}

const Card: ParentComponent<ICard> = (props) => {
	const { data, cardNumber } = props;
	const [condition] = createSignal(cardNumber > 5 ? true : false);

	return (
		<a href={`recipe/${data.slug}`}>
			<div class="card card-side bg-base-100 shadow-xl">
				<figure class="w-2/5 flex-none">
					{data.image ? (
						<img
							{...(condition() ? { loading: 'lazy' } : {})}
							width="150"
							height="150"
							src={data.image?.fields.file.url + '?w=350&h=350&fm=webp'}
							alt={data.image?.fields.file.fileName}
						/>
					) : (
						<img
							width="150"
							height="150"
							src="assets/placeholder.png"
							alt="Platzhalter Bild"
						/>
					)}
				</figure>
				<div class="card-body p-3">
					<h2 class="card-title inline-block" style="hyphens: auto">
						<span class="mr-1">{data.title}</span>
						{data.vegetarian && (
							<span class="badge badge-secondary">Veggi</span>
						)}
					</h2>
					<Badges duration={data.duration} category={data.category} />
					{props.children}
				</div>
			</div>
		</a>
	);
};

export default Card;
