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

	// Reference to the last card picked. Used to scroll to it
	const currentCard = useRef();

	// Pick a random card from the list
	const pickRandom = (choices) => {
		const random = choices[Math.floor(Math.random() * choices.length)];
		return random;
	};

	// Draw a random card, calling itself recursively if a duplicate is detected
	const drawRandomCard = (double = []) => {
		// If the current view is not the list view, change to the list view
		if (listView !== 'list') {
			changeView('list');
			return;
		}
		if (lists[cardType] && lists[cardType].length) {
			// Initialize unpicked list of cards from chosen boxes and card type
			let availableList = lists[cardType].filter((card) =>
				boxList.includes(card.box)
			);

			// Handle nemesis separation to create new monster list if needed
			if (cardType === 'monsters' && separateNemesis === 'true') {
				availableList = availableList.filter((card) => !card.nemesis);
			}
			// Remove cards that are marked as a double from a recursive call
			if (double.length) {
				availableList = availableList.filter(
					(card) => !double.includes(card.id)
				);
			}
			// Remove cards that have already been picked
			availableList = availableList.filter(
				(card) => !pickedCards.some((chosen) => chosen.id === card.id)
			);
			// If no cards are available, do nothing
			if (!availableList.length) {
				console.log('available list empty');
				return;
			}
			// Pick a random card from the available list
			const newCard = pickRandom(availableList);
			// If the card is a ranger and either multiple powers or multiple rangers are disabled, check for duplicate powers or names
			if (
				cardType === 'rangers' &&
				((multiplePowers === 'false' &&
					pickedCards.some((ranger) => ranger.power === newCard.power)) ||
					(multipleRangers === 'false' &&
						pickedCards.some((ranger) => ranger.name === newCard.name)))
			) {
				console.log('double detected');
				// Add the card to the double list
				double.push(newCard.id);
				// Try again
				drawRandomCard(double);
				return;
			}
			// Check for duplicate zords. There are multiple boxes with the same zord in them
			if (
				cardType === 'zords' &&
				pickedCards.some((zord) => zord.name === newCard.name)
			) {
				console.log('double detected');
				// Add the card to the double list
				double.push(newCard.id);
				// Try again
				drawRandomCard(double);
				return;
			}
			// Add the card to the picked cards list
			const newList = [...pickedCards, newCard];
			updatePickedCards(newList);
		} else {
			console.log('first check fail');
		}
	};

	// Scroll to the last card in the picked cards list
	useEffect(() => {
		if (pickedCards.length && currentCard && currentCard.current) {
			currentCard.current.scrollIntoView(false);
		}
	}, [pickedCards.length]);

	// Clear the picked cards list
	const clearList = () => {
		if (listView !== 'list') {
			changeView('list');
			return;
		}
		updatePickedCards([]);
		setHiddenCards([]); // Reset hiddenCards when clearing the list
	};

	// Handle box selection changes
	const handleBoxChange = (e) => {
		if (boxList.includes(e.target.value)) {
			let updatedList = [...boxList].filter((box) => box !== e.target.value);
			updateBoxes(updatedList);
		} else {
			updateBoxes([...boxList, e.target.value]);
		}
		setHiddenCards([]); // Reset hiddenCards when box selection changes
	};

	// Select all boxes
	const selectAllBoxes = (fullList) => {
		updateBoxes(fullList.map((box) => box.id));
		setHiddenCards([]); // Reset hiddenCards when selecting all boxes
	};

	// Handle card visibility toggles
	const [hiddenCards, setHiddenCards] = useState([]);
	const toggleCardVisibility = useCallback((cardId) => {
		setHiddenCards((prev) =>
			prev.includes(cardId)
				? prev.filter((id) => id !== cardId)
				: [...prev, cardId]
		);
	}, []);

	// Handle separate nemesis changes
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
								// If the card is not hidden, render it
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
					<div className={styles.head}>
						<div className={styles.ball} />
						<div className={styles.middle}>
							<div className={styles.eyes}>
								<div className={`${styles.laser} ${styles.left}`} />
								<div className={`${styles.laser} ${styles.right}`} />
							</div>
						</div>
					</div>
				</button>
				<div className={styles.content}>
					<SuperButton onClick={() => drawRandomCard()} />
				</div>
				<button
					className={styles.clearButton}
					title='Clear List'
					onClick={clearList}
				>
					<div className={styles.dumpsterContainer}>
						<div className={styles.innerDumpster} />
						<div className={styles.lid}>
							<div className={styles.gem} />
						</div>
						<div className={styles.dumpster}></div>
					</div>
				</button>
			</div>
		</div>
	);
}

export default App;
