import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from "react-bootstrap"
import {useAuth} from "../contexts/AuthContext";
import {Link, useHistory} from "react-router-dom"
export default function Signup() {
    const emailRef=useRef()
    const passwordRef=useRef()
    const passwordConfirmRef=useRef()
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)
    const {signup} = useAuth()
    const history = useHistory()
    async function handleSubmit(e){
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Senhas são diferentes")
        }
        try{
            setError("")
            setLoading(true)
           await signup(emailRef.current.value,passwordRef.current.value)
            history.push("/")
        }catch {
            return setError("Falha ao criar conta")
        }
        setLoading(false)

    }
    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Crie sua conta</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Confirme sua Senha</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button disabled={loading} type="submit" className="w-100">Criar Conta</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Já tem conta? Faça <Link to="/login">login</Link>
        </div>
        </>
    )
}


