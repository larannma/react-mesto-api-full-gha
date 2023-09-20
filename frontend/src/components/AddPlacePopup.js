import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onSubmit, buttonText}) {
  const [placeName, setPlaceName] = React.useState("");
  const [placeLink, setPlaceLink] = React.useState("");

  React.useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [isOpen]);


  function handlePlaceNameChange(e) {
    setPlaceName(e.target.value);
  }

  function handlePlaceLinkChange(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({placeName, placeLink});
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} title={"Новое место"} name={"cardInfo"} styleClass={"add"} buttonText={"Создать"}>
      <input value={placeName} onChange={handlePlaceNameChange} id="cardName-input" name="name" type="text" placeholder="Название" className="popup__text popup__text_type_name" required minLength="2" maxLength="30"/>
      <span className="cardName-input-error popup__text-error"></span>
      <input value={placeLink} onChange={handlePlaceLinkChange} id="photo-link-input" name="photo-link" type="url" placeholder="Ссылка на картинку" className="popup__text popup__text_type_photo-link" required/>
      <span className="photo-link-input-error popup__text-error"></span>
  </PopupWithForm>
  );
}

export default AddPlacePopup;