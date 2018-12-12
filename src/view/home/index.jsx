import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TabNav from '@component/TabNav';
import { qs } from '@script/utils';
import { actionCreators } from '@view/home/store';
import TopicList from '@component/topiclist/TopicList';

class Home extends React.Component {
  componentWillMount() {
    if (!this.props.fromCache) {
      const pageInfo = {
        selectedTab: qs(this.props.location.search).tab || 'all',
        pageIndex: 1,
        isReset: true,
      };
      this.props.updateSelectedTab(pageInfo);
    }
  }

  componentWillReceiveProps(nextProps) {
    const pageInfo = {
      selectedTab: qs(nextProps.location.search).tab || 'all',
      pageIndex: 1,
      isReset: true,
    };
    if (this.props.location.search !== nextProps.location.search) {
      this.props.updateSelectedTab(pageInfo);
    }
  }

  render() {
    return (
      <div>
        <ul style={{ marginBottom: 0 }}>
          <TabNav selectedTab={this.props.pageInfo.selectedTab} />
          <TopicList />
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pageInfo: state.getIn(['home', 'pageInfo']).toJS(),
  fromCache: state.getIn(['userInfo', 'needCache']),
});

const mapDispatchToProps = dispatch => ({
  updateSelectedTab(pageInfo) {
    dispatch(actionCreators.UpdatePageInfo(pageInfo));
  },
});

Home.propTypes = {
  location: PropTypes.object.isRequired,
  updateSelectedTab: PropTypes.func.isRequired,
  pageInfo: PropTypes.object.isRequired,
  fromCache: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
