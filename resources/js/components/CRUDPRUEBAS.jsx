const CRUD = () => {
    return (
        <>
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
        </>
    )
}