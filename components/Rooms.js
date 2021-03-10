import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { io } from 'socket.io-client'

export default function Rooms({ setRoomId, setSocket }) {
  const [roomsList, setRoomsList] = useState([])
  const socket = io(process.env.NEXT_PUBLIC_API_SERVER)

  useEffect(() => {
    socket.emit('listRooms', (callback) => {
      setRoomsList(['room1', ...callback])
    })
  }, [])

  const joinRoom = (roomId) => {
    setSocket(socket)
    socket.emit('join', roomId, () => {
      setRoomId(roomId)
    })
  }

  return (
    <div className={styles.container}>
      <h3> Rooms </h3>
      {roomsList.map((room) => {
        return (
          <p key={room} onClick={() => joinRoom(room)}>
            {room}
          </p>
        )
      })}
    </div>
  )
}
