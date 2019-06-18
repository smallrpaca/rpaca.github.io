import { observable, action }from 'mobx';

class State {
    @observable user = null;
    @observable message = null;

    @action
    setUser = (val) => {
        this.user = val;
    }

    @action
    setMessage = (val) => {
        this.message = val;
    }
}

export default State;