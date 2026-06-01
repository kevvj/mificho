import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { API_URL } from '../config';


const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [passw, setPassword] = useState("")
    const [check, setCheck] = useState(false)
    const [error, setError] = useState("")

    const [users, setUsers] = useState([])
    const[coffeestores, setCoffeestores] = useState([])


    const [dato1, setDato1] = useState("")
    const [dato2, setDato2] = useState("@unicordoba.edu.co")
    const [dato3, setDato3] = useState("estudiante")
    const [dato4, setDato4] = useState("1234")

    const [dato5, setDato5] = useState("")
    const [dato6, setDato6] = useState("")

    const [dato7, setDato7] = useState("")
    const [dato8, setDato8] = useState("")

    const URL = API_URL

    useEffect(() => {
        fetch(`${URL}/api/users`)
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })

        fetch(`${URL}/api/coffeestores`)
            .then(res => res.json())
            .then(data => {
                setCoffeestores(data)
            })
    }, [])

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

        const response = await fetch(`${URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: passw })
        })

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data.user));
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
        const response = await fetch(`${URL}/api/insertUser`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: dato2, password: dato4, name: dato1, type: dato3 })
        })

        const data = await response.json();
        console.log(data);
    }

    const handleBDCoff = async () => {
        if (dato5 === "") {
            setError('Rellena los campos')
            return;
        }

        if (dato6 === "") {
            setError('Rellena los campos')
            return;
        }

        setError('')
        const response = await fetch(`${URL}/api/insertCoff`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: dato5, location: dato6 })
        })
        const text = await response.text()
        console.log(text)

    }

    const handleDeleteCoff = async () => {
        const response = await fetch(`${URL}/api/deleteCoff`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: dato7 })
        })
        const data = await response.json()
        console.log(data)
    }

    const handleDeleteUser = async () => {
        const response = await fetch(`${URL}/api/deleteUser`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: dato8 })
        })
        const data = await response.json()
        console.log(data)
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
            


        </div>
    )
}

export default Login