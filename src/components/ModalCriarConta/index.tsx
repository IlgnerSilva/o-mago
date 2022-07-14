import { useState } from "react";
import Swal from "sweetalert2";
import { auth } from "../../libs/firebase";
import Button from "../Button";

export default function ModalCriarConta() {
    const [showModal, setShowModal] = useState(false);

    const [email, setEmail] = useState<string>('');
    const [usuario, setUsuario] = useState<string>('');
    const [senha, setSenha] = useState<string>('');

    function criarConta(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, senha)
            .then((authUser) => {
                authUser.user?.updateProfile({
                    displayName: usuario
                })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Usuário criado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setShowModal(false);
            }).catch(err => {
               Swal.fire('Erro', err.message, 'error')
            })
    }

    return (
        <>
            <Button type="button" value="Criar conta!" onClick={() => setShowModal(true)} />
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
                                <div className="relative p-6 flex-auto ">
                                    <form onSubmit={(e) => criarConta(e)}>
                                        <input onChange={e => setEmail(e.target.value)}
                                            className='m-1 p-1 w-full rounded-md border-solid border-2 border-indigo-600'
                                            type="email"
                                            placeholder="e-mail" />

                                        <input onChange={e => setUsuario(e.target.value)}
                                            className='m-1 p-1 w-full rounded-md border-solid border-2 border-indigo-600'
                                            type="text"
                                            placeholder="usuário" />

                                        <input onChange={e => setSenha(e.target.value)}
                                            className='m-1 p-1 w-full rounded-md border-solid border-2 border-indigo-600'
                                            type="password"
                                            placeholder="senha" />

                                        <Button className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit" value="Criar" />
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
        </>
    );
}