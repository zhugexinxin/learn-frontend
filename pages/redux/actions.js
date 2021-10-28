export function add(){
  return { type: 'Add' }
}

export function minus(){
  return { type: 'Minus' }
}

export function counter(state = 0, action) {
  switch (action.type) {
    case 'Add':
      return state + 1
    case 'Minus':
      return state - 1
    default:
      return 0
  }
}
