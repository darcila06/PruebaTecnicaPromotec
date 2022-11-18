import React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const UserCreate = () => {

    async function onSubmit (e) {
        e.preventDefault();
        let title = document.getElementById("title").value;
        let fisrtname = document.getElementById("firstname").value;
        let lastname = document.getElementById("lastname").value;
        let picture = document.getElementById("picture").value;
        let gender = document.getElementById("gender").value;
        let email = document.getElementById("email").value;
        let dateofbirth = document.getElementById("dateofBirth").value;
        let phone = document.getElementById("phone").value;
        let userdata = {
            "title": title,
            "firstName" : fisrtname,
            "lastName": lastname,
            "picture": picture,
            "gender": gender,
            "email": email,
            "dateOfBirth": dateofbirth,
            "phone": phone
        }
        console.log(userdata)
        let config = {
            headers: {
                'app-id' : '63473330c1927d386ca6a3a5'
            }  
        }
        let urlPost = "https://dummyapi.io/data/v1/user/create"
        console.log(config)
        axios.post(urlPost, userdata, config)
        .then(response => console.log(response));
        
      };


    return (

        <div className="container">
            <form
                onSubmit={(event) => onSubmit(event)}
                >
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="title" className="col-sm-2 col-form-label">Título:</label>
                        <div className="col-sm-10">
                            <select id="title" className="form-control">
                                <option  disabled>Select </option>
                                <option>mr</option>
                                <option>ms</option>
                                <option>mrs</option>
                                <option>miss</option>
                                <option>doc</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="firstname" className="col-sm-2 col-form-label">Nombres:</label>
                        <div className="col-sm-10">
                            <input type="text" id="firstname" className="form-control" placeholder="ingrese su nombre" />
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="lastname" className="col-sm-2 col-form-label">Apellidos:</label>
                        <div className="col-sm-10">
                            <input type="text" id="lastname" className="form-control" placeholder="ingrese su apellido" />
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="picture" className="col-sm-2 col-form-label">Imagen:</label>
                        <div className="col-sm-10">
                            <input type="text" id="picture" className="form-control" placeholder="URL String imagen"  />
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="gender" className="col-sm-2 col-form-label">Género:</label>
                        <div className="col-sm-10">
                            <select id="gender" className="form-control">
                                <option  disabled>select</option>
                                <option>male</option>
                                <option>female</option>
                                <option>other</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="email" className="col-sm-2 col-form-label">Correo electrónico:</label>
                        <div className="col-sm-10">
                            <input type="text" id="email" className="form-control" placeholder="Ingrese su mail" />
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="dateofBirth" className="col-sm-2 col-form-label">Fecha de Nacimiento:</label>
                        <div className="col-sm-10">
                            <input type="text" id="dateofBirth" className="form-control" placeholder="ingrese su fecha de cumpleaños" />
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="phone" className="col-sm-2 col-form-label">Teléfono:</label>
                        <div className="col-sm-10">
                            <input type="text" id="phone" className="form-control" placeholder="Ingrese su telefono" />
                        </div>
                    </div>
                        <button type="submit" className="btn btn-primary" style={{ margin: "5px" }}>Guardar</button>
                    <Link to={`/`}>
                        <button type="submit" className="btn btn-danger">Cancelar</button>
                    </Link>
                </form>
        </div>
    )
}

export default UserCreate;