import React, { Component } from 'react';
import './css/MeetBar.scss';
import { inject, observer }from 'mobx-react';

const MeetBar = inject('states')(
    observer(
        class MeetBar extends Component {
        
            ChangeGender = (data) => {
                const { user } = this.props.states;
                user.gender = data;
                console.log('성별 확인 : ', user.gender);
            }
        
            ChangeWishGender = (data) => {
                const { user } = this.props.states;
                user.wishgender = data;
                console.log('원하는 성별 확인 : ',user.wishgender);
            }
        
            ChangeName = (data) => {
                const { user } = this.props.states;
                user.nickname = data.target.value;
                console.log('이름 값 확인 : ', user.nickname);
            }

            render() {
                const { user } = this.props.states;
                console.log('유저 확인 : ', user.id, user.nickname, user.gender, user.wishgender, user.img);
        
                return (
                    <div className="MeetBar">
                    <div className="SetNickName">
                        <div>
                            nickname (max : 10)
                        </div>
                        <input type="text"
                            defaultValue={user.nickname}
                            onChange={this.ChangeName}
                            maxLength="10"
                        ></input>
                    </div>
                    
                    <div className="Gender">
                        <div>Gender</div>
                        <input type="radio" 
                            name="gender" 
                            id="FemaleInput"
                            onClick={e => this.ChangeGender('Female')}
                            defaultChecked={user.gender === 'Female' ? true : false}
                        />
                        <label htmlFor="FemaleInput" className="GenderLabel01">Female</label>
        
                        <input type="radio" 
                            name="gender" 
                            id="MaleInput"
                            onClick={e => this.ChangeGender('Male')}
                            defaultChecked={user.gender === 'Male' ? true : false}
                        />
                        <label htmlFor="MaleInput" className="GenderLabel02">Male</label>
                    </div>
        
                    <div className="WishGender">
                        <div>WishGender</div>
                        <input type="radio" 
                            name="wishgender" 
                            id="wishFemaleInput"
                            onClick={e => this.ChangeWishGender('Female')}
                            defaultChecked={user.wishgender === 'Female' ? true : false}
                        />
                        <label htmlFor="wishFemaleInput" className="wishGenderLabel01">Female</label>
        
                        <input type="radio" 
                            name="wishgender" 
                            id="wishMaleInput"
                            onClick={e => this.ChangeWishGender('Male')}
                            defaultChecked={user.wishgender === 'Male' ? true : false}
                        />
                        <label htmlFor="wishMaleInput" className="wishGenderLabel02">Male</label>
                    </div>
                </div>
                );
            }
        }
    )
)

export default MeetBar;