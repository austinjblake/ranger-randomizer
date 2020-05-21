import * as React from 'react';
import styles from './header.module.scss';

const Header = ({ cardType, updateCardType, drawRandomCard }) => {
	return (
		<header className={styles.headerContainer}>
			<button onClick={() => updateCardType('masters')}>
				master randomizer
			</button>
			<button onClick={() => updateCardType('monsters')}>
				monster randomizer
			</button>
			<button onClick={() => updateCardType('soldiers')}>
				foot soldier/location randomizer
			</button>
			<button className={styles.draw} onClick={() => drawRandomCard()} />
			<button onClick={() => updateCardType('rangers')}>
				ranger randomizer
			</button>
			<button onClick={() => updateCardType('zords')}>zord randomizer</button>
			<button onClick={() => updateCardType('megazords')}>MEGAZORD</button>
		</header>
	);
};

export default Header;
