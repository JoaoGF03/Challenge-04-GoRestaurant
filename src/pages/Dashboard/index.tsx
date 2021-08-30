import { FoodCard } from '../../components/FoodCard';
import { Header } from '../../components/Header';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { useFoods } from '../../hooks/useFoods';
import { FoodsContainer } from './styles';

export function Dashboard() {
  const { foods } = useFoods()

  return (
    <>
      <Header />
      <ModalAddFood />
      <ModalEditFood />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <FoodCard
              key={food.id}
              food={food}
            />
          ))}
      </FoodsContainer>
    </>
  );
}

export default Dashboard;
