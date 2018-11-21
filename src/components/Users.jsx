import React from 'react';
import { UserConsumer } from './../contexts/UserContext';
import User from './User';

const Users = () => {
    return (
        <React.Fragment>
            <div>Users</div>
            <UserConsumer>{(context) => context.idToken ? <User idToken={context.idToken}></User> : null}</UserConsumer>
        </React.Fragment>);
}

export default Users;