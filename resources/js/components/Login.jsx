import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [passw, setPassword] = useState("")
    const [check, setCheck] = useState(false)
    const [error, setError] = useState("")


    const [dato1, setDato1] = useState("")
    const [dato2, setDato2] = useState("@universidad.edu.co")
    const [dato3, setDato3] = useState("estudiante")
    const [dato4, setDato4] = useState("1234")

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

        const response = await fetch('https://mificho.onrender.com/api/login', {
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

    const handleBD = async () => {
        if (dato1 === "") {
            setError('Rellena los campos')
            return;
        }

        if (dato2 === "") {
            setError('Rellena los campos')
            return;
        }

        if (dato3 === "") {
            setError('Rellena los campos')
            return;
        }

        if (dato4 === "") {
            setError('Rellena los campos')
            return;
        }
        setError('')
        const response = await fetch('https://mificho.onrender.com/api/insertUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email:dato2, password: dato4, name: dato1, type: dato3 })
        })

        const data = await response.json();
        console.log(data);
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
                    Mantener sesión iniciada
                    <input type="checkbox" checked={check} onChange={(e) => setCheck(e.target.checked)}></input>
                </div>

                <button onClick={() => {
                    logIn()
                }}>Entrar</button>

                <p className="lostpassw" onClick={() => {
                    navigate('/lostpassword')
                }}>Olvidé mi contraseña</p>
            </form>

            <div className='inputs-form'>
                <input type="text"
                    placeholder="nombre"
                    value={dato1}
                    onChange={(e) => setDato1(e.target.value)}
                />
                <input type="text"
                    placeholder="correo"
                    value={dato2}
                    onChange={(e) => setDato2(e.target.value)} />
                <input type="text"
                    placeholder="tipo_usuario"
                    value={dato3}
                    onChange={(e) => setDato3(e.target.value)} />
                <input type="text"
                    placeholder="contraseña"
                    value={dato4}
                    onChange={(e) => setDato4(e.target.value)} />

                <button onClick={() => handleBD()}>enviar</button>
            </div>
        </div>
    )
}

export default Login