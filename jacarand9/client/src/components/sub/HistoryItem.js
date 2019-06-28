import React from 'react';
import './css/HistoryItem.scss';

const HistoryItem = () => {
    return (
        <div className="HistoryItem">
            <div className="name">
                닉네임
            </div>
            <div className="plus">
                친구추가
            </div>
            <div className="dec">
                신고하기
            </div>
        </div>
    );
}

export default HistoryItem;