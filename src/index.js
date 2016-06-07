document.write('<h1>It works</h1>');

var redux = require('redux');

var expect = require('expect');

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

const store = redux.createStore(counter);

const render = () => {
    document.body.innerText = store.getState();
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' });
});

setInterval( () => {
    store.dispatch( { type: 'DECREMENT' } )
}, 3000);
