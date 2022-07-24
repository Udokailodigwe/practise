import React from 'react';

import './Button.css';


/**
 * @component Button,
 * @param {fetchCity} param0,  props for handling submit function
 */
function Button({fetchCity}) {


    return (
        <div className="button">
            <button onClick={fetchCity}> Show weather info </button>
        </div>
    );
}

export default Button;