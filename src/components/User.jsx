import React from 'react';

const User = (props) => {
    if (!props) { return null }
    let { name, email } = props.idToken;
    return (<div>
        <p>{name}</p>
        <p>{email}</p>
    </div>);
}


export default User;