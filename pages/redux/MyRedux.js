export function createStore(reducer, enhancer){
	if (enhancer) {
    // #1 增强函数 其实就是applyMiddleware
		return enhancer(createStore)(reducer)
	}

	const state = {}
	const listeners = []

	const getState = () => {
		return state
	}

	const subscribe = (listener) => {
		listeners.push(listener)
	}

	const dispatch = (action) => {
		state = reducer(state, action)
		listeners.forEach(listener => listener())
		return action
	}

	dispatch({
    type:'@HelloReader/Start'
  })

	return {
    getState,
    subscribe,
    dispatch,
  }
}

export function applyMiddleware(...middlewares){
  // #2 这一步很重要，可以时初始化以这个api开始
	return createStore=>(...args)=>{
		const store = createStore(...args)
		let dispatch = store.dispatch

		const middlewareAPI = {
			getState: store.getState,
      // 源码会解构action，个人觉得没什么必要
			dispatch: (...args) => dispatch(...args)
		}
		const newMiddlewares = middlewares.map(middleware => middleware(middlewareAPI))
    // 函数编程的compose，组合函数
		dispatch = compose(...newMiddlewares)(store.dispatch)

		return {
			...store,
			dispatch,
		}
	}
}

export function compose(...funcs){
	if (funcs.length === 0) {
		return arg => arg
	}

	if (funcs.length==1) {
		return funcs[0]
	}

  // koa洋葱模式
	return funcs.reduce((preFunc, curFunc) => (...args) => preFunc(curFunc(...args)))
}

// action是个纯哈希，不包装传入组件是没意义的
function bindActionCreator(action, dispatch){
	return (...args) => dispatch(action(...args))
}
export function bindActionCreators(actions, dispatch){
	return Object.keys(actions).reduce((pre, cur)=>{
		pre[cur] = bindActionCreator(actions[cur], dispatch)
		return pre
	}, {})
}
