import React from 'react';
import Header from './components/header';
import './App.css';
import {
	presetPacks,
	boxes,
	soldiers,
	rangers,
	monsters,
	masters,
	zords,
	megazords,
} from './characterLists';

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

	const pickRandom = (choices) => {
		const random = choices[Math.floor(Math.random() * choices.length)];
		return random;
	};

	const drawRandomCard = (double = []) => {
		console.log('fired', double);
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
		<div className='App'>
			<Header cardType={cardType} updateCardType={updateCardType} />
			<button onClick={() => drawRandomCard()}>Randomize</button>
			<button onClick={clearList}>Clear List</button>
			<div>
				{pickedCards.map((card) => (
					<p key={card.id}>
						<strong>
							{card.name} {card.power}
						</strong>
					</p>
				))}
			</div>
			<div>
				<button onClick={() => updateBoxes([])}>Clear all boxes</button>
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
		</div>
	);
}

export default App;
