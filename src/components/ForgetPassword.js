import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from "react-bootstrap"
import {useAuth} from "../contexts/AuthContext";
import {Link, useHistory} from "react-router-dom"
export default function Login() {
    const emailRef=useRef()
    const [error,setError] = useState("")
    const [message,setMessage] = useState("")
    const [loading,setLoading] = useState(false)
    const {resetPassword} = useAuth()
    const history = useHistory()
    async function handleSubmit(e){
        e.preventDefault()

        try{
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Cheque sua caixa de email')

        }catch {
            return setError("Erro ao recuperar senha")
        }
        setLoading(false)

    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Esqueceu sua senha</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} type="submit" className="w-100">Recuperar</Button>

                    </Form>
                </Card.Body>
            </Card>

        </>
    )
}


