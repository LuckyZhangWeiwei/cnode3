import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { is } from 'immutable';
import classNames from 'classnames';
import { Tabs } from 'antd';
import { actionCreators } from '@view/info/store';
import { actionCreators as loginActoinCreators } from '@view/login/store';
import { qs, formatDateSimple } from '@script/utils';
import TopicItem from '@component/TopicItem';
import Mask from '@component/Mask';
import { NotResult } from '@component/SharedComponent';

import '@fonts/svg/meuser.svg';
import '@fonts/svg/metime.svg';
import '@fonts/svg/mescore.svg';
import '@fonts/svg/write.svg';
import '@fonts/svg/page-views.svg';
import '@fonts/svg/medropout.svg';
import '@fonts/svg/meedit.svg';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCurrentUser: false,
      isPopUps: false,
    };
    this.showPopUp = this.showPopUp.bind(this);
    this.cancel = this.cancel.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    const { search } = this.props.location;
    if (!this.props.isLogin && !search) {
      this.props.history.push(`/user/login?search=${this.props.location.pathname}`);
    } else if (this.props.isLogin && !search) {
      this.setState({
        isCurrentUser: true,
      });
      this.props.getUserInfo(this.props.loginUserName);
    } else if (!this.props.isLogin && search) {
      const userName = qs(search).username;
      this.props.getUserInfo(userName);
    } else if (this.props.isLogin && search) {
      const userName = qs(search).username;
      this.props.getUserInfo(userName);
    }
    // if (this.props.isLogin) {
    //   this.props.getUnReadNum();
    // }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(this.props.userInfo, nextProps.userInfo)
          || this.state.isCurrentUser !== nextState.isCurrentUser
          || this.state.isPopUps !== nextState.isPopUps;
  }

  componentWillUnmount() {
    this.props.clearUserInfo();
  }

  showPopUp() {
    this.setState({
      isPopUps: true,
    });
  }

  cancel() {
    this.setState({
      isPopUps: false,
    });
  }

  logout() {
    const fun = this.props.history.replace('/');
    this.props.logOut(fun);
  }

  render() {
    const userInfo = this.props.userInfo.toJS();
    const {
      avatar_url: avatarUrl,
      loginname: loginName,
      score,
      create_at: createAt,
      recent_topics: recentTopics,
      recent_replies: recentReplies,
    } = userInfo;
    return (
      <section className="user-center">
        <div className="user-center-info">
          <div
            className="pd"
            data-layout="layout"
            data-layout-align={
              this.state.isCurrentUser ? 'space-between start' : 'start start'
            }
          >
            <Link to="/news" replace>
              <img
                className="author-avatar bdr-half bg-white mgr"
                src={avatarUrl}
                data-layout-flex="0"
                alt=""
                style={{ transform: 'translateY(25%)' }}
              />
            </Link>
            <div className="ft-qgrey user-info-row">
              <p>
                <svg className="svg svg-meuser">
                  <use xlinkHref="#meuser" fill="#f3f3f3" />
                </svg>
                {loginName}
              </p>
              <p>
                <svg className="svg svg-mescore">
                  <use xlinkHref="#mescore" fill="#f3f3f3" />
                </svg>
                {score}分
              </p>
              <p>
                <svg className="svg svg-metime">
                  <use xlinkHref="#metime" fill="#f3f3f3" />
                </svg>
                {formatDateSimple(createAt)}
              </p>
            </div>
            {
              this.state.isCurrentUser ?
              (
                <div className="ft-qgrey user-info-row">
                  <p>
                    <svg className="svg svg-meedit">
                      <use xlinkHref="#meedit" fill="#f3f3f3" />
                    </svg>
                    <Link className="ft-white" to="/share">
                      发布话题
                    </Link>
                  </p>
                  <span onClick={this.showPopUp} role="button">
                    <svg className="svg svg-medropout">
                      <use xlinkHref="#medropout" fill="#f3f3f3" />
                    </svg>
                    退出
                  </span>
                </div>
              )
              :
              null
            }
          </div>
        </div>
        <Tabs
          className={classNames({ 'container-bottom': this.state.isCurrentUser })}
          defaultActiveKey={this.props.activeTabKey}
          onChange={(activeKey) => {
            this.props.setActiveTab(activeKey);
          }}
        >
          <Tabs.TabPane tab="发布" key="1">
            {
              recentTopics && recentTopics.length ?
                <UserTopicList info={recentTopics} />
                :
                <NotResult />
             }
          </Tabs.TabPane>
          <Tabs.TabPane tab="回复" key="2">
            {
              recentReplies && recentReplies.length ?
                <UserTopicList info={recentReplies} />
                :
                <NotResult />
            }
          </Tabs.TabPane>
          <Tabs.TabPane tab="收藏" key="3">
            {
              this.props.userCollection && this.props.userCollection.size ?
                this.props.userCollection.map(item => (
                  <TopicItem key={item.get('id')} info={item} isLazyImg={false} addclass="mgt bg-white" />
                ))
                :
                <NotResult text="暂无数据" />
            }
          </Tabs.TabPane>
        </Tabs>
        {
          this.state.isPopUps ?
            <Mask
              title="退出登录"
              cancel={this.cancel}
              logout={this.logout}
            />
            :
            null
        }
      </section>
    );
  }
}

const mapStateToProps = state => ({
  showLoading: state.getIn(['userInfo', 'showLoading']),
  userInfo: state.getIn(['userInfo', 'userInfo']),
  isLogin: state.getIn(['login', 'isLogin']),
  loginUserName: state.getIn(['login', 'loginUser', 'loginname']),
  userCollection: state.getIn(['userInfo', 'userCollection']),
  activeTabKey: state.getIn(['userInfo', 'activeTabKey']),
});

const mapDispatchToProps = dispatch => ({
  getUserInfo(userName) {
    dispatch(actionCreators.GetUserInfo(userName));
  },
  setActiveTab(TabKey) {
    dispatch(actionCreators.SetTabKey(TabKey));
  },
  logOut(fun) {
    dispatch(loginActoinCreators.logOut(fun));
  },
  // getUnReadNum() {
  //   dispatch(actionCreators.GetUserUnReadNum());
  // },
  clearUserInfo() {
    dispatch(actionCreators.ClearUserInfo());
  },
});

UserInfo.propTypes = {
  location: PropTypes.object.isRequired,
  isLogin: PropTypes.bool,
  loginUserName: PropTypes.string,
  getUserInfo: PropTypes.func,
  setActiveTab: PropTypes.func,
  userInfo: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  userCollection: PropTypes.object.isRequired,
  activeTabKey: PropTypes.string.isRequired,
  logOut: PropTypes.func.isRequired,
  // getUnReadNum: PropTypes.func.isRequired,
  // unReadNum: PropTypes.number,
  clearUserInfo: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfo));

const UserTopicList = (props) => {
  const { info } = props;
  return (
    <div>
      {info ? (
        info.map((item) => {
          return (
            <div key={item.id} className="article-item mgt bg-white">
              <Link
                data-layout="layout"
                data-layout-align="start center"
                to={{
                  pathname: '/index/article-details',
                  search: `?id=${item.id}`,
                  state: {
                    id: item.id,
                  },
                }}
              >
                <img
                  className="author-avatar mgr bd-radius"
                  src={item.author.avatar_url}
                  data-layout-flex="0"
                  alt=""
                />
                <div data-ellipsis className="w100">
                  <h3 data-ellipsis>{item.title}</h3>
                  <div
                    className="numFt mgtb"
                    data-layout="layout"
                    data-layout-align="space-between center"
                  >
                    <span>
                      <svg className="svg svg-write">
                        <use xlinkHref="#write" fill="#b6b6b6" />
                      </svg>
                      {item.author.loginname}
                    </span>
                    {formatDateSimple(item.last_reply_at)}
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      ) :
        null
      }
    </div>
  );
};

UserTopicList.propTypes = {
  info: PropTypes.array,
};
