import React, { useEffect, useState, useRef } from 'react'
import Message from './Message'
import styles from '../styles/Home.module.css'
import axios from 'axios'

export default function Chat({ socket, roomId, user }) {
  let ends
  const messageRef = useRef(null)
  const [messageInput, setMessageInput] = useState({})

  const [messages, setMessages] = useState([])

  const sendMessage = () => {
    socket.emit(roomId, messageInput)
    // setMessageInput({ message: '' })
  }

  useEffect(() => {
    axios({
      method: 'GET',
      headers: {
        authorization: process.env.NEXT_PUBLIC_API_TOKEN,
      },
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/api/v1/message/${roomId}`,
    }).then((data) => {
      console.log(data.data)
      setMessages(data.data)
    })

    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      })
    }
  }, [])

  useEffect(() => {
    socket.on('message', (response) => {
      const latestMessages = [...messages]
      if (messages.length > 50) latestMessages.shift()
      setMessages([...latestMessages, response])
      setMessageInput({
        message: '',
        roomId: roomId,
        sender: user._id,
        from: user.name,
      })
    })

    ends.scrollIntoView({ behavior: 'instant' })
  })

  const getMessage = (event) => {
    setMessageInput({
      message: event.target.value,
      roomId: roomId,
      sender: user._id,
      from: user.name,
    })
  }

  return (
    <>
      <div className={styles.box}>
        <p className={styles.title}>Chat </p>
        <div className={styles.chatList}>
          {messages.map((msgObject) => (
            <Message
              msgObject={msgObject}
              userId={user._id}
              key={msgObject._id}
            />
          ))}
          <br
            ref={(el) => {
              ends = el
            }}
          />
        </div>
        <div className={styles.input}>
          <input
            className={styles.text}
            type="text"
            value={messageInput.message}
            onChange={(event) => getMessage(event)}
          ></input>{' '}
          <button className={styles.send} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  )
}
