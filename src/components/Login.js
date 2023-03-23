import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"
import * as auth from '../utils/auth';
import { AppContext } from '../contexts/AppContext';

const Login = () => {
    const [formValues, setFormValues] = useState({ email: '', password: '' })
    const [stateButtonSubmit, setStateButtonSubmit] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { setLoggedIn, setisNotifyPopupOpen, setStatusCompleted } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Вход';
    }, []);
    function handleSubmit (e) {
        e.preventDefault();
        setIsLoading(true)
        if (!formValues.email || !formValues.password) {
            return;
        }
        auth.authorize(formValues.email, formValues.password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token)
                    setFormValues({ email: '', password: '' });
                    setIsLoading(false);
                    setLoggedIn(true);
                    navigate('/', { replace: true });
                }
            })
            .catch(err => {
                setStatusCompleted(false);
                setisNotifyPopupOpen(true);
                console.log(err.message)
            })
            .finally(() => setIsLoading(false)
            )
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
            <h1 className="page__title">Вход</h1>
            <form
                name="form_Login"
                action="/"
                className="form form_type_auth"
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
                    onChange={onChange}
                    required
                />
                <span
                    className="form__error email-error"
                    id="email-error"
                />
                <input
                    type="password"
                    autoComplete="current-password"
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
                    disabled={!stateButtonSubmit}>{isLoading ? "обработка..." : "Войти"}
                </button>
            </form>
        </>
    )
}

export default Login