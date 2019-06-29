import React, { Component } from 'react';
import './css/MeetBar.scss';
import { inject, observer }from 'mobx-react';
import { action } from 'mobx';

// meet 페이지 component : user를 정의 하는 곳
const MeetBar = inject('states')(
    observer(
        class MeetBar extends Component {
            // 순서대로 화면에 표시 닉네임 -> 성별 -> 원하는 성별

            @action
            ChangeName = (data) => { // 원하는 닉네임 정의
                const { user } = this.props.states;
                user.nickname = data.target.value;
                console.log('이름 값 확인 : ', user.nickname);
            }
            
            @action
            ChangeGender = (data) => { // 성별 선택 정의
                const { user } = this.props.states;
                user.gender = data;
                console.log('성별 확인 : ', user.gender);
            }
            
            @action
            ChangeWishGender = (data) => { // 원하는 성별 정의
                const { user } = this.props.states;
                user.wishgender = data;
                console.log('원하는 성별 확인 : ',user.wishgender);
            }

            render() {
                const { user } = this.props.states;
                console.log('유저 확인 : ', user.id, user.nickname, user.gender, user.wishgender, user.img);
        
                return (
                    <div className="MeetBar">
                    <div className="SetNickName">
                        <div>
                            Nickname
                        </div>
                        <input type="text"
                            defaultValue={user.nickname} // name 값이 없으면 초기값은 Guest ( Meet 페이지에서 최초 정의 )
                            onChange={this.ChangeName} // 원한다면 변경 할 수 있음.
                            maxLength="10" // 최대 10자 까지
                        ></input>
                    </div>
                    
                    {/* 
                        1. input radio 사용으로 중복 체크 불가능 
                        2. 해당 값 클릭하면 그에따라 값이 변경되고 최초 Checked 값 설정
                           => 랜덤 채팅을 끝내고 다시 Meet 페이지에 도달 했을 경우 사용자가 지정해둔 값 그대로 표시
                        3. 밑에 내용은 코드 보면 이해 될 거임..
                    */}
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

export default observer(MeetBar);