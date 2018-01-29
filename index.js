import React from 'react';
import ReactDOM from 'react-dom';
import { createStore} from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux'
// Tip To ensure we have access to the connect() make sure we have import { connect } from "react-redux"; at the top of our JS file.

const initialState = {
  count: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'INCREMENTFIVE':
      return { ...state, count: state.count + 5 };
    case 'INCREMENTTEN':
      return { ...state, count: state.count + 10 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'RESET':
      return { ...state, count: state.count = 0 }
    default:
      return state;
  }
};

// To use connect(), we need to define a function called mapStateToProps that will let us pass part of our state as a prop to our components.
const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}
// If we add this to our code under our reducer we now have a way to pass the count object in our state to a component. We can think of mapStateToProps() as our read permissions.

// mapDispatchToProps allows us to attach actions in our reducer to the piece of state that we are passing to our component as a prop. We can think of mapDispatchToProps() as our write permissions.
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => dispatch({type: 'INCREMENT'}),
    onIncrementFive: () => dispatch({type: 'INCREMENTFIVE'}),
    onIncrementTen: () => dispatch({type: 'INCREMENTTEN'}),
    onDecrement: () => dispatch({type: 'DECREMENT'}),
    onReset: () => dispatch({type: 'RESET'})
  }
}

// function onIncrement() {
//   return { type: 'INCREMENT' }
// }
//
// function onDecrement() {
//   return { type: 'DECREMENT' }
// }
//
// function onReset() {
//   return { type: 'RESET' }
// }

// We will put this code under our mapStateToProps. Now that we have each of our pieces, we need to connect these with the connect() function.
const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps);
// const ConnectedCounter = connect(mapStateToProps, { onIncrement, onDecrement, onReset })(Counter)

const store = createStore(reducer);

console.log('State at start: ', store.getState());

store.subscribe(() =>
  console.log('Change after "change listener": ', store.getState())
);

const Counter = ({ value, onIncrement, onIncrementFive, onIncrementTen, onDecrement, onReset }) => (
  <div>
  <h1>{value.store}</h1>
  <button onClick={onIncrement}>+</button>
  <button onClick={onIncrementFive}>+5</button>
  <button onClick={onIncrementTen}>+10</button>
  <button onClick={onReset}>Reset</button>
  <button onClick={onDecrement}>-</button>
  </div>
);

ReactDOM.render(
  <Counter
  // I cannot figure out how to display the updated value
  value={ store.getState() }
  onIncrement={ () => store.dispatch({ type: 'INCREMENT' }) }
  onIncrementFive={ () => store.dispatch({ type: 'INCREMENTFIVE' }) }
  onIncrementTen={ () => store.dispatch({ type: 'INCREMENTTEN' }) }
  onDecrement={ () => store.dispatch({ type: 'DECREMENT' }) }
  onReset={ () => store.dispatch({ type: 'RESET' }) }
  />,
  // <ConnectedCounter />,
  document.getElementById('root')
);

// ReactDOM.render(
//   <Provider store={store}>
//   <ConnectedCounter/>
//   </Provider>,
//   document.getElementById('root')
// );
