import React from 'react';
import './css/MyRoomItem.scss';
import { observer } from 'mobx-react';

// 나의 방 목록 표시 ( DB가 필요할 듯 싶소.. )
const MyRoomItem = observer(
    class MyRoomItem extends React.Component {
        render() {
            return (
            <div className="MyRoomItem">
                <div className="MyRoomImg">
                    이미지
                </div>
                <div className="name">
                    닉네임 or 방 이름
                </div>
                <div className="Chat">
                    최근내용
                </div>
                <div className="GetMsg">
                    1
                </div>
            </div>
            );
        }
    }
)

export default MyRoomItem;