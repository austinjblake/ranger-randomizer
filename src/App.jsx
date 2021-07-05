import React, { useEffect, useRef } from 'react';
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
import settingsIcon from './images/settings.png';
import clearIcon from './images/deletered.png';
import { useStateWithLocalStorage } from './hooks/useLocalStorage';

const lists = {
	soldiers,
	rangers,
	monsters,
	zords,
	megazords,
	masters,
};

function App() {
	const [cardType, updateCardType] = useStateWithLocalStorage(
		'cardType',
		'monsters'
	);
	const [boxList, updateBoxes] = useStateWithLocalStorage(
		'boxList',
		presetPacks.filter((pack) => pack.id === 1)[0].boxes
	);
	const [animate, setAnimate] = useStateWithLocalStorage('animate', 'true');

	const [pickedCards, updatePickedCards] = React.useState([]);
	const [listView, changeView] = React.useState('list');

	const currentCard = useRef();

	const pickRandom = (choices) => {
		const random = choices[Math.floor(Math.random() * choices.length)];
		return random;
	};

	const drawRandomCard = (double = []) => {
		if (listView !== 'list') {
			changeView('list');
			return;
		}
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

	useEffect(() => {
		if (pickedCards.length && currentCard && currentCard.current) {
			currentCard.current.scrollIntoView(false);
		}
	}, [pickedCards.length]);

	const clearList = () => {
		if (listView !== 'list') {
			changeView('list');
			return;
		}
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

	const selectAllBoxes = (fullList) => {
		updateBoxes(fullList.map((box) => box.id));
	};

	return (
		<div
			className={`${styles.mainContainer} ${
				animate === 'true' ? '' : styles.disableAnimation
			}`}
		>
			<div className={styles.starContainer}>
				<div className={styles.stars}></div>
				<div className={styles.stars2}></div>
				<div className={styles.stars3}></div>
			</div>
			<Header
				cardType={cardType}
				updateCardType={updateCardType}
				drawRandomCard={drawRandomCard}
			/>
			<div className={styles.contentArea}>
				<div className={styles.cardArea}>
					{listView === 'list' &&
						pickedCards.map((card, i) => (
							<span
								key={card.id}
								className={styles.drawnCard}
								ref={i === pickedCards.length - 1 ? currentCard : null}
							>
								<strong>
									{card.name} {card.power} {card.subset}
								</strong>
							</span>
						))}
				</div>
				{listView === 'options' && (
					<OptionsArea
						boxList={boxList}
						updateBoxes={updateBoxes}
						handleBoxChange={handleBoxChange}
						animate={animate}
						setAnimate={setAnimate}
						selectAllBoxes={selectAllBoxes}
					/>
				)}
			</div>
			<div className={styles.menuArea}>
				<button
					title='Options'
					onClick={() =>
						changeView(listView === 'options' ? 'list' : 'options')
					}
				>
					<img src={settingsIcon} alt='Settings' />
				</button>
				<button className={styles.draw} onClick={() => drawRandomCard()} />
				<button title='Clear List' onClick={clearList}>
					<img src={clearIcon} alt='Clear List' />
				</button>
			</div>
		</div>
	);
}

export default App;
