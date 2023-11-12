import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  disabled,
  hidden,
  className
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  let disabled_val = false
  let hidden_val = false

  if(disabled){
    disabled_val = true
  }

  if (hidden) {
    hidden_val = true
  }

  return (
    <button className={className} onClick={onClick} disabled={disabled_val} hidden={hidden_val}>{buttonText}</button>
  );
}

export default OpenModalButton;
