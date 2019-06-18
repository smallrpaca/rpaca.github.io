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
            <div className="main">
                <div className="close" onClick={onoff.genderOnOff}>
                    <div>close</div>
                </div>
                <div className="select">
                    <input type="checkbox" id="female" className="female" checked={onoff.genderFemaleValue}/>
                    <label htmlFor="female" onClick={onoff.genderFemaleOnOff}>Female</label>
                </div>
                <div className="select">
                    <input type="checkbox" id="male" className="male" checked={onoff.genderMaleValue}/>
                    <label htmlFor="male" onClick={onoff.genderMaleOnOff}>male</label>
                </div>
            </div>
        </div>
        );
    }
}

export default observable(GenderList);