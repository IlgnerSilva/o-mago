import Header from '../components/Header/index';
import Feed from '../components/Feed/index'
import './App.css';
import { db, auth } from './../libs/firebase';
import React, { useEffect, useState } from "react";
import { IFirebase } from '../types/IFirebase';
import ModalUpload from '../components/ModalUpload/index'

function App() {
  const [user, setUser] = useState<string | null>();
  const [postagens, setPostagens] = useState<IFirebase[]>([]);

  useEffect(() =>{
    db.collection('postagens').orderBy('timePostagem', 'desc').onSnapshot((snapshot) => {
      setPostagens(snapshot.docs.map((document)=>{
        return {id: document.id, info: document.data()}
      })) 
    })
    auth.onAuthStateChanged((val) => {
      if(val !== null){
        setUser(val.displayName)
      }
    })
  }, [])

  return (
    <div className="App">
      <Header user={user} setUser={setUser}/>
      {
        postagens.map(val => {
          return (
            <Feed 
              key={val.id}
              user={user}
              info={val.info}
              id={val.id}
            />
          )
        })
      }
      <div className='mt-10'></div>
      {
        user ? 
        (
          <ModalUpload user={user} prevState={null}/>
        ) 
        : <div></div>
      }
    </div>
  );
}

export default App;
