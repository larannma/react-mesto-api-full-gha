function ImagePopup({onClose, isOpen, ...props}) {
    return (
        <div className={`popup cardPopup ${isOpen ? "popup_opened": ""}`}>
            <div className="popup__image-container">
            <button type="button" className="popup__close-button" onClick={onClose}></button>
            <img src={props.card.link} alt={props.card.name} className="popup__image"/>
            <p className="popup__image-text">{props.card.name}</p>
            </div>
      </div>
    );
  }
  
  export default ImagePopup;
  