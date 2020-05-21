import * as React from 'react';
import { boxes, presetPacks } from '../characterLists';
import styles from './options.module.scss';

export const OptionsArea = ({ boxList, updateBoxes, handleBoxChange }) => {
	return (
		<React.Fragment>
			<h2>Choose your components</h2>
			<div className={styles.presetContainer}>
				<h3>Preset Packs</h3>
				{presetPacks.map((pack) => (
					<label key={pack.id}>
						<input
							type='checkbox'
							value={pack.boxes}
							checked={boxList.sort().join(',') === pack.boxes.sort().join(',')}
							onChange={() => updateBoxes(pack.boxes)}
						/>
						{pack.name}
					</label>
				))}
				<br />
				<button onClick={() => updateBoxes([])}>Clear all boxes</button>
			</div>
			<div className={styles.presetContainer}>
				<h3>Boxes</h3>
				{boxes.map((box) => (
					<label key={box.id}>
						<input
							type='checkbox'
							value={box.id}
							checked={boxList.includes(box.id)}
							onChange={handleBoxChange}
						/>
						{box.name}
					</label>
				))}
			</div>
		</React.Fragment>
	);
};
