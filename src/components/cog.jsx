import { useState } from 'react';
import { Cog } from 'lucide-react';
import styles from './cog.module.scss';

function CogIcon() {
	const [isSpinning, setIsSpinning] = useState(false);

	const handleMouseEnter = () => {
		if (!isSpinning) {
			setIsSpinning(true);

			// Set a timeout to stop spinning after 2 seconds
			setTimeout(() => {
				setIsSpinning(false);
			}, 2000);
		}
	};

	const handleMouseLeave = () => {
		setIsSpinning(false);
	};

	return (
		<div
			className={`${styles.cogIcon} ${isSpinning ? styles.spin : ''}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<Cog size={60} color='#a8a8a8' />
		</div>
	);
}

export default CogIcon;
