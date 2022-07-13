import React, { useState } from 'react';
import Button from '../Button/index';
import Swal from 'sweetalert2';
import { auth } from "../../libs/firebase";
import ModalCriarConta from '../ModalCriarConta/index'

interface Props {
    setUser: React.Dispatch<React.SetStateAction<string | null | undefined>>
}

export default function ModalLogin({ setUser }: Props) {

    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');

    const [showModal, setShowModal] = useState(false);

    function logar(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, senha)
            .then((auth) => {
                setUser(auth.user?.displayName);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Logado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch((err) => {
                Swal.fire('Opps!', err.message, 'error')
            })

    }

    return (
        <div className='flex'>
            <Button type="button" value="Entrar!" onClick={() => setShowModal(true)} />
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-sm">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Crie sua conta!
                                    </h3>
                                </div>

                                {/*body*/}
                                <div className="w-full">
                                    <form className='bg-white rounded-md shadow-2xl p-5' onSubmit={(e) => logar(e)}>
                                        <div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl'>
                                            <input onChange={e => setEmail(e.target.value)} id='a' value={email} className='pl-2 w-full outline-none border-none' type="email" placeholder="e-mail" />
                                        </div>
                                        <div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl'>
                                            <input onChange={e => setSenha(e.target.value)} id='emailLogin' value={senha} className='pl-2 w-full outline-none border-none' type="password" placeholder="senha" />

                                        </div>
                                        <Button className='block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2'
                                            type='submit' value='Entrar' />
                                    </form>
                                </div>

                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <Button className="absolute top-0 -right-0 border-2 rounded-full border-red-500 text-red-500 background-transparent font-bold uppercase py-0.5 px-2" type="button" value="X" onClick={() => setShowModal(false)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            <ModalCriarConta />
        </div>
    )
}