import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import * as auth from '../utils/auth';
import { AppContext } from '../contexts/AppContext';

const Register = ({ }) => {
    const [formValues, setFormValues] = useState({ email: '', password: '' })
    const [stateButtonSubmit, setStateButtonSubmit] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { setisNotifyPopupOpen, setStatusCompleted } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Регистрация';
    }, []);

    function handleSubmit (e) {
        e.preventDefault()
        setIsLoading(true)
        const { email, password } = formValues;
        auth.register(email, password)
            .then((res) => {
                setStatusCompleted(true);
                setisNotifyPopupOpen(true);
                setIsLoading(false);
                navigate('/sign-in', { replace: true });
            })
            .catch((err) => {
                console.log(err);
                setStatusCompleted(false);
                setisNotifyPopupOpen(true);
            })
            .finally(() => {
                setIsLoading(false)
            })

    }

    function onChange (e) {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });

    }
    return (
        <>
            <h1 className="page__title">Регистрация</h1>
            <form
                name="form_register"
                action="/"
                className="form form_type_auth"
                onSubmit={handleSubmit}
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
                    onChange={onChange}
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
                    onChange={onChange}
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