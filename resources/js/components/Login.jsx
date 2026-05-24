import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [passw, setPassword] = useState("")

    return (
        <div className="login">
            <form>
                <h2>Ingresa tus credenciales</h2>

                <img src="Unicorlogo.png" className="logo-unicor"></img>
                <div className="inputs-form">
                    <input
                        placeholder="Usuario"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}></input>

                    <input
                        placeholder="Contraseña"
                        value={passw}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'></input>
                </div>

                <div className="keep-logged">
                    Mantener sección iniciada
                    <input type="checkbox" checked></input>
                </div>

                <button onClick={() => navigate('/home')}>Entrar</button>

                <p className="lostpassw">Olvidé mi contraseña</p>
            </form>
        </div>
    )
}

export default Login