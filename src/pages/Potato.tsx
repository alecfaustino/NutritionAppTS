import axios, {AxiosError} from 'axios';
import { useState } from 'react';

type Food = {
  fdcId: number;
  description: string;
  foodNutrients: Nutrient[];
};

type Nutrient = {
  nutrientName: string;
  value: number;
  unitName: string;
};

const Potato = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  
  const fetchInfo = async () => {
    try {
      const fetchResult = await axios.get(`http://localhost:8080/api/usda/search`)
      // fetchResult.data.data.foods is the array of foods
      const foodList: Food[] = fetchResult.data.data.foods;
      // TODO make a single useState hook with both the calories and description to loop through it
      setFoods(foodList);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.log("temporary code");
      }
    }
  }
  return (
    <>
      <h1>Hello From Potato</h1>

      <button onClick={fetchInfo}>Fetch Info</button>
      <div>
        {foods.map((food, index) => (
          <div key={index}>
            <p>Name:</p>
            <p>{food.description}</p>
            <p>Calories:</p>
            <p>{food.foodNutrients[3].value} {food.foodNutrients[3].unitName}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Potato