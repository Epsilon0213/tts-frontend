import React from 'react';

const Button = ({ onClick = null, children = null }) => (
    <button onClick={onClick} class="btn">{children}</button>
);

export default Button;