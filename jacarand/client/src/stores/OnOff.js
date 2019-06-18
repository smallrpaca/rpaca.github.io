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

    @observable
    genderValue = false;

    @action
    genderOnOff = () => {
        this.genderValue === false ? 
            this.genderValue = true : 
            this.genderValue = false;
    }

    @observable
    interestValue = false;

    @action
    interestOnOff = () => {
        this.interestValue === false ? 
            this.interestValue = true : 
            this.interestValue = false;
    }

    @observable
    genderFemaleValue = false;

    @action
    genderFemaleOnOff = () => {
        this.genderFemaleValue === false ? 
            this.genderFemaleValue = true : 
            this.genderFemaleValue = false;
    }

    @observable
    genderMaleValue = false;

    @action
    genderMaleOnOff = () => {
        this.genderMaleValue === false ? 
            this.genderMaleValue = true : 
            this.genderMaleValue = false;
    }
    /* 끝 : Meet 페이지 store */

    /* 시작 : Chat 페이지 store */
    
    @observable
    topBtnValue = false;

    @action
    setTopBtn = () => {
        this.topBtnValue === false ?
            this.topBtnValue = true :
            this.topBtnValue = false;
    }

    /* 끝 : Chat 페이지 store */
}

export default OnOffStore;