import React, {useEffect, useState} from "react";
import {database} from '../firebase'
import {Card, Button, Alert, Row,Table} from "react-bootstrap"
import {Link, useHistory} from "react-router-dom"

export default function Dashboard() {
    function createUser() {
        database.ref('users/' + 1).set({
            nome: "teste",
            idade: "teste",
            estado_civil: "teste",
            cpf: "teste",
            cidade: "teste",
            estado: "RS"
        });
    }

     function getUsers() {
        database.ref('users/').get().then((users) => {
            console.log(users.val())
            setData(users.val())
        });
    }

    function removeUser(id) {
        database.ref('users/' + id).remove()
    }

    const [error, setError] = useState("")
    useEffect(() => {
        createUser()
        getUsers()


    }, [])
    const [data, setData] = useState([]);

    const fetchInventory = () => {
        fetch(``)
            .then(res => res.json())
            .then(json => setData(json));
    }
    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    const onEdit = (id) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
    }

    const onSave = (id) => {
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
    }
    return (
        <>
            <Row className="justify-content-end">
                <Link to="/profile" className="btn btn-primary">perfil</Link>
            </Row>
            <div className="container">
                <h1>Simple Inventory Table</h1>
                <Table clasName="striped bordered hover">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Estado Civil</th>
                        <th>CPF</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th><button
                            className={"btn-success"}
                            onClick={() => onSave()}
                        >
                            Save
                        </button></th>
                    </tr>
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Estado Civil</th>
                        <th>CPF</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>

                    </thead>
                    <tbody>
                    {
                        data.map((item,index) => (
                            <tr key={index}>
                                <td>{item.nome}</td>
                                <td>{item.idade}</td>
                                <td>
                                    {
                                        inEditMode.status && inEditMode.rowKey === index ? (
                                            <input value={item.estado_civil}/>
                                        ) : (
                                            item.estado_civil
                                        )
                                    }
                                </td>
                                <td>{item.cpf}</td>
                                <td>{item.cidade}</td>
                                <td>{item.estado}</td>
                                <td>
                                    {
                                        inEditMode.status && inEditMode.rowKey === index ? (
                                            <>
                                                <button
                                                    className={"btn-success"}
                                                    onClick={() => onSave(index)}
                                                >
                                                    Save
                                                </button>

                                                <button
                                                    className={"btn-secondary"}
                                                    style={{marginLeft: 8}}
                                                    onClick={() => onCancel()}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className={"btn-primary"}
                                                onClick={() => onEdit(index)}
                                            >
                                                Edit
                                            </button>
                                        )
                                    }
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
        </>
    )


}