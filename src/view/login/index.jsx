import React from 'react';
import { Input, Button, Alert } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreators } from '@view/login/store';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.state = {
      message: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLogin) {
      const search =
      nextProps.location.search.replace('?search=', '')
      ||
      `/user?username=${this.props.loginUserInfo.get('loginname')}`;
      this.props.history.replace(search);
    } else {
      this.setState({
        message: '错误的accessToken',
      });
    }
  }

  enterSubmit(e) {
    if (Object.is(e.keyCode, 13)) {
      this.loginSubmit();
    }
  }

  loginSubmit() {
    const accessToken = this.refs.userToken.input.value;
    if (accessToken) {
      this.props.login(accessToken);
    } else {
      this.setState({
        message: '请输入accessToken',
      });
    }
  }

  render() {
    return (
      <div className="user-login-form">
        <div className="ipt-row">
          <Input
            ref="userToken"
            onKeyDown={this.enterSubmit.bind(this)}
            placeholder="请输入Access Token"
          />
        </div>
        <div className="ipt-row">
          <Button
            onClick={this.loginSubmit}
            name="btn-submit"
            type="primary"
          >
          登录
          </Button>
        </div>
        {
          this.state.message ?
            <div className="ipt-row">
              <Alert
                description={this.state.message}
                type="error"
                closable
              />
            </div>
          :
          null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.getIn(['login', 'isLogin']),
  loginUserInfo: state.getIn(['login', 'loginUser']),
});

const mapDispatchToProps = dispatch => ({
  login(accessToken) {
    dispatch(actionCreators.Login(accessToken));
  },
});

Login.propTypes = {
  isLogin: PropTypes.bool,
  location: PropTypes.object,
  loginUserInfo: PropTypes.object,
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
