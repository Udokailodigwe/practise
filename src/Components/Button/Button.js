import React from 'react';

import './Button.css';

function Button({fetchCity}) {


    return (
        <div className="button">
            <button onClick={fetchCity}> Show weather info </button>
        </div>
    );
}

export default Button;