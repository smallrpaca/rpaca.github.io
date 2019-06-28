import React, { Component } from 'react';
import twitter from '../svg/Twitter_Logo_WhiteOnBlue.svg';
import facebook from '../svg/f_logo_RGB-Blue_58.png';
import './css/SnsLink.scss';
import { observer } from 'mobx-react';

const SnsLink = observer(
    class SnsLink extends Component {

        sendLinkFacebook = (e) => {
            const facebook_share_url = "https://www.facebook.com/sharer/sharer.php?u=www.jacarand.com";
            window.open(facebook_share_url,
                        'Share on Facebook',
                        'scrollbars=no, width=500, height=500');
        }
    
        sendLinkTwitter = (e) => {
            const twitter_share_text="Chat together! Free Random Chat ♥ Learn more : ";
            const twitter_share_url="https://www.jacarand.com";
            window.open("https://twitter.com/share?text="+twitter_share_text+"&url="+twitter_share_url,
                        'Share on Twitter',
                        'scrollbars=no, width=500, height=500');
        }

        render() {
            return (
            <div className="sociallink">
                <div className="desc">
                The more people we have together, the more pleasure we get.
                </div>
                <span onClick={e => this.sendLinkFacebook(e)} alt="facebook">
                    <img src={facebook} alt="facebook" width="45"/>
                </span>
                <span onClick={e => this.sendLinkTwitter(e)} alt="twitter">
                    <img src={twitter} alt="twitter" width="45"/>
                </span>
            </div>
            );
        }
    }
)

export default SnsLink;