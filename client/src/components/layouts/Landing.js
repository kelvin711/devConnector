import React from 'react';
import { Link } from 'react-router-dom'


class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Developer Connector
                                </h1>
                                <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
                                <hr />
                                <Link className="nav-link" to="/register">Register</Link>
                                <Link className="nav-link" to="/login">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default Landing;
