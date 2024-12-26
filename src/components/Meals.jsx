import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';

// create config outside fx so is saved in memory
const requestConfig = {};

function Meals(){
	
	const { data: loadedMeals, isLoading, error } =
	 // plain JS object {} is recreated in fx every time
	 // fx runs
	 useHttp('http://localhost:3000/meals', requestConfig, []);

	if (isLoading){
		return <p className="center">Fetching meals...</p>
	}

	if (error){
		return <Error 
			title="Failed to fetch meals"
			message={error}
		/>
	}

	return (
		<ul id="meals">
			{loadedMeals.map((meal) => 
				<MealItem 
					key={meal.id} 
					meal={meal}
				/>
			)}
		</ul>
	)
}

export default Meals;