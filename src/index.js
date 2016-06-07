var Redux = require('redux');

var React = require('react');
var ReactDOM = require('react-dom');

const currentTime = () => Math.floor(Date.now() / 1000);

var startState = {
    radius: 300, // 300m fixed radius
    center: [
        59.944250, 10.723387 // Oslo house fixed center
    ],
    startTime: currentTime(),
    time: 0
};

const changeState = (currentState, action) => {
    var newState = {
        radius: currentState.radius,
        center: currentState.center,
        time: currentState.time
    };
    switch (action.type) {
        case 'radius-change':
            newState.radius = action.radius;
            break;
        case 'location-change':
            newState.center = action.location; //TODO compute location
            break;
        case 'time-increment':
            newState.time = currentTime - currentState.startTime;
            break;
    }
    return newState;
}

const counter = (state = 0, action) => {
    if (action.type === 'INCREMENT') {
        return state + 1;
    } else if (action.type === 'DECREMENT') {
        return state - 1;
    }
    return state;
}

const store = Redux.createStore(counter);

const Counter = ({
    value,
    onIncrement,
    onDecrement
}) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
);

const render = () => {
    ReactDOM.render(
        <Counter
            value={store.getState()}
            onIncrement={() =>
                store.dispatch({
                    type: 'INCREMENT'
                })
            }
            onDecrement={() =>
                store.dispatch({
                    type: 'DECREMENT'
                })
            }
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();
