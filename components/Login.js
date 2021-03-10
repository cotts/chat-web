import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Login({ user, setLogged, setUser }) {
  const router = useRouter()
  const [login, setLogin] = useState({})
  const [error, setError] = useState('')

  const getValue = (event, key) => {
    setError('')
    setLogin({ ...login, [key]: event.target.value })
  }

  const signin = async () => {
    await axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/api/v1/user/login`,
      headers: {
        authorization: process.env.NEXT_PUBLIC_API_TOKEN,
      },
      data: { ...login },
    })
      .then((data) => {
        setUser(data.data)
        setLogged(true)
      })
      .catch((error) => setError(error.response.data))
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.title}> Signin </h3>
      <input
        type="text"
        placeholder="username"
        onChange={(event) => getValue(event, 'username')}
        className={styles.description}
      ></input>
      <input
        type="password"
        placeholder="password"
        onChange={(event) => getValue(event, 'password')}
        className={styles.description}
      ></input>
      <div className={styles.error}>{error && <p>{error}</p>}</div>
      <div className={styles.grid}>
        <button className={styles.code} onClick={() => signin()}>
          {' '}
          Login{' '}
        </button>
        <button className={styles.code} onClick={() => router.push('/signup')}>
          Sign Up
        </button>
      </div>
    </div>
  )
}
