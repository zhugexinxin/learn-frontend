import React from "react"
import Head from 'next/head'
import styles from '../../styles/Redux.module.css'
import { connect } from './ReactRedux'
import { add } from './actions'

// 装饰器模式
@connect(
  state => state,
  { add, minus },
)
export default class Redux extends React.Component{
  render() {
    const {
      state: count,
      add,
      minus,
    } = this.props

    return (
      <div className={styles.container}>
        <Head>
          <title>Redux Count</title>
          <meta name="description" content="Redux Count" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.main}>

          <div className={styles.count}>
            <button onClick={minus}>-</button>
            <span>{count}</span>
            <button onClick={add}>+</button>
          </div>
        </div>
      </div>
    )
  }
}
