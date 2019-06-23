import { observable, action } from 'mobx';

class OnOffStore {

    /* 시작 : Meet 페이지 store */
    @observable
    value = false;

    @action
    OnOff = () => {
        this.value === false ? 
            this.value = true : 
            this.value = false;
    }

    /* 끝 : Meet 페이지 store */
}

export default OnOffStore;