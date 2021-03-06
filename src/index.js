const Redux = require('redux');
const React = require('react');
const ReactDOM = require('react-dom');
const Moment = require('moment');

const currentTime = () => Math.floor(Date.now() / 1000);

const startState = {
    radius: 300, // 300m fixed radius
    center: [
        59.944250, 10.723387 // Oslo house fixed center
    ],
    startTime: currentTime(),
    duration: 0
};

const changeState = (currentState = startState, action) => {
    switch (action.type) {
        case 'radiusChange':
            // this is ES6 way of creating a copy of a new object with only
            // one property changed. Here it returns currentState with
            // currentState.radius set to action.radius
            return Object.assign({}, currentState, {
                radius: action.radius
            });
            break;
        case 'locationChange':
            return Object.assign({}, currentState, {
                center: action.location //TODO compute center based on location
            });
            break;
        case 'timeChange':
            return Object.assign({}, currentState, {
                duration: action.duration
            });
            break;
    }
    return currentState;
}

const store = Redux.createStore(changeState);

const DurationView = ({
    duration
}) => (
    <div>
        <h1>You have opened this page for {duration}</h1>
    </div>
);

const render = () => {
    ReactDOM.render(
        <DurationView
            duration={Moment.duration(store.getState().duration, "seconds").humanize()}
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();

setInterval(() => {
    store.dispatch( {type: 'timeChange', duration: currentTime() - store.getState().startTime} );
}, 1000);
