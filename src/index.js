document.write('<h1>It works</h1>');

//var redux = require('redux');

var expect = require('expect');

const counter = (state = 0, action) => {
    if (action.type === 'INCREMENT') {
        return state + 1;
    } else if (action.type === 'DECREMENT') {
        return state - 1;
    }
    return state;
}

expect(
    counter(0, {type: 'INCREMENT'})
).toEqual(1);

expect(
    counter(1, {type: 'INCREMENT'})
).toEqual(2);

expect(
    counter(1, {type: 'DECREMENT'})
).toEqual(0);

expect(
    counter(undefined, {})
).toEqual(0);

console.log('tests passed');
