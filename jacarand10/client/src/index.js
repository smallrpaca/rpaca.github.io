import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Root from './client/Root';
import { Provider } from 'mobx-react'; // Mobx에서 사용하는 Provider
import StateStore from './stores/States';

const states = new StateStore();

ReactDOM.render(
    <Provider 
        states={states}
    >
        <Root />
    </Provider>
    , 
document.getElementById('root'));

serviceWorker.register();
