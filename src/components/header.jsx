import * as React from 'react';
import styles from './header.module.scss';

const Header = ({ cardType, updateCardType, drawRandomCard }) => {
	return (
		<header className={styles.headerContainer}>
			<button
				className={`${styles.outside} ${styles.master} ${
					cardType === 'masters' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('masters')}
			/>
			<button
				className={`${styles.middle} ${styles.monster} ${
					cardType === 'monsters' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('monsters')}
			/>
			<button
				className={`${styles.inside} ${styles.soldier} ${
					cardType === 'soldiers' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('soldiers')}
			/>
			<button className={styles.draw} onClick={() => drawRandomCard()} />
			<button
				className={`${styles.inside} ${styles.ranger} ${
					cardType === 'rangers' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('rangers')}
			/>
			<button
				className={`${styles.middle} ${styles.zord} ${
					cardType === 'zords' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('zords')}
			/>
			<button
				className={`${styles.outside} ${styles.megazord} ${
					cardType === 'megazords' ? '' : styles.notActive
				}`}
				onClick={() => updateCardType('megazords')}
			/>
		</header>
	);
};

export default Header;
