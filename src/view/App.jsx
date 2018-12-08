import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { BackTop } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { tabs } from '@script/routers';
import classNames from 'classnames';
import Menu from '@component/Menu';
import Header from '@component/Header';
import '@fonts/svg/gotop.svg';

const findMatch = path => tabs.find(f => f.path === path);

class App extends React.Component {
  render() {
    const isUserCur = true;
    const queryName = null;
    const arrPathName = ['/index/article-details', '/', '/news', '/user'];
    const { pathname } = this.props.location;
    const getRoutes = findMatch(pathname);
    const isBackTop = arrPathName.includes(pathname);
    const isAdd = getRoutes && pathname.split('/').length < 3;
    const classMain = classNames('tl0 w100 view-main', {
      'pa h100': Object.is(pathname, '/'),
      container: isAdd,
      'container-top': !isAdd,
      'bg-white': Object.is(pathname, '/share'),
    });
    return (
      <section className={classMain} style={{ overflow: 'hidden' }}>
        <Header isBack={!isUserCur} title={isUserCur ? getRoutes.name : queryName} />
        <Switch>
          {
            tabs.map(item => (
              <Route key={item.path} exact path={item.path} component={item.component} />
            ))
          }
        </Switch>
        { isAdd && <Menu className={this.props.scrollDirection === 'down' ? 'menu' : null} />}
        {isBackTop && (
          <BackTop
            className="bg-transparent ft-white"
            data-layout="layout"
            data-layout-align="center center"
            style={{ marginBottom: '1.5rem' }}
          >
            <svg className="svg svg-gotop">
              <use xlinkHref="#gotop" fill="#fff" />
            </svg>
          </BackTop>
        )}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  scrollDirection: state.getIn(['home', 'scrollDirection']),
});

App.propTypes = {
  location: PropTypes.object.isRequired,
  scrollDirection: PropTypes.string.isRequired,
};

export default withRouter(connect(mapStateToProps, null)(App));
