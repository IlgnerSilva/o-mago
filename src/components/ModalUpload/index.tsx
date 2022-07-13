import { ChangeEvent, useState } from "react";
import Swal from 'sweetalert2';
import Button from "../Button/index";
import firebase from "firebase/app";
import { auth, storage, db } from "../../libs/firebase";

interface Props {
    user: string | null | undefined
    prevState: null
}

export default function ModalUpload({ user }: Props){
    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState(0);
    const [tituloPostagem, setTituloPostagem] = useState('');
    const [arquivo, setArquivo] = useState<FileList | any>(null)
    
    function uploadPostagem(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        try{
            const upload = storage.ref(`image/${arquivo[0].name}`).put(arquivo[0])
            if(arquivo[0].size > 1048576){
                throw new Error('Só é possível uploade de fotos/videos de até 1mb')
            }

            upload.on("state_change", snapshot => {
                const progresso = Math.round(snapshot.bytesTransferred/snapshot.totalBytes) * 100;
                setProgress(progresso);
            }, err =>{
                alert(err);
            }, ()=>{
                storage.ref("image")
                    .child(arquivo[0].name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection('postagens')
                            .add({
                                titulo: tituloPostagem,
                                image: url,
                                usuario: user,
                                timePostagem: firebase.firestore.FieldValue.serverTimestamp()
                            });
                        setProgress(0);
                        setArquivo(null);
    
                        setTimeout(()=>{}, 2000);
    
                        setShowModal(false)
                    })
            })
        }catch(err: any){
            Swal.fire('Arquivo muito grande!', err.message, 'error');
        }
    }

    return (
        <div className="w-full bg-white rounded-b-md p-2 fixed bottom-0 flex justify-center border-t border-indigo-600">
            <Button type="button" value="Publicar" onClick={() => setShowModal(true)} />
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-sm">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Upload
                                    </h3>
                                </div>

                                {/*body*/}
                                <div className="relative p-6 flex-auto ">
                                    <form id="form-upload" onSubmit={e => uploadPostagem(e)}>
                                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                                            <progress style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"></progress>
                                        </div>

                                        <input onChange={e => setTituloPostagem(e.target.value)}
                                            className='m-1 p-1 w-full rounded-md border-solid border-2 border-indigo-600'
                                            type="text"
                                            placeholder="Título da postagem..." />

                                        <input onChange={e => setArquivo(e.target.files)}
                                            className='m-1 p-1 w-full rounded-md border-solid border-2 border-indigo-600'
                                            type="file" />

                                        <Button className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit" value="Postar" />
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
        </div>
    );
 }