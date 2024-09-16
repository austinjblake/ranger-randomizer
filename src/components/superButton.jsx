import styles from './superButton.module.scss';

const SuperButton = ({ onClick, icon }) => {
	return (
		<button onClick={onClick} className={styles.superButton}>
			<span className={styles.shadow}></span>
			<span className={styles.edge}></span>
			<span className={styles.front}>
				{icon && <img src={icon} alt='Button Icon' className={styles.icon} />}
			</span>
		</button>
	);
};

export default SuperButton;
