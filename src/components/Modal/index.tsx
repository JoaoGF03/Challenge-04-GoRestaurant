import { ReactNode, useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  setIsOpen: () => void
}

export function Modal(props: ModalProps) {
  const { isOpen, setIsOpen, children } = props

  const prevProps = useRef<ModalProps>()

  useEffect(() => {
    prevProps.current = props
  })

  const propsPreviousValue = prevProps.current ?? props;

  useEffect(() => {
    if (propsPreviousValue.isOpen !== isOpen)
      setModalStatus(isOpen)
  }, [isOpen, propsPreviousValue.isOpen])

  const [modalStatus, setModalStatus] = useState(isOpen)

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
}
