import { boxes } from '../characterLists';
import styles from './options.module.scss';

const Checkbox = ({ checked, inputboxes, updaterfunc }) => (
	<div className={styles.checkboxContainer}>
		<input
			type='checkbox'
			value={inputboxes}
			onClick={updaterfunc}
			className={styles.hiddenInput}
		/>
		<div
			className={`${styles.styledCheckbox} ${checked ? styles.checked : ''}`}
		>
			<svg
				className={`${styles.checkmark} ${checked ? styles.checked : ''}`}
				viewBox='0 0 24 48'
			>
				<polyline points='20 6 9 17 4 12' />
			</svg>
		</div>
	</div>
);

export const OptionsArea = ({
	boxList,
	updateBoxes,
	handleBoxChange,
	animate,
	setAnimate,
	selectAllBoxes,
	multiplePowers,
	multipleRangers,
	setMultiplePowers,
	setMultipleRangers,
	separateNemesis,
	setSeparateNemesis,
}) => {
	const allChecked = boxList.length === boxes.length;

	const toggleAll = () => {
		if (!allChecked) {
			selectAllBoxes(boxes);
		} else {
			updateBoxes([]);
		}
	};

	// Group boxes by type
	const groupedBoxes = boxes.reduce((acc, box) => {
		if (!acc[box.type]) {
			acc[box.type] = [];
		}
		acc[box.type].push(box);
		return acc;
	}, {});

	// Order of box types to display
	const boxTypeOrder = [
		'big box',
		'rangers',
		'villains',
		'foot soldiers',
		'extras',
	];

	return (
		<div className={styles.presetContainer}>
			<h2>Choose your components</h2>
			<button onClick={toggleAll}>
				{allChecked ? 'Clear' : 'Check'} all boxes
			</button>
			<div>
				<h3>Boxes</h3>
				{boxTypeOrder.map((type) => (
					<div key={type}>
						<h4>{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
						{groupedBoxes[type].map((box) => (
							<label key={box.id}>
								<Checkbox
									inputboxes={box.id}
									checked={boxList.includes(box.id)}
									updaterfunc={handleBoxChange}
								/>
								<span>
									{box.name.charAt(0).toUpperCase() + box.name.slice(1)}
								</span>
							</label>
						))}
					</div>
				))}
			</div>
			<hr />
			<h3>Options</h3>
			<label>
				<Checkbox
					checked={multiplePowers === 'true'}
					inputboxes={multiplePowers}
					updaterfunc={() =>
						setMultiplePowers(multiplePowers === 'true' ? 'false' : 'true')
					}
				/>
				<span>
					Allow Multiples with the same Power Set (Ex: Adam Park and Zack Taylor
					both MMPR Black)
				</span>
			</label>
			<label>
				<Checkbox
					checked={multipleRangers === 'true'}
					inputboxes={multipleRangers}
					updaterfunc={() =>
						setMultipleRangers(multipleRangers === 'true' ? 'false' : 'true')
					}
				/>
				<span>
					Allow Multiples of the same Ranger (Ex: Tommy Oliver MMPR White and
					Tommy Oliver Turbo Red)
				</span>
			</label>
			<label>
				<Checkbox
					checked={animate === 'true'}
					inputboxes={animate}
					updaterfunc={() => setAnimate(animate === 'true' ? 'false' : 'true')}
				/>
				<span>Enable Animations</span>
			</label>
			<label>
				<Checkbox
					checked={separateNemesis === 'true'}
					inputboxes={separateNemesis}
					updaterfunc={() =>
						setSeparateNemesis(separateNemesis === 'true' ? 'false' : 'true')
					}
				/>
				<span>Separate Nemesis cards from Monsters</span>
			</label>
			<div>
				<h1>Ranger Randomizer</h1>
				<h2>About</h2>
				<p>
					This unofficial app will help you randomly choose components to use
					for playing Power Rangers Heroes of the Grid.
				</p>
				<p>
					No affiliation or ownership is implied and all trademarks and
					intellectual property rights belong to Renegade Games, Hasbro, and all
					other trademark holders
				</p>
				<h2>How to Use</h2>
				<p>
					Select what card type you would like to randomly draw by selecting the
					icon at the top of the screen. You can choose from Masters, Monsters,
					Foot Soldiers, Rangers, Zords, and Megazords. Then click the lightning
					bolt to begin drawing random cards of that type!
				</p>
				<p>
					If you don&apos;t like the card you draw, click on it to hide it and
					draw again! The hidden cards will be reset by clearing the list or
					selecting a new expansion.
				</p>
				<p>
					You can also change which Heroes of the Grid expansion boxes are used
					to select cards from by clicking the settings button at the bottom of
					the screen. Customize which boxes you want to include by checking and
					unchecking expansions.
				</p>
				<div>
					<address>
						If you have any questions, feel free to email{' '}
						<a href='mailto:help@rangerrandomizer.com'>
							help@rangerrandomizer.com
						</a>
					</address>
				</div>
			</div>
		</div>
	);
};
