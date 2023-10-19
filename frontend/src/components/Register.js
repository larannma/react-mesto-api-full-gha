import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Auth from '../utils/Auth.js';

function Register ({handleRegistration}) {
	const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

	const navigate = useNavigate();

	const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    Auth.register(email, password).then((res) => {
      navigate('/sign-in', {replace: true});
      handleRegistration("success");
			}
		).catch(()=> {
      handleRegistration("fail");
    });
  }

	return (
		<section className="login root_section">
			<h2 className="login__title">Регистрация</h2>
			<form className="login__form" onSubmit={handleSubmit}>
				<div className="login__properies">
					<input onChange={handleChange} value={formValue.email} className="login__text" id="email-input" name="email" placeholder="Email" type="email" required></input>
					<input onChange={handleChange} value={formValue.password} className="login__text" id="password-input" name="password" placeholder="Пароль" type="password" required></input>
				</div>
				<button type="submit" className="login__button">Зарегистрироваться</button>
			</form>
      <span className="login__subtitle">Уже зарегистрированы? <Link to="/sign-in" className='login__link'>Войти</Link></span>
    </section>
    )
}

export default Register;