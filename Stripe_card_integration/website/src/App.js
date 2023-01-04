//creating the product page 
import { useState } from 'react';
import './App.css';
import Axe from '../src/pic/Axe.jpeg';
import StripeContainer from './component/StripeContainer';

function App() {
	const [showItem, setShowItem] = useState(false);
	return (
		<div className='App'>
			<h1>Axe Store</h1>
			{showItem ? (
				<StripeContainer />
			) : (
				<>
					<h3>₹100.00</h3>
					<img src={Axe} alt='Axe Soap' />
					<button onClick={() => setShowItem(true)}>Purchase Axe</button>
				</>
			)}
		</div>
	);
}

export default App;