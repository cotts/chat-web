import React, { useState} from 'react'
import Login from '../components/Login'
import Rooms from '../components/Rooms'
import Chat from '../components/Chat'




export default function Home(){
  
  const [user, setUser ] = useState({})
  const [isLogged, setLogged] = useState(false)
  const [roomId, setRoomId] = useState('')
  const [socket, setSocket ] = useState()
    
  if(!isLogged) return <Login setLogged={setLogged} user={user} setUser={setUser}/> 
  
  if(!roomId) return <Rooms setRoomId={setRoomId} setSocket={setSocket}/>
  
  return (
    <Chat roomId={roomId} socket={socket} user={user}/>
  )
}
