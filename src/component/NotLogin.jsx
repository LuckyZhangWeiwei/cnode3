import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NotLogin = (props) => {
  const link = `/user/login?search=${props.location.pathname}${props.location.search}`;
  return (
    <div className="not-login-wrap tc bg-color">
      <Link to={link} replace>
        <p data-layout-align="center center" data-layout="layout" style={{ marginBottom: 0, color: '#fff' }}>
          还未登录，现在就去登录
        </p>
      </Link>
    </div>
  );
};

NotLogin.propTypes = {
  location: PropTypes.object,
};

export default NotLogin;
