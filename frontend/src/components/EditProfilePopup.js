import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup({onUpdate, isOpen, onClose, buttonText}) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate({ name, description });
  }

  React.useEffect(() => {
    setName(currentUser.name ?? "");
    setDescription(currentUser.about ?? "");
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} title={"Редактировать профиль"} name={"profileInfo"} styleClass={"edit"} buttonText={"Сохранить"}>
        <input value={name} onChange={handleNameChange} id="name-input" name="name" type="text" placeholder="Имя" className="popup__text popup__text_type_name" required minLength="2" maxLength="40"/>
        <span className="name-input-error popup__text-error"></span>
        <input value={description} onChange={handleDescriptionChange} id="interests-input" name="interests" type="text" placeholder="Деятельность" className="popup__text popup__text_type_interests" required minLength="2" maxLength="200"/>
        <span className="interests-input-error popup__text-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
