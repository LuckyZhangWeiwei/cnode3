import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreators } from '@view/home/store';
import './FreshContainer.less';

const STATS = {
  init: '',
  pulling: 'pulling',
  enough: 'pulling enough',
  refreshing: 'refreshing',
  refreshed: 'refreshed',
  reset: 'reset',
  loading: 'loading', // loading more
};

class FreshContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaderState: STATS.init,
      pullHeight: 0,
      // progressd: 0,
    };

    this.onScroll = this.onScroll.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initializing < 2) {
      this.setState({
        progressed: 0, // reset progress animation state
      });
    }
  }

  onScroll(e) {
    if (
      this.props.autoLoadMore
      &&
      this.props.hasMore
      &&
      this.state.loaderState !== STATS.loading
    ) {
      const panel = e.currentTarget;
      const scrollBottom = panel.scrollHeight - panel.clientHeight - panel.scrollTop;
      this.props.setScrollDistence(panel.scrollTop);
      if (scrollBottom < 5) this.loadMore();
    }
  }

  easing(distance) {
    // t: current time, b: begInnIng value, c: change In value, d: duration
    const t = distance;
    const b = 0;
    const d = window.screen.availHeight; // 允许拖拽的最大距离
    const c = d / 2.5; // 提示标签最大有效拖拽距离

    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  }

  calculateDistance(touch) {
    return touch.clientY - this._initialTouch.clientY;
  }

  canRefresh() {
    const result = this.props.onRefresh
    &&
    ([STATS.refreshing, STATS.loading].indexOf(this.state.loaderState) < 0);
    return result;
  }

  loadMore() {
    this.setState({
      loaderState: STATS.loading,
    });

    this.props.onLoadMore(() => {
      this.setState({
        loaderState: STATS.init,
      });
    });
  }

  touchStart(e) {
    if (e.touches.length === 1) {
      this._initialTouch = {
        clientY: e.touches[0].clientY,
        scrollTop: this.refs.panel.scrollTop,
      };
    }
  }

  touchMove(e) {
    if (!this.canRefresh()) return;
    const { scrollTop } = this.refs.panel;
    const distance = this.calculateDistance(e.touches[0]);

    // if(distance < 0) {
    //     this.props.updateScrollDirection('down');
    // } else {
    //     this.props.updateScrollDirection('up');
    // }

    if (distance > 0 && scrollTop <= 0) {
      let pullDistance = distance - this._initialTouch.scrollTop;
      if (pullDistance < 0) {
        // 修复 webview 滚动过程中 touchstart 时计算panel.scrollTop不准
        pullDistance = 0;
        this._initialTouch.scrollTop = distance;
      }
      const pullHeight = this.easing(pullDistance);
      if (pullHeight) e.preventDefault(); // 减弱滚动

      this.setState({
        loaderState: pullHeight > this.props.distanceToRefresh ? STATS.enough : STATS.pulling,
        pullHeight,
      });
    }
  }
  touchEnd() {
    if (!this.canRefresh()) return;
    const endState = {
      loaderState: STATS.reset,
      pullHeight: 0,
    };

    if (this.state.loaderState === STATS.enough) {
      // refreshing
      this.setState({
        loaderState: STATS.refreshing,
        pullHeight: 0,
      });

      // trigger refresh action
      this.props.onRefresh(() => {
        // resolve
        this.setState({
          loaderState: STATS.refreshed,
          pullHeight: 0,
        });
      }, () => {
        // reject
        this.setState(endState); // reset
      });
    } else this.setState(endState); // reset
  }

  animationEnd() {
    const newState = {};
    if (this.state.loaderState === STATS.refreshed) newState.loaderState = STATS.init;
    if (this.props.initializing > 1) newState.progressed = 1;
    this.setState(newState);
  }

  render() {
    const {
      className,
      hasMore,
      initializing,
    } = this.props;

    const {
      loaderState,
      pullHeight,
      progressed,
    } = this.state;

    const footer = hasMore ?
      (
        <div className="tloader-footer">
          <div className="tloader-btn" role="button" onClick={this.loadMore} />
          <div className="tloader-loading"><i className="ui-loading" /></div>
        </div>
      )
      :
      null;
    const style = pullHeight ?
      { WebkitTransform: `translate3d(0,${pullHeight}px,0)` }
      :
      null;

    let progressClassName = '';
    if (!progressed) {
      if (initializing > 0) progressClassName += ' tloader-progress';
      if (initializing > 1) progressClassName += ' ed';
    }

    return (
      <div
        ref="panel"
        id="scrollPanel"
        className={`tloader state-${loaderState} ${className}${progressClassName}`}
        onScroll={e => this.onScroll(e)}
        onTouchStart={e => this.touchStart(e)}
        onTouchMove={e => this.touchMove(e)}
        onTouchEnd={e => this.touchEnd(e)}
        onAnimationEnd={e => this.animationEnd(e)}
      >
        <div className="tloader-symbol">
          <div className="tloader-msg"><i /></div>
          <div className="tloader-loading"><i className="ui-loading" /></div>
        </div>
        <div className="tloader-body" style={style}>{this.props.children}</div>
        {footer}
      </div>
    );
  }
}

FreshContainer.defaultProps = {
  distanceToRefresh: 60,
  autoLoadMore: 1,
};

const mapDispatchToProps = dispatch => ({
  updateScrollDirection(direction) {
    dispatch(actionCreators.UpdateScrollDirection(direction));
  },
  setScrollDistence(value) {
    dispatch(actionCreators.UpdateScrollDistence(value));
  },
});

FreshContainer.propTypes = {
  initializing: PropTypes.number.isRequired,
  autoLoadMore: PropTypes.number,
  hasMore: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  distanceToRefresh: PropTypes.number,
  className: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  setScrollDistence: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(FreshContainer);
