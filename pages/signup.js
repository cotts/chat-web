import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

export default function Singup() {
  const [user, setUser] = useState({})
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const signUp = () => {
    axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/api/v1/user`,
      headers: {
        authorization: process.env.NEXT_PUBLIC_API_TOKEN,
      },
      data: { ...user },
    })
      .then(() => {
        setMessage('User Created, redirecing to homepage')
        setTimeout(() => router.push('/'), 5000)
      })
      .catch((error) => setError(error.response.data))
  }

  const getValue = (event, key) => {
    setError('')
    setUser({ ...user, [key]: event.target.value })
  }
  return (
    <div className={styles.container}>
      <h3> Signup</h3>
      Name: <input type="text" onChange={(event) => getValue(event, 'name')} />
      Username:{' '}
      <input type="text" onChange={(event) => getValue(event, 'username')} />
      Password{' '}
      <input
        type="password"
        onChange={(event) => getValue(event, 'password')}
      />
      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
      <button className={styles.code} onClick={() => signUp()}>
        {' '}
        Create User{' '}
      </button>
    </div>
  )
}
