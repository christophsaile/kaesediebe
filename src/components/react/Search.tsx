/** @jsxImportSource react */
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';
import CustomHits from '@components/react/CustomHits';
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
			<SearchBox
				autoFocus
				placeholder="Worauf hast du Appetit ..."
				classNames={{
					form: '!h-12 !bg-transparent before:!hidden max-w-md mx-auto',
					input:
						'!rounded-xl !bg-base-100 focus:!border-current !border-neutral-focus !shadow-lg !text-current !caret-current placeholder:!text-neutral-focus !pl-4',
					resetIcon: '!fill-current',
				}}
			/>
			<CustomHits />
		</InstantSearch>
	);
};

export default Search;
