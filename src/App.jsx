import { useEffect, useRef, useState, useCallback } from 'react';
import Header from './components/header';
import {
	soldiers,
	rangers,
	monsters,
	masters,
	zords,
	megazords,
	arsenal,
} from './characterLists';
import { OptionsArea } from './components/optons';
import styles from './app.module.scss';
import { useStateWithLocalStorage } from './hooks/useLocalStorage';
import { allBoxIds } from './characterLists';
import CogIcon from './components/cog';
import SquareXIcon from './components/squarex';
import SuperButton from './components/superButton';

const lists = {
	soldiers,
	rangers,
	monsters,
	zords,
	megazords,
	masters,
	nemesis: monsters.filter((monster) => monster.nemesis),
	arsenal,
};

function App() {
	const [cardType, updateCardType] = useStateWithLocalStorage(
		'cardType',
		'monsters'
	);
	const [boxList, updateBoxes] = useStateWithLocalStorage('boxList', allBoxIds);
	const [animate, setAnimate] = useStateWithLocalStorage('animate', 'true');
	const [multiplePowers, setMultiplePowers] = useStateWithLocalStorage(
		'multiplePowers',
		'false'
	);
	const [multipleRangers, setMultipleRangers] = useStateWithLocalStorage(
		'multipleRangers',
		'true'
	);
	const [separateNemesis, setSeparateNemesis] = useStateWithLocalStorage(
		'separateNemesis',
		'false'
	);

	const [pickedCards, updatePickedCards] = useState([]);
	const [listView, changeView] = useState('list');

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

			// Handle nemesis separation
			if (cardType === 'monsters' && separateNemesis === 'true') {
				availableList = availableList.filter((card) => !card.nemesis);
			} else if (cardType === 'nemesis') {
				availableList = lists.monsters
					.filter((card) => card.nemesis)
					.filter((card) => boxList.includes(card.box))
					.filter(
						(card) => !pickedCards.some((chosen) => chosen.id === card.id)
					);
			}

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
			if (
				cardType === 'rangers' &&
				((multiplePowers === 'false' &&
					pickedCards.some((ranger) => ranger.power === newCard.power)) ||
					(multipleRangers === 'false' &&
						pickedCards.some((ranger) => ranger.name === newCard.name)))
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
		setHiddenCards([]); // Reset hiddenCards when clearing the list
	};

	const handleBoxChange = (e) => {
		if (boxList.includes(e.target.value)) {
			let updatedList = [...boxList].filter((box) => box !== e.target.value);
			updateBoxes(updatedList);
		} else {
			updateBoxes([...boxList, e.target.value]);
		}
		setHiddenCards([]); // Reset hiddenCards when box selection changes
	};

	const selectAllBoxes = (fullList) => {
		updateBoxes(fullList.map((box) => box.id));
		setHiddenCards([]); // Reset hiddenCards when selecting all boxes
	};

	const [hiddenCards, setHiddenCards] = useState([]);
	const toggleCardVisibility = useCallback((cardId) => {
		setHiddenCards((prev) =>
			prev.includes(cardId)
				? prev.filter((id) => id !== cardId)
				: [...prev, cardId]
		);
	}, []);

	const handleSeparateNemesisChange = (newValue) => {
		setSeparateNemesis(newValue);
		if (newValue === 'false' && cardType === 'nemesis') {
			updateCardType('monsters');
		}
	};

	return (
		<div
			className={`${styles.mainContainer} ${
				animate === 'true' ? '' : styles.disableAnimation
			}`}
		>
			{/* <div className={styles.starContainer}>
				<div className={styles.stars}></div>
				<div className={styles.stars2}></div>
				<div className={styles.stars3}></div>
			</div> */}
			<Header
				cardType={cardType}
				updateCardType={updateCardType}
				drawRandomCard={drawRandomCard}
				separateNemesis={separateNemesis}
			/>
			<div className={styles.contentArea}>
				<div className={styles.cardArea}>
					{listView === 'list' &&
						pickedCards.map(
							(card, i) =>
								!hiddenCards.includes(card.id) && (
									<span
										key={card.id}
										className={styles.drawnCard}
										ref={i === pickedCards.length - 1 ? currentCard : null}
										onClick={() => toggleCardVisibility(card.id)}
									>
										<strong>
											{card.name} {card.power} {card.subset}
										</strong>
									</span>
								)
						)}
				</div>
				{listView === 'options' && (
					<OptionsArea
						boxList={boxList}
						updateBoxes={updateBoxes}
						handleBoxChange={handleBoxChange}
						animate={animate}
						setAnimate={setAnimate}
						selectAllBoxes={selectAllBoxes}
						multiplePowers={multiplePowers}
						multipleRangers={multipleRangers}
						setMultiplePowers={setMultiplePowers}
						setMultipleRangers={setMultipleRangers}
						separateNemesis={separateNemesis}
						setSeparateNemesis={handleSeparateNemesisChange}
					/>
				)}
			</div>
			<div className={styles.menuArea}>
				<button
					title='Options'
					onClick={() =>
						changeView(listView === 'options' ? 'list' : 'options')
					}
					className={styles.alpha}
				>
					<CogIcon />
				</button>
				<div className={styles.content}>
					<SuperButton onClick={() => drawRandomCard()} />
				</div>
				<button
					className={styles.clearButton}
					title='Clear List'
					onClick={clearList}
				>
					<SquareXIcon />
				</button>
			</div>
		</div>
	);
}

export default App;
