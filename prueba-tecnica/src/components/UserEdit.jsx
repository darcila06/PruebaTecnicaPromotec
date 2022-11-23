import React from "react";
import baseURL, { backendApi } from "../hooks/axiosBase";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from "axios";
import useForm from "../hooks/useForm";

//Se inicializa el formulario para el manejo de las validaciones de los inputs

const initialForm = {
    firstname: "",
    lastname: "",
    picture: "",
    email:"",
    dateofBirth:"",
    phone: "",
}

/*
    * Se crea la funcion validationForm con lo siguiete:
        - Variables de expresiones regulares para la validacion de los datos ingresados
        - Validaciones de expresiones regulares
        - Se agregan los errores a un objeto errors para posteriormente mostrarle los errores al usuario
*/

const validationsForm = (form) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexURL = /^(ftp|http|https):\/\/[^ "]+$/;
    let regexNumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let regexDate = /^\d{2}([./-])\d{2}\1\d{4}$/

    console.log(form.firstname)
    if(form.firstname.trim()){
        if(!regexName.test(form.firstname.trim())){
            errors.firstname = "El campo 'nombre' solo acepta letras y espacios en blanco";
        }
    } 
    if(form.lastname.trim()){
        if(!regexName.test(form.lastname.trim())){
            errors.lastname = "El campo 'nombre' solo acepta letras y espacios en blanco";
        }
    }
    if(form.picture.trim()){
        if(!regexURL.test(form.picture.trim())){
            errors.picture = "La URL ingresada no es valida";
        }
    }
    if(form.email.trim()){
        if(!regexEmail.test(form.email.trim())){
            errors.email = "El campo 'Email' es incorrecto";
        }
    } 
    if(form.dateofBirth.trim()){
        if(!regexDate.test(form.dateofBirth.trim())){
            errors.dateofBirth = "Ingrese una fecha valida en formato DD/MM/YYYY "
        }
    }
    if(form.phone.trim()){
        if(!regexNumber.test(form.phone.trim())){
            errors.phone = "Solo puede ingresar numeros en el siguiente formato 123-345-3456"
        }
        
    }
    return errors
}


const UserEdit = () => {
    
    const { form, errors, handleChage, handleBlur } = useForm(initialForm, validationsForm)

     /* Se utiliza el hook useFetch para obtener los datos del usuario descrito en los parametros de la url
    */

    const params = useParams();
    let { response } = useFetch({
        api: backendApi,
        method: "get",
        url: "/user/" + params.userId,
    });

    /* funcion OnSubmit donde se realiza lo siguiete:
        - Se crea la variable para el PUT a la API
        - Se obtienen los valores ingresados en cada uno de los inputs.
        - Se crea el userdata que se va a enviar a la API
        - Se realiza la config del Header de la API
        - Se ejecuta el PUT a la API con los datos del userdata y config
    */
    
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

        let config = {
            headers: {
                'app-id' : '63473330c1927d386ca6a3a5'
            }  
        }
        axios.put(urlPut, userdata, config)
        .then(response => console.log(response));
        
      };

      //Maquetacion del Form para mostrar los datos del usuario y pueda editar los campos

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
                            <input type="text" id="firstname" className="form-control" placeholder={response.firstName} onChange={handleChage} value={form.firstname} onBlur={handleBlur} name="firstname"/>
                            {errors.firstname && <div className="alert alert-danger">{errors.firstname}</div> }
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="lastname" className="col-sm-2 col-form-label">Apellidos:</label>
                        <div className="col-sm-10">
                            <input type="text" id="lastname" name="lastname" className="form-control" placeholder={response.lastName} onChange={handleChage} value={form.lastname} onBlur={handleBlur} />
                            {errors.lastname && <div className="alert alert-danger">{errors.lastname}</div> }
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="picture" className="col-sm-2 col-form-label">Imagen:</label>
                        <div className="col-sm-10">
                            <input type="text" id="picture" name="picture" className="form-control" placeholder={"URL String imagen ( " + response.picture + " )"} onChange={handleChage} value={form.picture} onBlur={handleBlur} />
                            {errors.picture && <div className="alert alert-danger">{errors.picture}</div> }
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
                            <input type="text" id="email" name="email" className="form-control" placeholder={response.email} onChange={handleChage} value={form.email} onBlur={handleBlur} />
                            {errors.email && <div className="alert alert-danger">{errors.email}</div> }
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="dateofBirth" className="col-sm-2 col-form-label">Fecha de Nacimiento:</label>
                        <div className="col-sm-10">
                            <input type="text" id="dateofBirth" name="dateofBirth" className="form-control" placeholder={response.dateOfBirth} onChange={handleChage} value={form.dateofBirth} onBlur={handleBlur} />
                            {errors.dateofBirth && <div className="alert alert-danger">{errors.dateofBirth}</div> }
                        </div>
                    </div>
                    <div className="form-group row" style={{ padding: "5px" }}>
                        <label htmlFor="phone" className="col-sm-2 col-form-label">Teléfono:</label>
                        <div className="col-sm-10">
                            <input type="text" id="phone" name="phone" className="form-control" placeholder={response.phone} onChange={handleChage} value={form.phone} onBlur={handleBlur}  />
                            {errors.phone && <div className="alert alert-danger">{errors.phone}</div> }
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