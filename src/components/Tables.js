import React, {useState, useEffect} from 'react';
import {forwardRef} from 'react';
import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid'
import "./style.css"
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Alert from '@material-ui/lab/Alert';
import {database} from "../firebase";
import {Link} from "react-router-dom";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};


function Tables() {

    var columns = [
        {title: "id", field: "id", hidden: true},
        {
            title: "Avatar",
            render: rowData => <Avatar maxInitials={1} size={40} round={true}
                                       name={rowData === undefined ? " " : rowData.first_name}/>
        },
        {title: "Nome", field: "nome"},
        {title: "Idade", field: "idade"},
        {title: "Estado Civil", field: "estado_civil"},
        {title: "CPF", field: "cpf"},
        {title: "Estado", field: "estado"},
        {title: "Cidade", field: "cidade"},
    ]
    const [data, setData] = useState([]); //table data

    //for error handling
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    function getUsers() {
        database.ref('users/').get().then((users) => {
            var users_list = users.val()
            var list = []

            if (users_list !== null) {
                console.log(users_list)
                var index = 0
                Object.entries(users_list).forEach(([key, value]) => {

                    users_list[key]["id"] = index;
                    users_list[key]["avatar"] = "https://reqres.in/img/faces/6-image.jpg";
                    list[index] = users_list[key]
                    index++
                });
                setData(list)
            }
        });
    }

    useEffect(() => {
        getUsers()
    }, [])

    const handleRowUpdate = (newData, oldData, resolve) => {
        //validation
        let errorList = []
        if (newData.nome === "") {
            errorList.push("Digite o nome")
        }
        if (newData.idade === "") {
            errorList.push("Digite a idade")
        } else {
            if (isNaN(newData.idade)) {
                errorList.push("Idade deve conter apenas numeros")
            } else if (newData.idade.length > 2) {
                errorList.push("Idade invalida")
            }

        }
        if (newData.estado_civil === "") {
            errorList.push("Digite o estado civil")
        }
        if (newData.cpf === "") {
            errorList.push("Digite o cpf")
        } else {
            if (isNaN(newData.cpf)) {
                errorList.push("cpf deve conter apenas numeros")
            } else if (newData.cpf.lengthn !== 11) {
                errorList.push("cpf invalido")
            }
        }
        if (newData.estado === "") {
            errorList.push("Digite o estado")
        }
        if (newData.cidade === "") {
            errorList.push("Digite a cidade")
        }

        if (errorList.length < 1) {
            database.ref('users/item' + newData.id).set(newData).then(() => {
                getUsers()
                resolve()
                setErrorMessages([])
                setIserror(false)
            }).catch(() => {

            });
        } else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()

        }

    }

    const handleRowAdd = (newData, resolve) => {
        //validation
        let errorList = []
        if (newData.nome === "") {
            errorList.push("Digite o nome")
        }
        if (newData.idade === "") {
            errorList.push("Digite a idade")
        } else {
            if (isNaN(newData.idade)) {
                errorList.push("Idade deve conter apenas numeros")
            } else if (newData.idade.length > 2) {
                errorList.push("Idade invalida")
            }

        }
        if (newData.estado_civil === "") {
            errorList.push("Digite o estado civil")
        }
        if (newData.cpf === "") {
            errorList.push("Digite o cpf")
        } else {
            if (isNaN(newData.cpf)) {
                errorList.push("cpf deve conter apenas numeros")
            } else if (newData.cpf.length !== 11) {
                errorList.push("cpf invalido")
            }
        }
        if (newData.estado === "") {
            errorList.push("Digite o estado")
        }
        if (newData.cidade === "") {
            errorList.push("Digite a cidade")
        }


        if (errorList.length < 1) { //no error
            var length_user = data.length

            database.ref('users/item' + length_user).set(newData).then(() => {
                getUsers()
                resolve()
                setErrorMessages([])
                setIserror(false)
            }).catch(() => {

            });

        } else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
        }


    }

    const handleRowDelete = (oldData, resolve) => {
        database.ref('users/item' + oldData.id).remove().then(() => {
            getUsers()
            resolve()
        })
            .catch(error => {
                setErrorMessages(["Delete failed! Server error"])
                setIserror(true)
                resolve()
            })
    }


    return (
        <div className="App">
            <Link to="/profile" className="btn btn-primary w-100 mb-3">Perfil</Link>
            <Grid container spacing={1}>
                <Grid item>
                    <div>
                        {iserror &&
                        <Alert severity="error">
                            {errorMessages.map((msg, i) => {
                                return <div key={i}>{msg}</div>
                            })}
                        </Alert>
                        }
                    </div>
                    <MaterialTable
                        title="Lista de Usuarios"
                        columns={columns}
                        data={data}
                        icons={tableIcons}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                    handleRowUpdate(newData, oldData, resolve);

                                }),
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                    handleRowAdd(newData, resolve)
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    handleRowDelete(oldData, resolve)
                                }),
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default Tables;