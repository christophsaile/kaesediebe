import { type Component } from 'solid-js';

export interface IBadges {
	duration: string;
	category: string;
}

const Badges: Component<IBadges> = (props) => {
	const { duration, category } = props;

	return (
		<div class="flex items-center gap-1">
			<div class="badge flex items-center gap-1">
				<svg
					class="h-[0.9rem] w-[0.9rem]"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					fill-rule="evenodd"
					clip-rule="evenodd"
					aria-label="Kategorie"
				>
					<path
						d="M19.188 0c-1.557 0-3.858 7.004-4.66 14h2.467v8.5c0 .931.785 1.5 1.5 1.5h.001c.828 0 1.5-.672 1.5-1.5.002-5.037.009-20.254-.001-21.649-.003-.494-.36-.851-.807-.851m-.191 1.333l-.001 21.167c0 .276-.225.5-.501.5-.157 0-.5-.126-.5-.5v-9.498h-2.334c.8-5.889 2.397-10.348 3.336-11.669m-8.443-1.333h-.887l.675 6.002-1.341-.002-.003-6h-1l.001 6h-1.003l.002-6h-1l-.005 6h-1.291l.597-5.998-.909-.002s-.611 5.038-.863 7.575c-.088.889.391 1.762 1.09 2.322.943.756 1.383.982 1.383 1.673v10.93c0 .828.666 1.5 1.497 1.5.832 0 1.504-.672 1.504-1.5v-10.925c0-.702.433-.918 1.382-1.669.713-.564 1.22-1.454 1.121-2.356-.275-2.545-.95-7.55-.95-7.55m-.117 7c.076.658.27 1.375-.674 2.122-.95.753-1.762 1.216-1.762 2.453v10.925c0 .276-.226.5-.504.5-.279 0-.497-.224-.497-.5v-10.93c0-1.222-.819-1.699-1.757-2.453-.911-.73-.719-1.475-.652-2.117h5.846z"
						fill="#030405"
					></path>
				</svg>
				{category}
			</div>
			<div
				class={`badge flex items-center gap-1 ${
					duration === 'Hoch' ? 'badge-error' : 'badge-warning'
				}`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
					aria-label="Zubereitungsdauer"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
					></path>
				</svg>
				{duration}
			</div>
		</div>
	);
};

export default Badges;
