import React from 'react';
import SlidingNumber from './SlidingNumber';

const SetSessionThreshold = () => {
    return (
        <div className="set_session_threshold sec__one">
            <h1> Set Session Threshold </h1>
            <SlidingNumber
                default={50}
            />
        </div>
    )
}

export default SetSessionThreshold;
