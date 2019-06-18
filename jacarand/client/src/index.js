import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Root from './client/Root';
import { Provider } from 'mobx-react'; // Mobx에서 사용하는 Provider
import OnOffStore from './stores/OnOff';
import State from './stores/State';

const onoff = new OnOffStore();
const state = new State();

ReactDOM.render(
    <Provider 
        onoff={onoff}
        state={state}
    >
        <Root />
    </Provider>
    , 
document.getElementById('root'));

serviceWorker.register();
