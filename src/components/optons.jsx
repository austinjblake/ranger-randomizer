import * as React from 'react';
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
}) => {
	const allChecked = boxList.length === boxes.length;

	const toggleAll = () => {
		if (!allChecked) {
			selectAllBoxes(boxes);
		} else {
			updateBoxes([]);
		}
	};

	return (
		<div className={styles.presetContainer}>
			<h2>Choose your components</h2>
			<button onClick={toggleAll}>
				{allChecked ? 'Clear' : 'Check'} all boxes
			</button>
			<div>
				<h3>Boxes</h3>
				{boxes.map((box) => (
					<label key={box.id}>
						<Checkbox
							inputboxes={box.id}
							checked={boxList.includes(box.id)}
							updaterfunc={handleBoxChange}
						/>
						<span>{box.name}</span>
					</label>
				))}
			</div>
			<hr />
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
					You can also change which Heroes of the Grid expansion boxes are used
					to select cards from by clicking the settings button in the menu on
					the left. Choose one of the preset packs or customize which boxes you
					want to include by checking and unchecking expansions.
				</p>
			</div>
		</div>
	);
};
