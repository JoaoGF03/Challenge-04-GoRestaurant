import { FiCheckSquare } from 'react-icons/fi';
import { Input } from '../Input';
import { Modal } from '../Modal';
import { Form } from './styles';


interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void
  handleUpdateFood: (data: FoodDTO) => Promise<void>
  editingFood: Record<string, any>
}

interface FoodDTO {
  id: number
  image: string
  name: string
  price: number
  description: string
  available: boolean
}

export function ModalEditFood(props: ModalEditFoodProps) {
  const { isOpen, setIsOpen, editingFood, handleUpdateFood } = props;

  async function handleSubmit(data: FoodDTO) {
    handleUpdateFood(data);

    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
