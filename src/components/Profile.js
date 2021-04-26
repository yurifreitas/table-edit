import React, { useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import {Card, Button, Alert} from "react-bootstrap"
import {Link,useHistory} from "react-router-dom"
export default function Profile(){

    const [error,setError] = useState("")
    const {currentUser,logout} = useAuth()
    const history = useHistory()

    async function handleLogout(){
        setError("")
        try{
            await logout()
            history.push("/login")
        }catch {
            setError("Falha ao sair")
        }
    }
    return (
        <>
            <Card>
                <Link to="/" className="btn btn-primary w-100 mb-3">Home</Link>
                <Card.Body>
                    <h2 className="text-center mb-4">Perfil</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email: </strong>{currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Atualizar perfil</Link>
                </Card.Body>

            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Sair</Button>
            </div>
        </>
    )


}