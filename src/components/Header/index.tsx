import { FiPlusSquare } from 'react-icons/fi';
import Logo from '../../assets/logo.svg';
import { useFoods } from '../../hooks/useFoods';
import { Container } from './styles';

export function Header() {
  const { toggleModal } = useFoods()

  return (
    <Container>
      <header>
        <img src={Logo} alt="GoRestaurant" />
        <nav>
          <div>
            <button
              type="button"
              onClick={toggleModal}
            >
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  )
};
