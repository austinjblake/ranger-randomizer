import * as React from 'react';

const Header = ({ cardType, updateCardType }) => {
	return (
		<header>
			<button onClick={() => updateCardType('rangers')}>
				ranger randomizer
			</button>
			<button onClick={() => updateCardType('masters')}>
				master randomizer
			</button>
			<button onClick={() => updateCardType('monsters')}>
				monster randomizer
			</button>
			<button onClick={() => updateCardType('soldiers')}>
				foot soldier/location randomizer
			</button>
			<button onClick={() => updateCardType('zords')}>zord randomizer</button>
			<button onClick={() => updateCardType('megazords')}>MEGAZORD</button>
			<p>
				<strong>{cardType}</strong>
			</p>
		</header>
	);
};

export default Header;
