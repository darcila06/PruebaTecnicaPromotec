import React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import useForm from "../hooks/useForm"
import MyModalCreate from "./ModalCreate";

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
        - Validaciones de inputs vacios y expresiones regulares
        - Se agregan los errores a un objeto errors para posteriormente mostrarle los errores al usuario
*/
const validationsForm = (form) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexURL = /^(ftp|http|https):\/\/[^ "]+$/;
    let regexNumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let regexDate = /^\d{2}([./-])\d{2}\1\d{4}$/


    if(!form.firstname.trim()){
        errors.firstname = "El campo 'nombre' es requerido"
    } else if(!regexName.test(form.firstname.trim())){
        errors.firstname = "El campo 'nombre' solo acepta letras y espacios en blanco";
    }
        else if(!form.lastname.trim()){
        errors.lastname = "El campo 'Apellido' es requerido"
    } else if(!form.picture.trim()){
        errors.picture = "El campo 'picture' es requerido"
    } else if(!regexURL.test(form.picture.trim())){
        errors.picture = "La URL ingresada no es valida";
    } else if(!form.email.trim()){
        errors.email = "El campo 'email' es requerido"
    } else if(!regexEmail.test(form.email.trim())){
        errors.email = "El email debe tener la siguiente estructura: 'example@example.com'";
    } else if(!form.dateofBirth.trim()){
        errors.dateofBirth = "El campo 'Fecha de Cumpleaños' es requerido"
    } else if (!regexDate.test(form.dateofBirth.trim())) {
        errors.dateofBirth = "Ingrese una fecha valida en formato DD/MM/YYYY "
    } else if(!form.phone.trim()){
        errors.phone = "El campo 'telefono' es requerido"
    } else if (!regexNumber.test(form.phone.trim())){
        errors.phone = "Solo puede ingresar numeros en el siguiente formato 123-345-3456"
    }
    return errors
}

const UserCreate = () => {

    // creacion de variables del hook useForm para las validaciones de los inputs

    const { form, errors, handleChage, handleBlur } = useForm(initialForm, validationsForm)
    
    // Declaracion de la variable de estado modalShow para controlar la vista del modal
    
    const [modalShow, setModalShow] = React.useState(false);

    //funcion de confirmacion de creacion de usuario cuando termina la peticion de la API
    const onConfirm = () => {
        window.location.href = "/"
    }

    /* funcion OnSubmit donde se realiza lo siguiete:
        - Se obtienen los valores ingresados en cada uno de los inputs.
        - Se crea el userdata que se va a enviar a la API
        - Se realiza la config del Header de la API
        - Se ejecuta el POST a la API con los datos del userdata y config
        - Al obtener respuesta de la API se muestra la ventana modal de Confirmacion que se creo el usuario
    */

    async function onSubmit(e) {
        e.preventDefault();
        let title = document.getElementById("title").value;
        let fisrtname = document.getElementById("firstname").value;
        let lastname = document.getElementById("lastname").value;
        let picture = document.getElementById("picture").value;
        let gender = document.getElementById("gender").value;
        let email = document.getElementById("email").value;
        let dateOfBirth = document.getElementById("dateofBirth").value;
        let phone = document.getElementById("phone").value;
        let userdata = {
            "title": title,
            "firstName": fisrtname,
            "lastName": lastname,
            "picture": picture,
            "gender": gender,
            "email": email,
            "dateOfBirth": dateOfBirth,
            "phone": phone
        }

        let config = {
            headers: {
                'app-id': '63473330c1927d386ca6a3a5'
            }
        }
        let urlPost = "https://dummyapi.io/data/v1/user/create"
        console.log(config)
        axios.post(urlPost, userdata, config)
            .then((response) => {
                console.log(response);
                setModalShow(true)
            });

    };

    //Maquetacion del Form para obtener los datos del usuario

    return (

        <div className="container">
            <MyModalCreate
                show={modalShow}
                title="Confirmación de Creación de Usuario"
                body="El usuario fue creado correctamente"
                onSubmit={ () => onConfirm()}
            />
            <form
                onSubmit={(event) => onSubmit(event)}
            >
                <div className="form-group row" style={{ padding: "5px" }}>
                    <label htmlFor="title" className="col-sm-2 col-form-label">Título:</label>
                    <div className="col-sm-10">
                        <select id="title" className="form-control">
                            <option disabled>Select </option>
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
                        <input type="text" id="firstname" name="firstname" className="form-control" placeholder="ingrese su nombre" onChange={handleChage} value={form.firstname} onBlur={handleBlur} />
                        {errors.firstname && <div className="alert alert-danger">{errors.firstname}</div> }
                    </div>
                </div>
                <div className="form-group row" style={{ padding: "5px" }}>
                    <label htmlFor="lastname" className="col-sm-2 col-form-label">Apellidos:</label>
                    <div className="col-sm-10">
                        <input type="text" id="lastname" name="lastname" className="form-control" placeholder="ingrese su apellido" onChange={handleChage} value={form.lastname} onBlur={handleBlur}/>
                        {errors.lastname && <div className="alert alert-danger">{errors.lastname}</div> }
                    </div>
                </div>
                <div className="form-group row" style={{ padding: "5px" }}>
                    <label htmlFor="picture" className="col-sm-2 col-form-label">Imagen:</label>
                    <div className="col-sm-10">
                        <input type="text" id="picture" name="picture" className="form-control" placeholder="URL String imagen" onChange={handleChage} value={form.picture} onBlur={handleBlur} />
                        {errors.picture && <div className="alert alert-danger">{errors.picture}</div> }
                    </div>
                </div>
                <div className="form-group row" style={{ padding: "5px" }}>
                    <label htmlFor="gender" className="col-sm-2 col-form-label">Género:</label>
                    <div className="col-sm-10">
                        <select id="gender" className="form-control">
                            <option disabled>select</option>
                            <option>male</option>
                            <option>female</option>
                            <option>other</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row" style={{ padding: "5px" }}>
                    <label htmlFor="email" className="col-sm-2 col-form-label">Correo electrónico:</label>
                    <div className="col-sm-10">
                        <input type="text" id="email" name="email" className="form-control" placeholder="Ingrese su mail" onChange={handleChage} value={form.email} onBlur={handleBlur} />
                        {errors.email && <div className="alert alert-danger">{errors.email}</div> }
                    </div>
                </div>
                <div className="form-group row" style={{ padding: "5px" }}>
                    <label htmlFor="dateofBirth" className="col-sm-2 col-form-label">Fecha de Nacimiento:</label>
                    <div className="col-sm-10">
                        <input type="text" id="dateofBirth" name="dateofBirth" className="form-control" placeholder="ingrese su fecha de cumpleaños" onChange={handleChage} value={form.dateofBirth} onBlur={handleBlur}/>
                        {errors.dateofBirth && <div className="alert alert-danger">{errors.dateofBirth}</div> }
                    </div>
                </div>
                <div className="form-group row" style={{ padding: "5px" }}>
                    <label htmlFor="phone" className="col-sm-2 col-form-label">Teléfono:</label>
                    <div className="col-sm-10">
                        <input type="text" id="phone" name="phone" className="form-control" placeholder="Ingrese su telefono" onChange={handleChage} value={form.phone} onBlur={handleBlur}/>
                        {errors.phone && <div className="alert alert-danger">{errors.phone}</div> }
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