import * as React from 'react';
import styles from './header.module.scss';

const Header = ({ cardType, updateCardType, drawRandomCard }) => {
	return (
		<header className={styles.headerContainer}>
			<button
				className={`${styles.master} ${
					cardType === 'masters' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('masters')}
			/>
			<button
				className={`${styles.monster} ${
					cardType === 'monsters' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('monsters')}
			/>
			<button
				className={`${styles.soldier} ${
					cardType === 'soldiers' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('soldiers')}
			/>
			<button
				className={`${styles.ranger} ${
					cardType === 'rangers' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('rangers')}
			/>
			<button
				className={`${styles.zord} ${
					cardType === 'zords' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('zords')}
			/>
			<button
				className={`${styles.megazord} ${
					cardType === 'megazords' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('megazords')}
			/>
		</header>
	);
};

export default Header;
