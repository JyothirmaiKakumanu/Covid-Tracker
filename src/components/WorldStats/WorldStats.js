import React from 'react';

import './WorldStats.css';

const WorldStats = (props) => {
    return (
        <div className="card worldStats-box">
            <h1 className="mx-auto totalNumbers" style={{ fontSize: "3vw" }}>{props.total}</h1>
            <p className="about" style={{ fontSize: "2vw" }}>{props.about}</p>
        </div>

    )
}

export default WorldStats;