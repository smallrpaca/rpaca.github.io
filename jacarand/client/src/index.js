import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Root from './client/Root';
import { Provider } from 'mobx-react'; // Mobx에서 사용하는 Provider
import OnOffStore from './stores/OnOff';
import StateStore from './stores/States';

const onoff = new OnOffStore();
const states = new StateStore();

ReactDOM.render(
    <Provider 
        onoff={onoff}
        states={states}
    >
        <Root />
    </Provider>
    , 
document.getElementById('root'));

serviceWorker.register();
