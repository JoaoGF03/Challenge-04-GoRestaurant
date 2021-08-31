import { FormHandles } from '@unform/core';
import { createRef, Ref } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { useFoods } from '../../hooks/useFoods';
import { Input } from '../Input';
import { Modal } from '../Modal';
import { Form } from './styles';

interface FoodDTO {
  id: number
  image: string
  name: string
  price: number
  description: string
  available: boolean
}

export function ModalAddFood() {
  const { modalOpen, toggleModal, handleAddFood } = useFoods();

  const formRef: Ref<FormHandles> = createRef()

  async function handleSubmit(data: FoodDTO) {
    handleAddFood(data);
    toggleModal();
  };

  return (
    <Modal isOpen={modalOpen} setIsOpen={toggleModal}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
