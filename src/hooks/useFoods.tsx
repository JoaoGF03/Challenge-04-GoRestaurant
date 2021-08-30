import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Food } from '../../types';
import api from '../services/api';

interface FoodsProviderProps {
  children: ReactNode;
}

interface FoodsContextData {
  foods: Food[]
  setFoods: React.Dispatch<React.SetStateAction<Food[]>>
  editingFood: Food
  setEditingFood: (React.Dispatch<React.SetStateAction<Food>>)
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  editModalOpen: boolean
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleAddFood: (food: Food) => Promise<void>
  handleUpdateFood: (food: Food) => Promise<void>
  handleDeleteFood: (id: number) => void
  handleEditFood: (food: Food) => void
  toggleModal: () => void
  toggleEditModal: () => void
}

const FoodsContext = createContext<FoodsContextData>({} as FoodsContextData);

export function FoodsProvider({ children }: FoodsProviderProps) {
  const [foods, setFoods] = useState<Food[]>([])
  const [editingFood, setEditingFood] = useState<Food>({} as Food)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => {
    async function loadFoods() {
      await api.get('/foods').then(response => setFoods(response.data))
    }
    loadFoods()

  }, [])

  async function handleAddFood(food: Food) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: Food) {

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  function handleEditFood(food: Food) {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  function toggleModal() {

    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {

    setEditModalOpen(!editModalOpen);
  }

  return (
    <FoodsContext.Provider value={{
      foods, setFoods,
      editingFood, setEditingFood,
      modalOpen, setModalOpen,
      editModalOpen, setEditModalOpen,
      handleAddFood, handleUpdateFood, handleDeleteFood, handleEditFood,
      toggleModal, toggleEditModal
    }}>
      {children}
    </FoodsContext.Provider>
  )
}

export function useFoods() {
  const context = useContext(FoodsContext)

  return context
}