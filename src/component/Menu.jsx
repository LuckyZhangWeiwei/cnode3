import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Badge } from 'antd';
import { connect } from 'react-redux';
import { tabNames } from '@script/routers';

import '@fonts/svg/nall.svg';
import '@fonts/svg/nask.svg';
import '@fonts/svg/njob.svg';
import '@fonts/svg/ngood.svg';
import '@fonts/svg/nshare.svg';
import '@fonts/svg/nhome.svg';
import '@fonts/svg/nnews.svg';
import '@fonts/svg/nissue.svg';
import '@fonts/svg/nuser.svg';

@withRouter
@connect(state => ({ unreadNum: state.getIn(['userInfo', 'unreadNum']) }))
class TabNav extends React.Component {
  render() {
    const tabItems = this.props.tabnav.map((item) => {
      return (
        <li key={item.name}>
          {
            item.name === '消息' ?
              <Badge count={this.props.unreadNum}>
                <NavLink replace exact to={{ pathname: item.link }} activeClassName="nav-selected">
                  <svg className={`svg svg-nav-default svg-n${item.type}`}>
                    <use xlinkHref={`#n${item.type}`} fill="#cfd6dc" />
                  </svg>
                  <svg className={`svg svg-nav-active svg-n${item.type}`}>
                    <use xlinkHref={`#n${item.type}`} fill="#2d78f4" />
                  </svg>
                  <p className="ft-grey">{item.name}</p>
                </NavLink>
              </Badge>
            :
              <NavLink replace exact to={{ pathname: item.link }} activeClassName="nav-selected">
                <svg className={`svg svg-nav-default svg-n${item.type}`}>
                  <use xlinkHref={`#n${item.type}`} fill="#cfd6dc" />
                </svg>
                <svg className={`svg svg-nav-active svg-n${item.type}`}>
                  <use xlinkHref={`#n${item.type}`} fill="#2d78f4" />
                </svg>
                <p className="ft-grey">{item.name}</p>
              </NavLink>
          }
        </li>
      );
    });
    return (
      <ul data-layout="layout" data-layout-align="space-between center">
        {tabItems}
      </ul>
    );
  }
}
TabNav.propTypes = {
  tabnav: PropTypes.array.isRequired,
  unreadNum: PropTypes.number,
};


@withRouter
class Menu extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      return true;
    }
    return false;
  }

  render() {
    const className = `footer-menu pf w100 bl0 z1 ${this.props.className}`;
    return (
      <div className={className}>
        <TabNav tabnav={tabNames} />
      </div>
    );
  }
}

Menu.defaultProps = {
  className: '',
};

Menu.propTypes = {
  className: PropTypes.string,
  location: PropTypes.object,
};

export default Menu;
