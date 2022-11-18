import React from "react";
import baseURL, { backendApi } from "../hooks/axiosBase";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from "axios";

const UserEdit = () => {

    const params = useParams();
    let { response } = useFetch({
        api: backendApi,
        method: "get",
        url: "/user/" + params.userId,
    });
    console.log(response)
    const urlPut = baseURL + "user/" + params.userId;
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
        console.log(urlPut)
        let config = {
            headers: {
                'app-id' : '63473330c1927d386ca6a3a5'
            }  
        }
        console.log(config)
        axios.put(urlPut, userdata, config)
        .then(response => console.log(response));
        
      };


    return (

        <div className="container">
            {!!response && (
                <form
                onSubmit={(event) => onSubmit(event)}
                >
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="id" className="col-sm-2 col-form-label">Id:</label>
                        <div className="col-sm-10">
                            <input type="text" id="id" className="form-control" readOnly value={response.id} />
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="title" className="col-sm-2 col-form-label">Título:</label>
                        <div className="col-sm-10">
                            <select id="title" className="form-control">
                                <option disabled>{response.title} </option>
                                <option>Mr</option>
                                <option>Ms</option>
                                <option>Mrs</option>
                                <option>Miss</option>
                                <option>Doc</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="firstname" className="col-sm-2 col-form-label">Nombres:</label>
                        <div className="col-sm-10">
                            <input type="text" id="firstname" className="form-control" placeholder={response.firstName} />
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="lastname" className="col-sm-2 col-form-label">Apellidos:</label>
                        <div className="col-sm-10">
                            <input type="text" id="lastname" className="form-control" placeholder={response.lastName} />
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="picture" className="col-sm-2 col-form-label">Imagen:</label>
                        <div className="col-sm-10">
                            <input type="text" id="picture" className="form-control" placeholder={"URL String imagen ( " + response.picture + " )"} />
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="gender" className="col-sm-2 col-form-label">Género:</label>
                        <div className="col-sm-10">
                            <select id="gender" className="form-control">
                                <option disabled>{response.gender}</option>
                                <option>male</option>
                                <option>female</option>
                                <option>other</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="email" className="col-sm-2 col-form-label">Correo electrónico:</label>
                        <div className="col-sm-10">
                            <input type="text" id="email" className="form-control" placeholder={response.email} />
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="dateofBirth" className="col-sm-2 col-form-label">Fecha de Nacimiento:</label>
                        <div className="col-sm-10">
                            <input type="text" id="dateofBirth" className="form-control" placeholder={response.dateOfBirth} />
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="phone" className="col-sm-2 col-form-label">Teléfono:</label>
                        <div className="col-sm-10">
                            <input type="text" id="phone" className="form-control" placeholder={response.phone} />
                        </div>
                    </div>
                        <button type="submit" className="btn btn-primary" style={{ margin: "5px" }}>Guardar</button>
                    <Link to={`/`}>
                        <button type="submit" className="btn btn-danger">Cancelar</button>
                    </Link>
                </form>
            )}
        </div>
    )
}

export default UserEdit;