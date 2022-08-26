(async () => {
	const dotenv = require('dotenv');
	const algoliasearch = require('algoliasearch');
	const { createClient } = require('contentful');
	dotenv.config();

	const {
		PUBLIC_ALGOLIA_APP_ID,
		ALGOLIA_SEARCH_ADMIN_KEY,
		CONTENTFUL_SPACE_ID: space,
		CONTENTFUL_DELIVERY_API_KEY: accessToken,
	} = process.env;

	const algoliaClient = algoliasearch(
		PUBLIC_ALGOLIA_APP_ID,
		ALGOLIA_SEARCH_ADMIN_KEY
	);

	const algoliaIndex = algoliaClient.initIndex('recipes');

	const ctfClient = createClient({
		space,
		accessToken,
	});

	try {
		const { items } = await ctfClient.getEntries({
			content_type: 'recipe',
			limit: 1000,
		});

		const getList = async (ingredients) => {
			const getIds = ingredients.map((elem) => elem.ingredientId);
			return await ctfClient
				.getEntries({
					content_type: 'ingredient',
					limit: 1000,
					'sys.id[in]': getIds.join(),
				})
				.then((entries) =>
					ingredients.map(
						(elem) =>
							entries.items.find((items) => items.sys.id === elem.ingredientId)
								?.fields.title
					)
				);
		};

		const getIngredientList = await Promise.all(
			items.map(async (recipes) => getList(recipes.fields.ingredients))
		);

		const transformedAlgoliaData = items.map((recipe, index) => ({
			title: recipe.fields.title,
			slug: recipe.fields.slug,
			duration: recipe.fields.duration,
			vegetarian: recipe.fields.vegetarian,
			category: recipe.fields.category,
			ingredients: getIngredientList[index],
			image: `${recipe.fields.image?.fields.file.url}?w=350&h=350&fm=webp`,
			objectID: recipe.sys.id,
		}));

		const indexedContent = await algoliaIndex.saveObjects(
			transformedAlgoliaData
		);

		console.log('Indexed Content:', indexedContent);
	} catch (err) {
		console.error(err);
	}
})();
