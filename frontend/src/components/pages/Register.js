import React from "react";
import { Form, Input, Button, Row, Col, Divider, notification } from "antd";
import { UserOutlined } from '@ant-design/icons';
import Title from "antd/lib/typography/Title";
import axios from "../../config/axios";
import { useNavigate } from 'react-router-dom'

const layout = {
  labelCol: { xs: 24, sm: 7, md: 6, lg: 6, xl: 5, xxl: 4 },
  wrapperCol: { xs: 24, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
};

function Register() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    axios.post("/users/register", { username: values.username, password: values.password, name: values.nickname}).then(res => {
      notification.info({
        message: `${values.nickname} Registration successful`
      })
      navigate('/login')
    }).catch (error => {
      notification.error({
        message: `Error : Registration unsuccessful`
      })
    })
  };

  return (
    <Row justify="center">
      <Col xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
        <div className="Form">
          <Row justify="center">
            <Title level={2} className="Title">
              Register
            </Title>
          </Row>
          <Divider className="Divider" />
          <Form {...layout} onFinish={onFinish} style={{ width: "100%" }}>
            <Form.Item
              placeholder="Enter your username"
              name="username"
              label="Username"
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              rules={[
                { required: true, message: "Please input your username" },
                { min: 8, message: 'Username must be at least 8 characters long!' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              hasFeedback
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if(!value || getFieldValue('password') === value){
                      return Promise.resolve();
                    }
                    return Promise.reject("Confirm Password doesn't match")
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="nickname"
              label={<span>Nickname&nbsp;</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Button className="Button" type="primary" htmlType="submit">
              Register
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default Register