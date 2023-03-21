import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"

const Register = ({ isLoading }) => {
    const [formValues, setFormValues] = useState({ email: '', password: '' })
    const [stateButtonSubmit, setStateButtonSubmit] = useState(true);
    useEffect(() => {
        document.title = 'Регистрация';
    }, []);
    function handleSubmit () {
        console.log("сработал handleSubmit");
    }
    function onChange (e) {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
        console.log(formValues);

    }
    return (
        <>
            <h1 className="page__title">Регистрация</h1>
            <form
                name="form_register"
                action="/"
                className="form form_type_register"
                onSubmit={handleSubmit}
                onChange={onChange}
            >
                <input
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    className="form__input input_theme_dark form__input_email"
                    name="email" id="email"
                    minLength={2}
                    maxLength={40}
                    value={formValues.email}
                    required
                />
                <span
                    className="form__error email-error"
                    id="email-error"
                />
                <input
                    type="password"
                    autoComplete="new-password"
                    placeholder="Пароль"
                    className="form__input input_theme_dark form__input_password"
                    name="password"
                    id="password"
                    minLength={2}
                    maxLength={200}
                    value={formValues.password}
                    required
                />
                <span
                    className="form__error about-error"
                    id="about-error"
                />
                <button
                    type="submit"
                    name="form__submit"
                    className={`form__submit form__submit_theme_dark ${!stateButtonSubmit && "form__submit_disable"}`}
                    disabled={!stateButtonSubmit}>{isLoading ? "обработка..." : "Зарегистрироваться"}
                </button>
            </form>
            <p className="page__hint">
                Уже зарегистрированы?
                <NavLink to="/sign-in" className="page__navigation-link">Войти</NavLink>
            </p>
        </>
    )
}

export default Register