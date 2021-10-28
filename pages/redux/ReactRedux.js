import React from "react"

export const ReactContext = React.createContext({});

export class Provider extends React.Component {
  render() {
    const { store, children } = this.props

    return (
      <ReactContext.Provider value={store}>
        {children}
      </ReactContext.Provider>
    )
  }
}

class ConnectComponent extends React.Component {
  state = {
    props: {}
  }

  componentDidMount(){
    const { store } = this.props
    store.subscribe(() => this.update())
    this.update()
  }

  update(){
    const { store, mapStateToProps, mapDispatchToProps, WrapComponent } = this.props
    const stateProps = mapStateToProps(store.getState())
    const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
    this.setState({
      props:{
        ...this.state.props,
        ...stateProps,
        ...dispatchProps
      }
    })
  }

  render(){
    const { WrapComponent } = this.props

    return (
      <ReactContext.Consumer>
        <WrapComponent {...this.state.props} />
      </ReactContext.Consumer>
    )
  }
}

export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps = {}
)=>(WrapComponent)=>{
  return (
    <ReactContext.Consumer>
      {(value) => (
        <ConnectComponent
          {...value}
          mapStateToProps={mapStateToProps}
          mapDispatchToProps={mapDispatchToProps}
          WrapComponent={WrapComponent}
        />
      )}
    </ReactContext.Consumer>
  )
}
