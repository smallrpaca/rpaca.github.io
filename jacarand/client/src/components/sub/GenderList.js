import React, { Component } from 'react';
import './css/GenderList.css';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';

@inject('onoff')
@observer
class GenderList extends Component {
    render() {
        const { onoff } = this.props;
        return (
        <div className="GenderList">
                <div>
                    WishGender
                </div>
            <div className="main">
                <div className="select">
                    <input type="radio" 
                        name="wishGender"
                        id="female" 
                        className="female" 
                    />
                    <label htmlFor="female" onClick={onoff.genderFemaleOnOff}>Female</label>
                </div>
                <div className="select">
                    <input type="radio"
                        name="wishGender" 
                        id="male" 
                        className="male" 
                    />
                    <label htmlFor="male" onClick={onoff.genderMaleOnOff}>male</label>
                </div>
            </div>
        </div>
        );
    }
}

export default observable(GenderList);