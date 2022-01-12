import ReactDOM from 'react-dom';
import './Modal.css';

const BackDrop = (props) => {
  const { isOpen, onClose } = props;
  return (
    <div
      className={`backdrop ${isOpen ? 'backdrop__open' : ''}`}
      onClick={onClose}
    />
  );
};

const ModalOverlay = (props) => {
  const { isOpen, children } = props;
  return (
    <div className={`modal ${isOpen ? 'modal__open' : ''}`}>
      {isOpen && children}
    </div>
  );
};

const modalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay isOpen={props.isOpen}>{props.children}</ModalOverlay>,
        modalElement,
      )}
      {ReactDOM.createPortal(
        <BackDrop isOpen={props.isOpen} onClose={props.onClose} />,
        modalElement,
      )}
    </>
  );
};

export default Modal;
