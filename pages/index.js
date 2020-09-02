import { Button } from 'antd';

export default () => {
    return (
        <div className="title-container">
            <div className="title-content">
                <h1 className="title-header">Welcome to the Note Map</h1>
                <div>
                    <Button type="primary" size="large" href="/login" className="title-button">Log In</Button>
                    <Button type="default" size="large" href="/signup" className="title-button">Sign Up</Button>
                </div>
            </div>
        </div>
    );
};