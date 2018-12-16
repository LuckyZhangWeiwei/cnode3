import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { is } from 'immutable';
import marked from 'marked';
import { actionCreators } from '@view/detail/store';
import { qs, formatDate } from '@script/utils';
import Comments from '@view/detail/components/comments';
import NotLogin from '@component/NotLogin';
import InputComment from '@component/InputComment';
import { LoadLoop } from '@component/SharedComponent';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.postArticle = this.postArticle.bind(this);
  }
  componentDidMount() {
    const topicId = qs(this.props.location.search).id;
    this.props.getTopicDetails(topicId);
  }
  shouldComponentUpdate(nextProps) {
    return !is(this.props.showLoading, nextProps.showLoading)
      ||
      !is(this.props.detail.get('replies'), nextProps.detail.get('replies'));
  }

  componentWillUnmount() {
    this.props.clearDetails();
  }

  postArticle(comment) {
    // return new Promise((resolve) => {
    //   const topicId = this.props.detail.get('id');
    //   actionCreators.postComment(topicId, comment);
    //   resolve();
    // });
    const topicId = this.props.detail.get('id');
    this.props.postComment(topicId, comment);
  }

  render() {
    return this.props.showLoading ?
      <LoadLoop />
      :
      <section className="article-details bg-white">
        <div>
          <div>
            <h1>{this.props.detail.get('title')}</h1>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img
              src={this.props.detail.getIn(['author', 'avatar_url'])}
              alt={this.props.detail.getIn(['author', 'loginname'])}
              style={{ width: '3rem', height: '3rem', borderRadius: '1.5rem' }}
            />
            <div>
              <div>{`发表于: ${formatDate(this.props.detail.get('create_at'))}`}</div>
              <div>{`总访问次数:${this.props.detail.get('visit_count')}`}</div>
            </div>
          </div>
        </div>
        <div className="pd markdown-body mgt bg-white" dangerouslySetInnerHTML={{ __html: marked(this.props.detail.get('content')) }} />
        {
          this.props.detail.get('reply_count') === 0 ?
          null
          :
          <div>
            <p>{`共${this.props.detail.get('reply_count')}条评论`}</p>
            <hr />
            <div style={{ background: '#f3f3f3' }}>
              <Comments />
            </div>
          </div>
        }
        <div className="pf w100 bl0 z3 fixed-bottom-wrap bg-white">
          {
            this.props.isLogin ?
              <InputComment
                loginname={this.props.userInfo.get('loginname')}
                avatar_url={this.props.userInfo.get('avatar_url')}
                postComment={this.postArticle}
              />
              :
              <NotLogin location={this.props.location} />
          }
        </div>
      </section>;
  }
}

const mapStateToProps = state => ({
  showLoading: state.getIn(['detail', 'showLoading']),
  detail: state.getIn(['detail', 'detail']),
  isLogin: state.getIn(['login', 'isLogin']),
  userInfo: state.getIn(['login', 'loginUser']),
});

const mapDispatchToProps = dispatch => ({
  getTopicDetails(topicId) {
    dispatch(actionCreators.GetDetail(topicId));
  },
  clearDetails() {
    dispatch(actionCreators.clearDetail());
  },
  postComment(topicId, content) {
    dispatch(actionCreators.postComment(topicId, content));
  },
});

Detail.propTypes = {
  location: PropTypes.object.isRequired,
  getTopicDetails: PropTypes.func.isRequired,
  detail: PropTypes.object.isRequired,
  showLoading: PropTypes.bool.isRequired,
  isLogin: PropTypes.bool,
  userInfo: PropTypes.object,
  clearDetails: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
