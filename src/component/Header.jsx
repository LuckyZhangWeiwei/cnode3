import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { actionCreators } from '@view/detail/store';
import { actionCreators as userInfoActionCreator } from '@view/info/store';
import { isLogin } from '@script/utils';
import '@fonts/svg/goback.svg';

window.goback = () => {
  if (window.callback) {
    window.callback.goback();
  }
};

window.setCallback = (callback) => {
  window.callback = callback;
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.collectArticle = this.collectArticle.bind(this);
    this.goback = this.goback.bind(this);
  }

  componentWillMount() {
    window.setCallback(this);
  }


  collectArticle() {
    if (this.props.isLogin && isLogin()) {
      this.props.collect(this.props.articleId, this.props.isCollect);
      this.props.syncCollection(this.props.loginUserName);
    } else {
      this.props.history.push(`/user/login?search=${this.props.location.pathname}${this.props.location.search} `);
    }
  }

  goback() {
    const search = this.props.location.search.replace('?search=', '');
    if (search.includes('article-details')) {
      this.props.history.push(search);
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    const arrPathName = ['/share', '/', '/news', '/user'];
    const isFirstLevePath = arrPathName.includes(this.props.location.pathname);
    return (
      <header
        className="pf w100 tl0 bg-color ft-white header-bar z1"
        data-layout-align="space-between center"
        data-layout="layout"
      >
        {
          (!isFirstLevePath || this.props.isBack)
          &&
          (
            <svg className="svg svg-goback" onClick={this.goback}>
              <use xlinkHref="#goback" fill="#fff" />
            </svg>
          )
        }
        <h2 className="w100 tc header-bar-title ft-white">
          <span>
            <img src="https://static2.cnodejs.org/public/images/cnodejs_light.svg" alt="cnode" className="logo" />
            {/* {this.props.title} */}
          </span>
        </h2>
        {
          this.props.location.pathname === '/index/article-details' ?
            <span>
              <Icon
                type="star"
                style={{ fontSize: '1rem', paddingRight: 10, color: this.props.isCollect ? '#e22c4a' : '#e0e0e0' }}
                onClick={this.collectArticle}
              />
            </span>
            :
            null
        }
      </header>
    );
  }
}

Header.defaultProps = {
  // title: '标题',
  isBack: false,
};

const mapStateToProps = state => ({
  isLogin: state.getIn(['login', 'isLogin']),
  isCollect: state.getIn(['detail', 'detail', 'is_collect']),
  articleId: state.getIn(['detail', 'detail', 'id']),
  loginUserName: state.getIn(['login', 'loginUser', 'loginname']),
});

const mapDispatchToProps = dispatch => ({
  collect(articleId, isCollected) {
    dispatch(actionCreators.collect(articleId, isCollected));
  },
  syncCollection(userName) {
    dispatch(userInfoActionCreator.GetUserInfo(userName));
  },
});

Header.propTypes = {
  isLogin: PropTypes.bool,
  collect: PropTypes.func.isRequired,
  articleId: PropTypes.string,
  history: PropTypes.object.isRequired,
  isCollect: PropTypes.bool,
  location: PropTypes.object.isRequired,
  isBack: PropTypes.bool,
  syncCollection: PropTypes.func.isRequired,
  loginUserName: PropTypes.string,
  // title: PropTypes.string,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

