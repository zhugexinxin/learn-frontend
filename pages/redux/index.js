import React from "react"
import Count from './Count'
import { Provider } from './ReactRedux'
import { createStore, applyMiddleware } from './MyRedux'
import { counter } from './action'

export default class Redux extends React.Component{
  render() {
    const store = createStore(counter)

    return (
      <Provider value={store}>
        <Count />
      </Provider>
    )
  }
}
