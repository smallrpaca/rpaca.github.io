import React from 'react';
import './css/Adv.scss';

const Adv = () => {
    const pathname = window.location.pathname;
    return (
        <div className="MainAdv">
            {/* 친구, room 광고  */}
            { (pathname === '/friend') || (pathname === '/MyRoom') || (pathname === '/OpenRoom') ? (
                <div className="Adv1"></div>
            ) : (
                false
            )}

            {/* meet 페이지 광고 */}
            { pathname === '/meet' ? (
                <div>
                    <div className="Adv2"></div>
                    <div className="Adv3">
                    </div>
                    <div className="Adv4">
                    </div>
                    <div className="Adv5"></div>
                </div>
            ) : (
                 false 
            )}
        </div>
    );
};

export default Adv;