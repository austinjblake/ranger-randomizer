import React, { useEffect } from 'react';
import styles from './header.module.scss';

const Header = ({ cardType, updateCardType }) => {
	useEffect(() => {
		const selectedElementID = `select_${cardType}`;
		const selectedButton = document.getElementById(selectedElementID);
		selectedButton.scrollIntoView();
	}, [cardType]);

	return (
		<header className={styles.headerContainer}>
			<button
				id='select_masters'
				className={`${styles.master} ${
					cardType === 'masters' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('masters')}
			/>
			<button
				id='select_monsters'
				className={`${styles.monster} ${
					cardType === 'monsters' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('monsters')}
			/>
			<button
				id='select_soldiers'
				className={`${styles.soldier} ${
					cardType === 'soldiers' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('soldiers')}
			/>
			<button
				id='select_rangers'
				className={`${styles.ranger} ${
					cardType === 'rangers' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('rangers')}
			/>
			<button
				id='select_zords'
				className={`${styles.zord} ${
					cardType === 'zords' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('zords')}
			/>
			<button
				id='select_megazords'
				className={`${styles.megazord} ${
					cardType === 'megazords' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('megazords')}
			/>
		</header>
	);
};

export default Header;
