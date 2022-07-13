import React, { useState } from 'react';
import Button from '../Button/index';
import Swal from 'sweetalert2';
import { auth, storage, db } from "./../../libs/firebase";
import ModalCriarConta from '../ModalCriarConta/index'

interface Props {
    setUser: React.Dispatch<React.SetStateAction<string | null | undefined>>
    user: string | null | undefined
}

export default function Form({ user, setUser }: Props) {

    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');

    function logar(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, senha)
            .then((auth) => {
                setUser(auth.user?.displayName);
                Swal.fire('Ok', 'Logado com sucesso!', 'success')
            }).catch((err) => {
                Swal.fire('Opps!', err.message, 'error')
            })

    }

    return (
        <>
            <form onSubmit={(e) => logar(e)}>
                <input onChange={e => setEmail(e.target.value)} id='a' value={email} className='border-solid border-2 border-indigo-600 px-1.5 rounded mx-px' type="email" placeholder="e-mail" />
                <input onChange={e => setSenha(e.target.value)} id='emailLogin' value={senha} className='border-solid border-2 border-indigo-600 px-1.5 rounded mx-px' type="password" placeholder="senha" />
                <Button type='submit' value='Entrar' />
            </form>
            <ModalCriarConta />
        </>
    )
}