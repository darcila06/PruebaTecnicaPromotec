// importacion de los paquetes necesarios para la maquetacion del sitio

import React, { useState, useEffect } from "react";
import { backendApi } from "../hooks/axiosBase";
import useFetch from "../hooks/useFetch";
import { Avatar } from '@material-ui/core'
import { BsTrashFill, BsPencilSquare, BsFillInfoSquareFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import MyModalDelete from "./ModalDelete";
import useTable from "../hooks/useTable";
import TableFooter from "./TableFooter";

// Creacion del componente de funcion

const SearchUser = () => {

    /*Declaracion de variables de estado para la maquetacion del sitio
        ModalShow: variable para manipular el estado de la visibilidad de la ventana modal
        userid: variable para manipular el id del usuario que vamos a manipular
        users: variable donde se guardara la data que nos arroje al API
        search: variable para manipular el input de busqueda
        page: variable para el manejo de la paginacion de la tabla
    */
    const [modalShow, setModalShow] = useState(false);
    const [userid, setUserid] = useState("");
    const [users, setusers] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    //Declaracion de los resultados de la api, dependiendo del valor que tenga el input search

    const results = !search ? users : users.filter((user) => user.firstName.toLowerCase().includes(search.toLowerCase()) || user.lastName.toLowerCase().includes(search.toLowerCase()))
    
    //Declaracion de las variables slice y range del hook useTable para el manejo de los datos mostrados en la tabla

    const { slice, range } = useTable(results, page, 6);
    
    //Declaracion de diccionario para la traduccion de los titles obtenidos de la API

    const titleDic = {
        mr: 'Sr',
        miss: 'Srta',
        mrs: "Sra",
        ms: "Sra",
    }

    //utilizamos el hook UseFetch para realizar la consulta de los usuarios a la API

    const { response: usersApi, isLoading } = useFetch({
        api: backendApi,
        method: "get",
        url: "/user",
    });

    useEffect(() => {
        //actualizara los usuarios dependiendo de la respuesta de la API
        if (!isLoading) {
            setusers([...usersApi.data]);
        }
    }, [isLoading]);

    //Declaracion de la funcion searcher para capturar el valor de lo escrito en el inupt search

    const searcher = (e) => {
        setSearch(e.target.value)
    }

    //Declaracion de la funcion setdata, para cambiar el estado de Modal a true y cambiar el  estado de userID

    const setdata = (userid) =>{
        setModalShow(true);
        setUserid(userid)
    }

    // funcion OnSubmit que realiza la solicitud de eliminacion a la API y retorna al Main despues de la respuesta

    async function onSubmit() {
        let urldelete = "https://dummyapi.io/data/v1/user/" + userid;
        let config = {
            headers: {
                'app-id': '63473330c1927d386ca6a3a5'
            }
        }
        axios.delete(urldelete, config)
        .then(res => {
            console.log(res);
            window.location.href = "/"
        });
        
    }

    // Declaracion del navigate para cambiar de routa al momento de ejecutar la funcion

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/user-create`;
        navigate(path);
    }


    // Maquetacion del sitio web

    return (
        <div>
            {/* llamamos al modal Delete para poder mostrarlo cuando el showModal sea true */}
            <MyModalDelete
                show={modalShow}
                onHide={() => setModalShow(false)}
                title="Confirmación de Eliminacion"
                body="¿Está seguro que desea eliminar este usuario?"
                onSubmit={ () => onSubmit()}
            />
            <div className="container">
                <form className="form-inline">
                    <div className="row">
                        <div className="col">
                            {/* input search para la busqueda de usuarios en la tabla */}
                            <input value={search} onChange={searcher} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        </div>
                        <div className="col">
                            {/* Button que redirecciona a la pagina de User Create*/}
                            <button onClick={routeChange} className="btn btn-outline-success my-2 my-sm-0" type="submit">Crear Usuario</button>
                        </div>
                    </div>
                </form>
            </div>
            <section className="intro">
                <div className="bg-image h-100">
                    <div className="mask d-flex align-items-center h-100">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <div className="card shadow-2-strong">
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-borderless mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Id</th>
                                                            <th scope="col">Nombres y Apellidos</th>
                                                            <th scope="col">Foto</th>
                                                            <th scope="col">Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            //Se realiza el map del slice para renderizar cada usuario que se halla obtenido de la API
                                                            slice.map((user, key) =>
                                                                <tr>
                                                                    <td><a href={`/user-detail/${user.id}`}> {user.id} </a></td>
                                                                    <td>{titleDic[user.title] + ". " + user.firstName + " " + user.lastName}</td>
                                                                    <td><Avatar alt="Remy Sharp" src={user.picture} /></td>
                                                                    <td >
                                                                        {/* Se crean los botones para el manejo de delete, edit y view de los usuarios obtenidos*/}
                                                                        <button onClick={() => setdata(user.id)} type="button" className="btn btn-danger btn-sm px-3" style={{ margin: "5px" }}>
                                                                            <BsTrashFill></BsTrashFill>
                                                                        </button>
                                                                        <Link key={user.id} to={`/user-edit/${user.id}`}>
                                                                            <button type="button" className="btn btn-primary btn-sm px-3" style={{ margin: "5px" }}>
                                                                                <BsPencilSquare></BsPencilSquare>
                                                                            </button>
                                                                        </Link>
                                                                        <Link to={`/user-detail/${user.id}`}>
                                                                            <button type="button" className="btn btn-success btn-sm px-3" style={{ margin: "5px" }}>
                                                                                <BsFillInfoSquareFill></BsFillInfoSquareFill>
                                                                            </button>
                                                                        </Link>
                                                                    </td>
                                                                </tr>)
                                                        }
                                                    </tbody>
                                                </table>
                                                {/*Se llama al componente Table Footer para manejar la paginacion de la tabla*/}
                                                <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SearchUser