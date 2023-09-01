<script setup lang="ts">
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite.css';

const searchClient = algoliasearch(
	import.meta.env.PUBLIC_ALGOLIA_APP_ID,
	import.meta.env.PUBLIC_ALGOLIA_SEARCH_API_KEY,
);
const indexName = import.meta.env.PUBLIC_ALGOLIA_INDEX;
</script>

<template>
	<ais-instant-search :search-client="searchClient" :index-name="indexName">
		<ais-search-box
			autofocus
			placeholder="Worauf hast du Appetit ..."
			:class-names="{
				'ais-SearchBox-form':
					'!h-12 !bg-transparent before:!hidden max-w-md mx-auto mb-6',
				'ais-SearchBox-input':
					'!rounded-xl !bg-base-100 focus:!border-current !border-neutral-focus !shadow-lg !text-current !caret-current placeholder:!text-neutral-focus !pl-4',
				'ais-SearchBox-resetIcon': '!fill-current',
			}"
		/>
		<ais-state-results>
			<template v-slot="{ results: { hits, query } }">
				<ais-hits v-if="hits.length > 0 && query.length >= 2">
					<div class="grid gap-4">
						<template v-for="hit in hits" :key="hit.objectID">
							<a :href="`${hit.url}`">
								<article class="card card-side bg-base-100 shadow-xl">
									<figure class="w-2/5 flex-none bg-neutral">
										<img
											:src="hit.image || 'assets/placeholder.png'"
											width="150"
											height="150"
											alt=""
										/>
									</figure>
									<div class="card-body p-2 gap-1">
										<h2
											class="card-title leading-6 inline-block [hyphens:auto]"
										>
											<ais-highlight
												attribute="title"
												:hit="hit"
												:class-names="{
													'ais-Highlight-highlighted':
														'!text-[#355200] !bg-secondary',
												}"
											/>
										</h2>
										<p class="text-xs [hyphens:auto]">
											<span
												v-for="(ingredient, index) in hit.ingredients"
												:key="index"
											>
												<ais-highlight
													:class-names="{
														'ais-Highlight-highlighted':
															'!text-[#355200] !bg-secondary',
													}"
													:attribute="'ingredients.' + index"
													:hit="hit"
												></ais-highlight
												><span v-if="index < hit.ingredients.length - 1"
													>,
												</span>
											</span>
										</p>
									</div>
								</article>
							</a>
						</template>
					</div>
				</ais-hits>
				<div
					class="toast toast-center w-full relative p-0"
					v-else-if="hits.length === 0 && query.length >= 2"
				>
					<div class="alert alert-error shadow-lg">
						<div>
							<span>
								<b>Deine Suche ergab leider keinen Treffer.</b>
								<br />
								Nicht aufgeben – überprüfe die Rechtschreibung oder versuche es
								mit einem anderen Suchbegriff.
							</span>
						</div>
					</div>
				</div>
				<div v-else></div>
			</template>
		</ais-state-results>
	</ais-instant-search>
</template>
