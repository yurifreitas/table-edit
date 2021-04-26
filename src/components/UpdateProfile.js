import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from "react-bootstrap"
import {useAuth} from "../contexts/AuthContext";
import {Link, useHistory} from "react-router-dom"
export default function UpdateProfile() {
    const emailRef=useRef()
    const passwordRef=useRef()
    const passwordConfirmRef=useRef()
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)
    const {currentUser,updatePassword,updateEmail} = useAuth()
    const history = useHistory()
    function handleSubmit(e){
        e.preventDefault()
        setError("")
        setLoading(true)
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Senhas são diferentes")
        }
        if(passwordRef.current.value) {
            if(passwordRef.current.value.length < 6) {
                return setError("Senhas deve conter no minimo 6 caracteres")
            }
        }

        const promises = []
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))

        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))

        }
        Promise.all(promises).then(()=>{
            history.push("/")
        }).catch(()=>{
            setError("Falha ao Atualizar os dados")
        }).finally(()=>{
            setLoading(false)
        })



    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Atualizar Perfil</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Deixe em branco para manter igual" ref={passwordRef} />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Confirme sua Senha</Form.Label>
                            <Form.Control type="password"  placeholder="Deixe em branco para manter igual" ref={passwordConfirmRef} />
                        </Form.Group>
                        <Button disabled={loading} type="submit" className="w-100">Atualizar</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/">Cancelar</Link>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}


