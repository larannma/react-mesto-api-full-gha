import React from "react";

function PopupWithForm({onSubmit, isOpen, onClose, buttonText, ...props}) {
  return (
    <div className={`popup ${props.styleClass}Popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button onClick={onClose} type="button" className="popup__close-button"></button>
        <h2 className="popup__title">{props.title}</h2>
          <form name={props.name} className="popup__form" onSubmit={onSubmit}>
            {props.children}
            <button type="submit" className="popup__submit-btn">{buttonText}</button>
          </form>
      </div>
  </div>
  );
}

export default PopupWithForm;
