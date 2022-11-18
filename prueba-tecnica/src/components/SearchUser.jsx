import React, { useState, useEffect } from "react";
import { backendApi } from "../hooks/axiosBase";
import useFetch from "../hooks/useFetch";
import { Avatar } from '@material-ui/core'
import { BsTrashFill, BsPencilSquare, BsFillInfoSquareFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import axios from "axios";

const SearchUser = () => {

    const [users, setusers] = useState([]);
    const [search, setSearch] = useState("");
    const { response: usersApi, isLoading } = useFetch({
        api: backendApi,
        method: "get",
        url: "/user",
    });



    useEffect(() => {
        if (!isLoading) {
            setusers([...usersApi.data]);
        }
    }, [isLoading]);
    
    const searcher = (e) =>{
        setSearch(e.target.value)
    }

    const results = !search ? users : users.filter((user) => user.firstName.toLowerCase().includes(search.toLowerCase()) || user.lastName.toLowerCase().includes(search.toLowerCase()) )

    async function onSubmit (e) {
        let urldelete = "https://dummyapi.io/data/v1/user/" + e;
        let config = {
            headers: {
                'app-id' : '63473330c1927d386ca6a3a5'
            }  
        }
        axios.delete(urldelete,config)
        window.location.href = "/"
    }

    return (
        <div>
            <div className="container">
            <form className="form-inline">
                <div className="row">
                    <div className="col">
                        <input value={search} onChange={searcher} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    </div>
                    <div className="col">
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Crear Usuario</button>
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
                                                            results.map((user, key) =>
                                                                <tr>
                                                                    <td><a href={`/user/${user.id}`}> {user.id} </a></td>
                                                                    <td>{user.title + ". " + user.firstName + " " + user.lastName}</td>
                                                                    <td><Avatar alt="Remy Sharp" src={user.picture} /></td>
                                                                    <td >
                                                                        <button onClick={() => onSubmit(user.id)} type="button" className="btn btn-danger btn-sm px-3" style={{ margin: "5px" }}>
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