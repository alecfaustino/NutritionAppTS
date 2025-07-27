import axios, {AxiosError} from 'axios';
import { useState } from 'react';
type Food = {
  description: string;
}
const Potato = () => {
  const [foods, setFoods] = useState<Food[]>([]);

  const fetchInfo = async () => {
    try {
      const fetchResult = await axios.get(`http://localhost:8080/api/usda/search`)
      // fetchResult.data.data.foods is the array of foods
      setFoods(fetchResult.data.data.foods);
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
            <h2>Name</h2>
            <p>{food.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Potato