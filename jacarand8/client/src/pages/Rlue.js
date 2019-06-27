import React, { Component } from 'react';
import './css/Rlue.scss';
import TopBar from '../components/TopBar';
import { observer } from 'mobx-react';

const Rlue = observer(
    class Rlue extends Component {
        render() {
            return (
                <div className="Rlue">
                <TopBar />
                    <div className="desc">
                        <h1 style={{textAlign: "center"}}>Chat rules and regulations</h1>
                        <br />
                        <h3>
                        Our 'Jacarand' is a place where you can chat for free. 
    Our goal is to have fun and fun with various people.
    Therefore, it is important for all users to respect chat rules and regulations.
                        </h3>
                        <br />
    
                        <h2>1. a ban on rude behavior</h2>
                        <h3>- spreading vulgarity or sexuality or inadequate/depressive comments</h3>
                        <h3>- degrading others on the basis of religion, race, sexual orientation and age in the chat</h3>
                        <h3>- harassing or showing disrespect to others</h3>
                        <br />
    
                        <h2>2. Following types of spam activities are not allowed</h2>
                        <h3>- demonstrating any video/image/text advertisement</h3>
                        <h3>- placing any ad URL during text chat</h3>
                        <h3>- texting any ad message in bulk</h3>
                        <h3>- asking other OmeTV users to visit any URL, vote on something or any other self/product promotional tricks are disallowed.</h3>
                        <br />
    
                        <h2>a later plan</h2>
                        <h3>1. random : Voice, Video Chat Enabled</h3>
                        <h3>2. 1:1 : Text, voice, video chat Enabled</h3>
                        <h3>3. Friend Add-On</h3>
                        <h3>4. Login / membership</h3>
                        <h3>5. Enhanced Matching System</h3>
                    </div>
            </div>
            );
        }
    }
)

export default Rlue;