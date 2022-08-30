/** @jsxImportSource react */
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';
import CustomHits from './CustomHits';
import 'instantsearch.css/themes/satellite.css';

type ISearch = {
	env: {
		appId: string;
		apiKey: string;
		index: string;
	};
};

const Search = ({ env }: ISearch) => {
	const searchClient = algoliasearch(env.appId, env.apiKey);

	return (
		<InstantSearch indexName={env.index} searchClient={searchClient}>
			<CustomHits />
			<SearchBox
				autoFocus
				placeholder="Suche nach Rezepten ..."
				classNames={{
					root: 'fixed bottom-20 left-0 right-0 mx-4',
					form: '!h-12 !bg-transparent before:!hidden',
					input:
						'!rounded-xl !bg-base-100 focus:!border-current !border-neutral-focus !shadow-lg !text-current !caret-current placeholder:!text-neutral-focus',
					resetIcon: '!fill-current',
					submit: 'absolute !block !left-4 !top-0 !bottom-0',
				}}
				submitIconComponent={() => (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						></path>
					</svg>
				)}
			/>
		</InstantSearch>
	);
};

export default Search;
