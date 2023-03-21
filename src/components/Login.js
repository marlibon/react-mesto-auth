import { NavLink } from "react-router-dom"

const Login = () => {
    return (
        <div style={{ color: 'white' }}>
            <h1>Login</h1>
            <NavLink to="/sign-up" >Зарегистрироваться</NavLink>

        </div>
    )
}

export default Login