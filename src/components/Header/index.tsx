import { auth } from '../../libs/firebase'
import Button from '../Button'
import Form from '../ModalLogin/index'

interface Props {
    setUser: React.Dispatch<React.SetStateAction<string | null | undefined>>
    user: string | null | undefined
}

export default function Header ({setUser, user}: Props){
    function logout(){
        auth.signOut();
        auth.signOut().then(val =>{
            setUser(null);
        });
    }
    return (
        <header className="bg-white w-full 2xl:container xl:mx-auto py-1 shadow-md">
            <div className='w-full flex justify-around items-center'>
                <div className="w-28">
                    <img className='max-w-full' src="./omago.png" alt="" />
                </div>
                {user ? (
                    <div className='flex'>
                        <p>
                            Olá <strong>@{user}</strong>
                        </p>
                        <Button onClick={()=> logout()} value='Sair'/>
                    </div>
                ) : (
                    <div>
                        <Form setUser={setUser}/>
                    </div>
                )}
                </div>
        </header>
    )
}