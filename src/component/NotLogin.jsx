import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NotLogin = (props) => {
  const link = `/user/login?search=${props.location.pathname}${props.location.search}`;
  return (
    <Link to={link} replace>
      <div className="not-login-wrap tc bg-color" style={{ height: '45px', lineHeight: '45px' }}>
        <p data-layout-align="center center" data-layout="layout" style={{ color: '#fff' }}>
            还未登录，现在就去登录
        </p>
      </div>
    </Link>
  );
};

NotLogin.propTypes = {
  location: PropTypes.object,
};

export default NotLogin;
