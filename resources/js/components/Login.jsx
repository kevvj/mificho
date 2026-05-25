import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'


const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [passw, setPassword] = useState("")
    const [check, setCheck] = useState(false)
    const [error, setError] = useState("")

    const [users, setUsers] = useState([])
    const[coffeestores, setCoffeestores] = useState([])


    const [dato1, setDato1] = useState("")
    const [dato2, setDato2] = useState("@universidad.edu.co")
    const [dato3, setDato3] = useState("estudiante")
    const [dato4, setDato4] = useState("1234")

    const [dato5, setDato5] = useState("")
    const [dato6, setDato6] = useState("")

    const [dato7, setDato7] = useState("")
    const [dato8, setDato8] = useState("")

    const URL = "https://mificho.onrender.com"

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
            esto es para solo para hacer pruebas(si lo vas a usar mira bien que datos metes y trata de reiniciar cada que muevas algo y... Es mas no lo muevas jajaj)
            <div className='inputs-form'>
                <h2>estudiantes</h2>
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


            <div className='inputs-form'>
                <h2>Cafeterias</h2>
                <input type="text"
                    placeholder="nombre"
                    value={dato5}
                    onChange={(e) => setDato5(e.target.value)}
                />
                <input type="text"
                    placeholder="unicación"
                    value={dato6}
                    onChange={(e) => setDato6(e.target.value)} />

                <button onClick={() => handleBDCoff()}>enviar</button>
            </div>

            <div className='inputs-form'>
                <h2>Borrar Cafeterias</h2>
                <input type="text"
                    placeholder="ID de la cafeteria"
                    value={dato7}
                    onChange={(e) => setDato7(e.target.value)}
                />

                <button onClick={() => handleDeleteCoff()}>Borrar</button>
            </div>

            <div className='inputs-form'>
                <h2>Borrar Usuario</h2>
                <input type="text"
                    placeholder="ID de la cafeteria"
                    value={dato8}
                    onChange={(e) => setDato8(e.target.value)}
                />

                <button onClick={() => handleDeleteUser()}>Borrar</button>
            </div>

            <div>
                <h2>Tabla de usuarios</h2>
                <div className="tabla-grid">
                    <div>id</div>
                    <div>Nombre</div>
                    <div>Correo</div>
                    <div>Tipo de usuario</div>


                    {users && users.map(user => (
                        <React.Fragment key={user.id_usuario}>
                            <div>{user.id_usuario}</div>
                            <div>{user.nombre}</div>
                            <div>{user.correo}</div>
                            <div>{user.tipo_usuario}</div>
                        </React.Fragment>

                    ))}
                </div>
            </div>

            <div>
                <h2>Tabla de cafeterias</h2>
                <div className="tabla-grid-coff">
                    <div>id</div>
                    <div>Nombre</div>
                    <div>Ubicación</div>


                    {coffeestores && coffeestores.map(coff => (
                        <React.Fragment key={coff.id_cafeteria}>
                            <div>{coff.id_cafeteria}</div>
                            <div>{coff.nombre}</div>
                            <div>{coff.ubicacion}</div>
                        </React.Fragment>

                    ))}
                </div>
            </div>


        </div>
    )
}

export default Login