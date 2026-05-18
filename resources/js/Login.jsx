const Login = () => {
    return (
        <div className="login">
            <form>
                <h2>Ingresa tus credenciales</h2>

                <img src="Unicorlogo.png" className="logo-unicor"></img>
                <div className="inputs-form">
                    <input placeholder="Usuario"></input>
                    <input placeholder="Contraseña"></input>
                </div>

                <div className="keep-logged">
                    Mantener sección iniciada
                    <input type="checkbox" checked></input>
                </div>

                <button>Entrar</button>

                <p className="lostpassw">Olvidé mi contraseña</p>
            </form>
        </div>
    )
}

export default Login