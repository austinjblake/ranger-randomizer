import { useEffect } from 'react';
import styles from './header.module.scss';

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
				className={`${styles.master} ${
					cardType === 'masters' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('masters')}
			/>
			<button
				id='select_monsters'
				title='Monsters'
				className={`${styles.monster} ${
					cardType === 'monsters' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('monsters')}
			/>
			{separateNemesis === 'true' && (
				<button
					id='select_nemesis'
					title='Nemesis'
					className={`${styles.nemesis} ${
						cardType === 'nemesis' ? '' : styles.notActive
					}`}
					onClick={() => updateCardType('nemesis')}
				/>
			)}
			<button
				id='select_soldiers'
				title='Foot Soldiers'
				className={`${styles.soldier} ${
					cardType === 'soldiers' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('soldiers')}
			/>
			<button
				id='select_rangers'
				title='Rangers'
				className={`${styles.ranger} ${
					cardType === 'rangers' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('rangers')}
			/>
			<button
				id='select_zords'
				title='Zords'
				className={`${styles.zord} ${
					cardType === 'zords' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('zords')}
			/>
			<button
				id='select_megazords'
				title='Megazords'
				className={`${styles.megazord} ${
					cardType === 'megazords' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('megazords')}
			/>
			<button
				id='select_arsenal'
				title='Arsenal'
				className={`${styles.arsenal} ${
					cardType === 'arsenal' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('arsenal')}
			/>
		</header>
	);
};

export default Header;
