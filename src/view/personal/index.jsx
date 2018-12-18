import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '@view/info/store';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import marked from 'marked';
import { NotResult } from '@component/SharedComponent';
import { formatDate } from '@script/utils';

class Person extends React.Component {
  componentDidMount() {
    const { search } = this.props.location;
    if (!this.props.isLogin && !search) {
      this.props.history.push(`/user/login?search=${this.props.location.pathname}`);
    } else {
      this.props.getMsg();
      this.props.getUnReadNum();
    }
  }
  render() {
    const { hasReadMsg, unReadMsg } = this.props;
    return (
      <section className="news-content container-bottom" style={{ paddingBottom: 0 }}>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="未读消息" key="1">
            {
              unReadMsg && <MessageList info={unReadMsg} />
            }
          </Tabs.TabPane>
          <Tabs.TabPane tab="已读消息" key="2">
            {
              hasReadMsg && <MessageList info={hasReadMsg} />
            }
          </Tabs.TabPane>
        </Tabs>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  hasReadMsg: state.getIn(['userInfo', 'userReadedMsg']),
  unReadMsg: state.getIn(['userInfo', 'userUnReadMsg']),
  userInfo: state.getIn(['userInfo', 'userInfo']),
  isLogin: state.getIn(['login', 'isLogin']),
});

const mapDispatchToProps = dispatch => ({
  getMsg() {
    dispatch(actionCreators.GetUserMsg());
  },
  getUnReadNum() {
    dispatch(actionCreators.GetUserUnReadNum());
  },
});

Person.propTypes = {
  getMsg: PropTypes.func,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isLogin: PropTypes.bool,
  unReadMsg: PropTypes.object.isRequired,
  hasReadMsg: PropTypes.object.isRequired,
  getUnReadNum: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Person);

const MessageList = (props) => {
  const { info } = props;
  return (
    info.size ?
      info.map((item) => {
        return (
          <Link
            className="ft-color"
            to={{
              pathname: '/index/article-details',
              search: `?id=${item.getIn(['topic', 'id'])}&unreadmes=true`,
              state: {
                id: item.getIn(['topic', 'id']),
              },
            }}
            key={item.get('id')}
          >
            <div className="article-item mgt">
              <div data-layout="layout" data-layout-align="start start">
                <img
                  className="author-avatar mgr bd-radius"
                  src={item.getIn(['author', 'avatar_url'])}
                  data-layout-flex="0"
                  alt=""
                />
                <div className="w100">
                  <h3
                    data-ellipsis
                    data-layout="layout"
                    data-layout-align="space-between center"
                  >
                    <span className="title-cnt" data-ellipsis>
                      {item.getIn(['author', 'loginname'])}
                    </span>
                    {formatDate(item.get('create_at'))}
                  </h3>
                  <div className="mgt">
                    <div>
                      在话题
                        {item.getIn(['topic', 'title'])}
                      {item.get('type') === 'at' ? '中@了你!' : '回复了你!'}
                      <div
                        className="mgt markdown-body"
                        dangerouslySetInnerHTML={{ __html: marked(item.getIn(['reply', 'content'])) }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })
      :
      <NotResult text="暂无数据" />
  );
};

MessageList.propTypes = {
  info: PropTypes.object.isRequired,
};
