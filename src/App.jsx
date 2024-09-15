import { useEffect, useRef, useState } from 'react';
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
import { useStateWithLocalStorage } from './hooks/useLocalStorage';
import boltIcon from './images/bolt.png';

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
	const [multiplePowers, setMultiplePowers] = useStateWithLocalStorage(
		'multiplePowers',
		'false'
	);
	const [multipleRangers, setMultipleRangers] = useStateWithLocalStorage(
		'multipleRangers',
		'true'
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
						multiplePowers={multiplePowers}
						multipleRangers={multipleRangers}
						setMultiplePowers={setMultiplePowers}
						setMultipleRangers={setMultipleRangers}
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
					<button
						className={styles.draw}
						onClick={() => drawRandomCard()}
						title='Draw Card'
					>
						<img src={boltIcon} alt='Draw Card' />
					</button>
					<div className={styles.frame}>
						<div className={styles.clr}></div>
					</div>
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
