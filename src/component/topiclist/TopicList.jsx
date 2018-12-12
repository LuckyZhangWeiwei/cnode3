import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { actionCreators } from '@view/home/store';
import FreshContainer from '@component/freshcontainer/FreshContainer';
import TopicItem from '@component/TopicItem';
import './topiclist.less';

@withRouter
class TopicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initializing: 2,
    };
    this.refScroll = null;
  }

  componentDidMount() {
    this.refScroll = document.getElementById('scrollPanel');
    if (!this.props.fromCache) {
      this.props.getTopicData(() => {
        this.setState({
          initializing: 2,
        });
      });
    } else {
      this.refScroll.scrollTop = this.props.scrollDistence;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.setState({
        initializing: 1,
      });
      this.props.getTopicData(() => {
        this.setState({
          initializing: 2,
        }, () => {
          window.scrollTo(0, 0); // 不同类型重置滚动条
          this.refScroll.scrollTop = 0;
        });
      });
    }
  }

  refresh(res) {
    const pageInfo = {
      selectedTab: this.props.pageInfo.get('selectedTab'),
      pageIndex: 1,
      isReset: true,
    };
    this.props.updateSelectedTab(pageInfo);
    this.props.getTopicData(res);
  }

  loadData(res) {
    if (!this.props.isLoading) {
      const pageInfo = {
        selectedTab: this.props.pageInfo.get('selectedTab'),
        pageIndex: this.props.pageInfo.get('pageIndex') + 1,
        isReset: false,
      };
      this.props.updateSelectedTab(pageInfo);
      this.props.getTopicData(res);
    }
  }

  render() {
    const { initializing } = this.state;
    return (
      <div className="load-more-view loadmore-wrap container-bottom">
        <FreshContainer
          ref="scrollCnt"
          className="main"
          onRefresh={this.refresh.bind(this)}
          onLoadMore={this.loadData.bind(this)}
          hasMore
          initializing={initializing}
        >
          <div className="article-list">
            {
              this.props.topicList.map(item => (
                <TopicItem key={item.get('id')} info={item} addclass="mgt bg-white" isLazyImg={false} />
              ))
            }
          </div>
        </FreshContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  topicList: state.getIn(['home', 'topicList']),
  pageInfo: state.getIn(['home', 'pageInfo']),
  isLoading: state.getIn(['home', 'loading']),
  fromCache: state.getIn(['userInfo', 'needCache']),
  scrollDistence: state.getIn(['home', 'scrollDistence']),
});

const mapDispatchToProps = dispatch => ({
  getTopicData(res) {
    dispatch(actionCreators.GetHomeData(res));
  },
  updateSelectedTab(pageInfo) {
    dispatch(actionCreators.UpdatePageInfo(pageInfo));
  },
});

TopicList.propTypes = {
  getTopicData: PropTypes.func.isRequired,
  location: PropTypes.object,
  pageInfo: PropTypes.object.isRequired,
  updateSelectedTab: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  topicList: PropTypes.object.isRequired,
  fromCache: PropTypes.bool,
  scrollDistence: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicList);
