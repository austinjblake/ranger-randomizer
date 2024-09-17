import { useState } from 'react';
import { SquareX } from 'lucide-react';
import styles from './squarex.module.scss';

function SquareXIcon() {
	const [isShaking, setIsShaking] = useState(false);

	const handleMouseEnter = () => {
		if (!isShaking) {
			setIsShaking(true);

			// Set a timeout to stop shaking after 2 seconds
			setTimeout(() => {
				setIsShaking(false);
			}, 2000);
		}
	};

	const handleMouseLeave = () => {
		setIsShaking(false);
	};

	return (
		<div
			className={`${styles['gradient-icon']} ${isShaking ? styles.shake : ''}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<SquareX color='#832a2a' size={60} />
		</div>
	);
}

export default SquareXIcon;
