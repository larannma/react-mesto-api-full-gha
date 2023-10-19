import * as Auth from '../utils/Auth.js';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Login ({handleLogin}) {
	const [formValue, setFormValue] = useState({
    email: '',
    password: ''
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
    if (!formValue.email || !formValue.password){
      return;
    }
    Auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token){
          setFormValue({email: '', password: ''});
          handleLogin();
          navigate('/my-profile', {replace: true});
        }
      })
      .catch(err => console.log(err));
  }

	return (
		<section className="login root_section">
			<h2 className="login__title">Вход</h2>
			<form onSubmit={handleSubmit} className="login__form">
				<div className="login__properies">
					<input onChange={handleChange} value={formValue.email} className="login__text" id="email-input" name="email" placeholder="Email" type="email" required></input>
					<input onChange={handleChange} value={formValue.password} className="login__text" id="password-input" name="password" placeholder="Пароль" type="password" required></input>
				</div>
				<button type="submit" className="login__button">Войти</button>
			</form>
    </section>
    )
}

export default Login;