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
			}, 2000); // 2000 milliseconds = 2 seconds
		}
	};

	const handleMouseLeave = () => {
		setIsShaking(false);
	};

	return (
		<div
			className={`${styles['gradient-icon']} ${isShaking ? styles.shake : ''}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave} // Added onMouseLeave handler
		>
			<SquareX color='#832a2a' size={60} />
		</div>
	);
}

export default SquareXIcon;
