import { createStore } from 'redux';

function userState(state, action) {
  switch (action.type) {
    case 'SET_STATE':
      return Object.assign({}, state, {
        'isLogginIn': action.values.isLogginIn  || false,
        'user': action.values.user || null,
        'books': action.values.books || []
      })    
  }
}

export let store = createStore(userState)

