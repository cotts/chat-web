import React from 'react'
import styles from '../styles/Home.module.css'
import { format } from 'date-fns'

export default function Message({ userId, msgObject }) {
  const { name, message, createdAt } = msgObject

  const messageStyle =
    msgObject.sender === userId
      ? styles.myMessage
      : msgObject.bot
      ? styles.botMessage
      : styles.otherMessage
  return (
    <div className={messageStyle}>
      <p>{name}</p>
      <p>{message}</p>
      <p>{format(new Date(createdAt), 'hh:mm @ MM-dd-yyyy')}</p>
    </div>
  )
}
