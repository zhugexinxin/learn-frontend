import React from "react"
import Head from 'next/head'
import styles from '../../styles/Redux.module.css'
import { connect } from './ReactRedux'

@connect()
export default class Redux extends React.Component{
  render() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Redux Count</title>
          <meta name="description" content="Redux Count" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.main}>

          <div className={styles.count}>
            <button>-</button>
            <span>0</span>
            <button>+</button>
          </div>
        </div>
      </div>
    )
  }
}
