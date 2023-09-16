import { createSignal, type ParentComponent } from 'solid-js';
import { SITE } from 'src/config';

const BackButton: ParentComponent = (props) => {
	const hasHistory = () => window.history.length > 1;
	const [link] = createSignal(
		hasHistory() ? 'javascript:history.back()' : SITE.url,
	);

	return (
		<a class="flex btn btn-square btn-ghost" aria-label="Zurück" href={link()}>
			{props.children}
		</a>
	);
};

export default BackButton;
