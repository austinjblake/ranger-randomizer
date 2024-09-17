import styles from './superButton.module.scss';
import boltImage from '../images/bolt.webp';

const SuperButton = ({ onClick }) => {
	return (
		<button title='Draw Card' onClick={onClick} className={styles.superButton}>
			<span className={styles.shadow}></span>
			<span className={styles.edge}></span>
			<span className={styles.front}>
				<img src={boltImage} alt='Button Icon' className={styles.icon} />
			</span>
		</button>
	);
};

export default SuperButton;
