import { useEffect } from 'react';
import styles from './header.module.scss';
import ritaImage from '../images/rita.jpg';
import pudgyImage from '../images/pudgy.jpg';
import puttyImage from '../images/putty.jpg';
import rangerImage from '../images/ranger.jpg';
import zordImage from '../images/zord.jpg';
import megazordImage from '../images/megazord.jpg';
import nemesisImage from '../images/nemesis.jpg';
import arsenalImage from '../images/arsenal.png';

const Header = ({ cardType, updateCardType, separateNemesis }) => {
	useEffect(() => {
		const selectedElementID = `select_${cardType}`;
		const selectedButton = document.getElementById(selectedElementID);
		selectedButton.scrollIntoView();
	}, [cardType]);

	return (
		<header className={styles.headerContainer}>
			<button
				id='select_masters'
				title='Masters'
				className={cardType === 'masters' ? '' : styles.notActive}
				onClick={() => updateCardType('masters')}
			>
				<img src={ritaImage} alt='Masters' />
			</button>
			<button
				id='select_monsters'
				title='Monsters'
				className={cardType === 'monsters' ? '' : styles.notActive}
				onClick={() => updateCardType('monsters')}
			>
				<img src={pudgyImage} alt='Monsters' />
			</button>
			{separateNemesis === 'true' && (
				<button
					id='select_nemesis'
					title='Nemesis'
					className={cardType === 'nemesis' ? '' : styles.notActive}
					onClick={() => updateCardType('nemesis')}
				>
					<img src={nemesisImage} alt='Nemesis' />
				</button>
			)}
			<button
				id='select_soldiers'
				title='Foot Soldiers'
				className={cardType === 'soldiers' ? '' : styles.notActive}
				onClick={() => updateCardType('soldiers')}
			>
				<img src={puttyImage} alt='Foot Soldiers' />
			</button>
			<button
				id='select_rangers'
				title='Rangers'
				className={cardType === 'rangers' ? '' : styles.notActive}
				onClick={() => updateCardType('rangers')}
			>
				<img src={rangerImage} alt='Rangers' />
			</button>
			<button
				id='select_zords'
				title='Zords'
				className={cardType === 'zords' ? '' : styles.notActive}
				onClick={() => updateCardType('zords')}
			>
				<img src={zordImage} alt='Zords' />
			</button>
			<button
				id='select_megazords'
				title='Megazords'
				className={cardType === 'megazords' ? '' : styles.notActive}
				onClick={() => updateCardType('megazords')}
			>
				<img src={megazordImage} alt='Megazords' />
			</button>
			<button
				id='select_arsenal'
				title='Arsenal'
				className={cardType === 'arsenal' ? '' : styles.notActive}
				onClick={() => updateCardType('arsenal')}
			>
				<img src={arsenalImage} alt='Arsenal' />
			</button>
		</header>
	);
};

export default Header;
