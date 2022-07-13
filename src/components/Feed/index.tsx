import { useEffect, useState } from "react";
import { db } from "../../libs/firebase"
import { IFirebase } from "../../types/IFirebase";
import firebase from "firebase";

interface Props {
    user: string | null | undefined
    info: any | string
    id: string
}

export default function Feed({ user, info, id }: Props) {

    const [comentarios, setComentarios] = useState<IFirebase[]>([]);
    const [novoComentario, setNovoComentario] = useState('');
    const [showComentarios, setShowComentarios] = useState(false);

    useEffect(() => {
        db.collection('postagens').doc(id).collection('comentarios').orderBy('timePostagem', 'desc').onSnapshot(snapshot => {
            setComentarios(snapshot.docs.map(document => {
                return { id: document.id, info: document.data() }
            }))
        })
    }, []);

    function comentar(id: string, e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        db.collection('postagens')
            .doc(id)
            .collection('comentarios')
            .add({
                nome: user,
                comentario: novoComentario,
                timePostagem: firebase.firestore.FieldValue.serverTimestamp()
            })
        setNovoComentario('');

    }

    return (
        <div className="max-w-md my-2.5 mx-auto rounded-full ">
            <div className="bg-white border-gray-300 w-full border rounded-2xl">
                <div className="grid grid-cols-6 items-center p-3 border-b border-b-gray-300">
                    <div className="col-span-4 text-sm font-semibold"><strong>{info.usuario}</strong></div>
                </div>
                {info.image.includes('.mp4') || info.image.includes('.MOV') ? 
                    <video className="w-full" controls muted autoPlay>
                        <source src={info.image} type="video/mp4"/>
                    </video> : 
                    <figcaption>
                        <img src={info.image} alt="Foto da Publicação" />
                    </figcaption>
            }
                <div className="flex flex-col p-4 gap-3">
                    <div className="text-sm">
                        <span className="font-semibold">{info.usuario} </span>
                        {info.titulo.includes('http') ?
                            <a target="blank" className="text-cyan-600" href={info.titulo}>{info.titulo}</a> : 
                            <span>{info.titulo}</span>
                        }
                    </div>

                    {
                        user ?
                            <form className="flex flex-row gap-3" onSubmit={e => comentar(id, e)}>
                                <textarea className="border border-indigo-600 rounded resize-none block w-full my-2 p-2" onChange={(e) => setNovoComentario(e.target.value)} value={novoComentario} placeholder="Comente!"></textarea>
                                <button type="submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                                    </svg>
                                </button>
                            </form>
                            : null
                    }

                    {
                        comentarios.length > 0 ?
                            <>
                                <div
                                    className="cursor-pointer text-gray-500 text-sm accordion-button"
                                    onClick={() => !showComentarios ? setShowComentarios(true) : setShowComentarios(false)}
                                >{!showComentarios ? `Ver todos os ${comentarios.length} comentários` : `Ver menos`}</div>

                                {!showComentarios ? <div className="text-sm">
                                    <span className="font-semibold">{comentarios[0].info.nome} </span>
                                    {comentarios[0].info.comentario}
                                </div> : null}

                            </>
                            : null
                    }

                    {
                        showComentarios ?
                            <div>
                                {
                                    comentarios.map(val => {
                                        return (
                                            <div
                                                className="text-sm" key={val.id}>
                                                <p className="font-semibold inline">{val.info.nome} </p>
                                                {val.info.comentario}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}