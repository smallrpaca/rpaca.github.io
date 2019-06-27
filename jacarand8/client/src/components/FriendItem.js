import React from 'react';
import './css/FriendItem.scss';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

const FriendItem = observer(
    class FriendItem extends React.Component {
        render() {
            return (
            <div className="FriendItem">
                <div className="friendImg">
                <Link to="/Profile/:id">
                    이미지
                </Link>
                </div>
                <div className="name">
                <Link to="/Profile/:id">
                    닉네임
                </Link>
                </div>
                <div className="ChatGo">
                    <div className="TextGo">
                        <Link to="/meet/Text">
                        Text
                        </Link>
                    </div>
                    <div className="VoiceGo">
                        <Link to="/meet/Voice">
                        Voice
                        </Link>
                    </div>
                    <div className="VideoGo">
                        <Link to="/meet/Video">
                        Video
                        </Link>
                    </div>
                </div>
            </div>
            );
        }
    }
)

export default FriendItem;