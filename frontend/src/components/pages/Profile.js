import React from 'react';
import userService from '../services/localStorageService';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export default function Profile(props) {

  const logout = () => {
    userService.removeToken();
    userService.removeUserDetail();
    props.setRole("guest");
  }

  const userDetail = JSON.parse((userService.getUserDetail()))

  return (
    <div>
      <h2>
        Profile Page
      </h2>
      <p>
        <strong>Name:</strong> {userDetail.name}
        <br />
        <strong>User ID:</strong> {userDetail.user_id}
      </p>
      <Link to="/todo"><Button>Go to Todo List</Button></Link>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}