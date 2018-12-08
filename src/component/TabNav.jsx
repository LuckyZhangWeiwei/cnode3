import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { categories } from '@script/routers';

@withRouter
class TabNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: 'all',
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      selectedType: props.selectedTab,
    });
  }

  render() {
    return (
      <nav className="pf w100 l0 z1 nav-top-fixed">
        <ul
          className="tab-nav-list bg-white tc"
          data-layout="layout"
          data-layout-align="space-between center"
        >
          {categories.map(item => (
            <li key={item.name}>
              <NavLink replace to={item.link} className={item.type === this.state.selectedType ? 'nav-selected' : 'ft-color'}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

TabNav.propTypes = {
  selectedTab: PropTypes.string,
};

export default TabNav;
