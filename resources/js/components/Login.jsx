import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [passw, setPassword] = useState("")
    const [check, setCheck] = useState(false)
    const [error, setError] = useState("")

    const logIn = async () => {

        if (email === "" && passw === "") {
            setError('Credenciales vacias')
            return;
        }

        if (email === "") {
            setError('Credenciales vacias')
            return;
        }

        if (passw === "") {
            setError('Credenciales vacias')
            return;
        }

        if (!email.includes('@')) {

            setError('Ingresa un correo válido')
            return;
        }

        if (passw.length < 3) {
            setError('La contraseña debe tener mínimo 3 caracteres')
            return;
        }

        setError('')

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: passw })
        })

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            navigate('/home');
        } else {
            setError('Contraseña o correo incorrectos!')

        }
    }

    return (
        <div className="login">
            <form onSubmit={(e) => e.preventDefault()}>
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

                    <div className='error'>{error}</div>

                </div>

                <div className="keep-logged">
                    Mantener sección iniciada
                    <input type="checkbox" checked={check} onChange={(e) => setCheck(e.target.checked)}></input>
                </div>

                <button onClick={() => {
                    logIn()
                }}>Entrar</button>

                <p className="lostpassw" onClick={() => {
                    navigate('/lostpassword')
                }}>Olvidé mi contraseña</p>
            </form>
        </div>
    )
}

export default Login