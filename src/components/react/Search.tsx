/** @jsxImportSource react */
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-hooks-web';
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
			<SearchBox></SearchBox>
			<Hits></Hits>
		</InstantSearch>
	);
};

function Hit({ hit }) {
	return JSON.stringify(hit);
}

export default Search;
