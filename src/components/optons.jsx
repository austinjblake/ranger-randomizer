import * as React from 'react';
import { boxes, presetPacks } from '../characterLists';
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

export const OptionsArea = ({ boxList, updateBoxes, handleBoxChange }) => {
	return (
		<div style={{ display: 'block' }}>
			<h2>Choose your components</h2>
			<div className={styles.presetContainer}>
				<h3>Preset Packs</h3>
				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					{presetPacks.map((pack) => (
						<label key={pack.id}>
							<Checkbox
								checked={
									boxList.sort().join(',') === pack.boxes.sort().join(',')
								}
								inputboxes={pack.boxes}
								updaterfunc={() => updateBoxes(pack.boxes)}
							/>
							<span>{pack.name}</span>
						</label>
					))}
					<br />
				</div>
				<button onClick={() => updateBoxes([])}>Clear all boxes</button>
			</div>
			<div className={styles.presetContainer}>
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
		</div>
	);
};
