import React from 'react';
import './css/Profile.css';
import { Link } from 'react-router-dom';

// 추후 프로필로 사용 예정
const Profile = () => {
    return(
        <div className="Profile">
            <Link to="/friend">
                <div className="Close">
                    Close
                </div>
            </Link>
            <div className="PfImg">
                이미지
            </div>
            <div className="PfName">
                닉네임
            </div>
            <div className="PfDesc">
                나중에 표시 글자 수 제한...넣기
            </div>
            <div className="Talk">
                <Link to="/meet/Text">
                    <div className="Text">Text</div>
                </Link>
                <Link to="/meet/Voice">
                    <div className="Voice">Voice</div>
                </Link>
                <Link to="/meet/Video">
                    <div className="Video">Video</div>
                </Link>
            </div>
        </div>
    );
};

export default Profile;