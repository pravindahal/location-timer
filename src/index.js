//var redux = require('redux');

var startState = {
    'radius': 300, // 300m fixed radius
    'center': [
        59.944250, 10.723387 // Oslo house fixed center
    ],
    'time': 0
};

function getState(currentState, property, value)
{
    var newState = {
        'radius': currentState.radius,
        'center': currentState.center,
        'time': currentState.time
    };
    if (property !== undefined) {
      newState[property] = value;
    }
    return newState;
}

function counter(state = 0, action) {
    return state;
}

expect(
    counter(0, {type: 'INCREMENT'})
).toEqual(1);

document.write('<h1>It works</h1>');
