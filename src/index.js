var Redux = require('redux');

var React = require('react');
var ReactDOM = require('react-dom');

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
            return Object.assign({}, currentState, {
                radius: action.radius
            });
            break;
        case 'locationChange':
            return Object.assign({}, currentState, {
                center: action.location //TODO compute center based on location
            });
            break;
        case 'timeIncrement':
            return Object.assign({}, currentState, {
                duration: currentTime() - currentState.startTime
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
        <h1>{duration} seconds passed</h1>
    </div>
);

const render = () => {
    ReactDOM.render(
        <DurationView
            duration={store.getState().duration}
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();

setInterval(() => {
    store.dispatch( {type: 'timeIncrement'} );
}, 500);
