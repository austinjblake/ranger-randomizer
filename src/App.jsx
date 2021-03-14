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
import settingsIcon from './images/settings.png';
import clearIcon from './images/deletered.png';
import infoIcon from './images/info_black.png';
import ReactGA from 'react-ga';
import { useStateWithLocalStorage } from './hooks/useLocalStorage';

function initializeReactGA() {
	ReactGA.initialize('UA-29737798-2');
	ReactGA.pageview('/homepage');
}

initializeReactGA();

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
	const [pickedCards, updatePickedCards] = React.useState([]);
	const [listView, changeView] = React.useState('list');

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

	return (
		<div className={styles.mainContainer}>
			<Header
				cardType={cardType}
				updateCardType={updateCardType}
				drawRandomCard={drawRandomCard}
			/>
			<div className={styles.bottomScreen}>
				<div className={styles.menuArea}>
					<button
						title='Options'
						onClick={() =>
							changeView(listView === 'options' ? 'list' : 'options')
						}
					>
						<img src={settingsIcon} alt='Settings' />
					</button>
					<button title='Clear List' onClick={clearList}>
						<img src={clearIcon} alt='Clear List' />
					</button>
					<button
						title='Info'
						onClick={() => changeView(listView === 'info' ? 'list' : 'info')}
					>
						<img src={infoIcon} alt='About' />
					</button>
				</div>
				<div className={styles.listArea}>
					{listView === 'list' &&
						pickedCards.map((card) => (
							<span key={card.id} className={styles.drawnCard}>
								<strong>
									{card.name} {card.power} {card.subset}
								</strong>
							</span>
						))}
					{listView === 'options' && (
						<OptionsArea
							boxList={boxList}
							updateBoxes={updateBoxes}
							handleBoxChange={handleBoxChange}
						/>
					)}
					{listView === 'info' && (
						<div>
							<h1>Ranger Randomizer</h1>
							<h2>About</h2>
							<p>
								This unofficial app will help you randomly choose components to
								use for playing Power Rangers Heroes of the Grid.
							</p>
							<p>
								No affiliation or ownership is implied and all trademarks and
								intellectual property rights belong to Renegade Games, Hasbro,
								and all other trademark holders
							</p>
							<h2>How to Use</h2>
							<p>
								Select what card type you would like to randomly draw by
								selecting the icon at the top of the screen. You can choose from
								Masters, Monsters, Foot Soldiers, Rangers, Zords, and Megazords.
								Then click the lightning bolt to begin drawing random cards of
								that type!
							</p>
							<p>
								You can also change which Heroes of the Grid expansion boxes are
								used to select cards from by clicking the settings button in the
								menu on the left. Choose one of the preset packs or customize
								which boxes you want to include by checking and unchecking
								expansions.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
