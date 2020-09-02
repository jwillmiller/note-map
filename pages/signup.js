import React from 'react';
import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/router';

function Signup(props) {
    const router = useRouter();

    const handleFormFinish = (values) => {
        console.log("values", values);
        router.push('/workspace');
    }

    const handleFormFail = (errorInfo) => {
        console.log("form submission fail. info: ", errorInfo);
    }

    return (
        <div className="title-container">
            <div className="title-content">
                <h2>Signup</h2>
                <Form onFinish={handleFormFinish} onFinishFailed={handleFormFail}>
                    <Form.Item label="Username" name="username">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Signup;