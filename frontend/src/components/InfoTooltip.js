function InfoTooltip ({onClose, isOpen, image, text, ...props}) {
	return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
    <div className="popup__container">
      <button onClick={onClose} type="button" className="popup__close-button"></button>
      <img src={image} alt="статус регистрации" className="popup__registration-status"/>
      <h2 className="popup__title popup__registration-title">{text}</h2>
    </div>
  </div>
  )
}

export default InfoTooltip;