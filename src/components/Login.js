import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from "react-bootstrap"
import {useAuth} from "../contexts/AuthContext";
import {Link, useHistory} from "react-router-dom"
export default function Login() {
    const emailRef=useRef()
    const passwordRef=useRef()
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)
    const {login} = useAuth()
    const history = useHistory()
    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError("")
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            history.push("/")
        }catch {
            return setError("Falha ao Logar")
        }
        setLoading(false)

    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
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
                        <Button disabled={loading} type="submit" className="w-100">Login</Button>
                        <div className="w-100 text-center mt-3">
                            <Link to="/forget-password">Esqueceu sua senha?</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Não possui conta? <Link to="/signup">Criar Conta</Link>
            </div>
        </>
    )
}


