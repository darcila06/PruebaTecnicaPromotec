import React from "react";
import { backendApi } from "../hooks/axiosBase";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const UserDetail = () => {

    const params = useParams();
    let { response } = useFetch({
        api: backendApi,
        method: "get",
        url: "/user/" + params.userId,
    });
    console.log(response)

    return (

        <div className="container">
            {!!response && (
                <form>
                    <fieldset disabled>
                        <div className="form-group row" style={{padding: "5px"}}>
                            <label htmlFor="disabledTextInput" className="col-sm-2 col-form-label">Id:</label>
                            <div className="col-sm-10">
                                <input type="text" id="disabledTextInput" className="form-control" value={response.id} />
                            </div>
                        </div>
                        <div className="form-group row" style={{padding: "5px"}}>
                            <label htmlFor="disabledTextInput" className="col-sm-2 col-form-label">Título:</label>
                            <div className="col-sm-10">
                                <input type="text" id="disabledTextInput" className="form-control" value={response.title} />
                            </div>
                        </div>
                        <div className="form-group row" style={{padding: "5px"}}>
                            <label htmlFor="disabledTextInput" className="col-sm-2 col-form-label">Nombres:</label>
                            <div className="col-sm-10">
                                <input type="text" id="disabledTextInput" className="form-control" value={response.firstName} />
                            </div>
                        </div>
                        <div className="form-group row" style={{padding: "5px"}}>
                            <label htmlFor="disabledTextInput" className="col-sm-2 col-form-label">Apellidos:</label>
                            <div className="col-sm-10">
                                <input type="text" id="disabledTextInput" className="form-control" value={response.lastName} />
                            </div>
                        </div>
                        <div className="form-group row" style={{padding: "5px"}}>
                            <label htmlFor="disabledTextInput" className="col-sm-2 col-form-label">Imagen:</label>
                            <div className="col-sm-10">
                                <input type="text" id="disabledTextInput" className="form-control" value={response.picture} />
                            </div>
                        </div>
                        <div className="form-group row" style={{padding: "5px"}}>
                            <label htmlFor="disabledTextInput" className="col-sm-2 col-form-label">Género:</label>
                            <div className="col-sm-10">
                                <input type="text" id="disabledTextInput" className="form-control" value={response.gender} />
                            </div>
                        </div>
                        <div className="form-group row" style={{padding: "5px"}}>
                            <label htmlFor="disabledTextInput" className="col-sm-2 col-form-label">Correo electrónico:</label>
                            <div className="col-sm-10">
                                <input type="text" id="disabledTextInput" className="form-control" value={response.email} />
                            </div>
                        </div>
                        <div className="form-group row" style={{padding: "5px"}}>
                            <label htmlFor="disabledTextInput" className="col-sm-2 col-form-label">Fecha de Nacimiento:</label>
                            <div className="col-sm-10">
                                <input type="text" id="disabledTextInput" className="form-control" value={response.dateOfBirth} />
                            </div>
                        </div>
                        <div className="form-group row" style={{padding: "5px"}}>
                            <label htmlFor="disabledTextInput" className="col-sm-2 col-form-label">Teléfono:</label>
                            <div className="col-sm-10">
                                <input type="text" id="disabledTextInput" className="form-control" value={response.phone} />
                            </div>
                        </div>
                    </fieldset>
                    <Link to={`/`}>
                    <button type="submit" class="btn btn-primary" style={{margin: "5px"}}>Guardar</button>
                    </Link>
                    <Link to={`/`}>
                        <button type="submit" class="btn btn-danger">Cancelar</button>
                    </Link>
                </form>
            )}
        </div>
    )
}

export default UserDetail;