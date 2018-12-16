import React from 'react';
import { actionCreators } from '@view/detail/store';
import { Link, withRouter } from 'react-router-dom';
import marked from 'marked';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { is } from 'immutable';
import { isLogin, getStore } from '@script/utils';
import '@fonts/svg/thumbs.svg';
import '@fonts/svg/comment.svg';

class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.userLike = this.userLike.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return !is(this.props, nextProps.props);
  }

  userLike() {
    if (this.props.isLogin && isLogin()) {
      const replyId = this.props.item.get('id');
      this.props.like(replyId);
    } else {
      this.props.history.push(`/user/login?search=${this.props.location.pathname}${this.props.location.search}`);
    }
  }

  render() {
    const author = this.props.item.get('author').toJS();
    const content = this.props.item.get('content');
    const ups = this.props.item.get('ups');
    const isUped = this.props.item.get('is_uped');
    const itemIdex = this.props.index;

    return (
      <li
        data-layout="layout"
        data-layout-align="start start"
        className={this.props.addclass}
        style={{ padding: '.5rem' }}
      >
        <div data-layout-flex="0">
          <div>
            <Link
              to={{
                pathname: '/user',
                search: `?username=${author.loginname}`,
              }}
            >
              <img
                className="author-avatar mgr bd-radius"
                src={author.avatar_url}
                alt=""
              />
            </Link>
            <p className="tc ft-sgrey mgt" style={{ marginBottom: 0 }}>{itemIdex + 1}楼</p>
          </div>
        </div>
        <div className="pdl w100 user-comment-cnt">
          <h3>
            {author.loginname}
          </h3>
          <div
            className="mgt markdown-body"
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          />
          {
            this.props.isMyLayer(author.loginname) ?
            null
            :
            <div className="tr">
              <span className="user-thumbs" style={{ marginRight: '1rem' }}>
                <svg
                  className="svg svg-thumbs"
                  onClick={this.userLike}
                >
                  <use xlinkHref="#thumbs" fill={isUped ? '#e22c4a' : null} />
                </svg>
                {ups.size ? <span style={{ color: isUped ? '#e22c4a' : null }}>{ups.size}</span> : ''}
              </span>
              <svg className="svg svg-comment">
                <use xlinkHref="#comment" />
              </svg>
            </div>
          }
        </div>
      </li>
    );
  }
}

CommentItem.propTypes = {
  item: PropTypes.object.isRequired,
  addclass: PropTypes.string,
  index: PropTypes.number.isRequired,
  like: PropTypes.func.isRequired,
  isLogin: PropTypes.bool,
  history: PropTypes.object,
  location: PropTypes.object,
  isMyLayer: PropTypes.func.isRequired,
};

const mapPropstoState = state => ({
  isLogin: state.getIn(['login', 'isLogin']),
});

const mapDispatchToProps = dispatch => ({
  like(replyId) {
    dispatch(actionCreators.like(replyId));
  },
  isMyLayer: (username) => {
    const myName = getStore('loginUserInfo').loginname;
    return username === myName;
  },
});

export default withRouter(connect(mapPropstoState, mapDispatchToProps)(CommentItem));
