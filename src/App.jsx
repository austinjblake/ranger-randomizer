import React from 'react';
import Header from './components/header';
import {
	presetPacks,
	soldiers,
	rangers,
	monsters,
	masters,
	zords,
	megazords,
} from './characterLists';
import { OptionsArea } from './components/optons';
import styles from './app.module.scss';

const lists = {
	soldiers,
	rangers,
	monsters,
	zords,
	megazords,
	masters,
};

function App() {
	const [cardType, updateCardType] = React.useState('monsters');
	const [boxList, updateBoxes] = React.useState(
		presetPacks.filter((pack) => pack.id === 1)[0].boxes
	);
	const [pickedCards, updatePickedCards] = React.useState([]);
	const [listView, changeView] = React.useState(true);

	const pickRandom = (choices) => {
		const random = choices[Math.floor(Math.random() * choices.length)];
		return random;
	};

	const drawRandomCard = (double = []) => {
		if (lists[cardType] && lists[cardType].length) {
			let availableList = lists[cardType]
				.filter((card) => boxList.includes(card.box))
				.filter((card) => !pickedCards.some((chosen) => chosen.id === card.id));
			if (double.length) {
				availableList = availableList.filter(
					(card) => !double.includes(card.id)
				);
			}
			if (!availableList.length) {
				console.log('available list empty');
				return;
			}
			const newCard = pickRandom(availableList);
			// insert double checks here
			if (
				cardType === 'rangers' &&
				pickedCards.some((ranger) => ranger.power === newCard.power)
			) {
				console.log('double detected');
				double.push(newCard.id);
				drawRandomCard(double);
				return;
			}
			if (
				cardType === 'zords' &&
				pickedCards.some((zord) => zord.name === newCard.name)
			) {
				console.log('double detected');
				double.push(newCard.id);
				drawRandomCard(double);
				return;
			}
			const newList = [...pickedCards, newCard];
			updatePickedCards(newList);
		} else {
			console.log('first check fail');
		}
	};

	const clearList = () => {
		updatePickedCards([]);
	};

	const handleBoxChange = (e) => {
		if (boxList.includes(e.target.value)) {
			let updatedList = [...boxList].filter((box) => box !== e.target.value);
			updateBoxes(updatedList);
		} else {
			updateBoxes([...boxList, e.target.value]);
		}
	};

	return (
		<div className={styles.mainContainer}>
			<Header
				cardType={cardType}
				updateCardType={updateCardType}
				drawRandomCard={drawRandomCard}
			/>
			<div style={{ display: 'flex' }}>
				<div className={styles.menuArea}>
					<button
						title='Options'
						className={styles.optionsButton}
						onClick={() => changeView(!listView)}
					/>
					<button
						title='Clear List'
						className={styles.clearButton}
						onClick={clearList}
					/>
					<button title='Info' className={styles.infoButton} />
				</div>
				<div className={styles.listArea}>
					{listView ? (
						pickedCards.map((card) => (
							<p key={card.id}>
								<strong>
									{card.name} {card.power}
								</strong>
							</p>
						))
					) : (
						<OptionsArea
							boxList={boxList}
							updateBoxes={updateBoxes}
							handleBoxChange={handleBoxChange}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
