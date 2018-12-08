import React from 'react';
import PropTypes from 'prop-types';

const Mask = (props) => {
  const { cancel, logout, title } = props;
  return (
    <div className="mask-layer">
      <div className="tab-wrap">
        <div className="tab-wrap-cell">
          <div className="confirm-popups tc">
            <h2 className="confirm-title">{title}</h2>
            <div
              className="confirm-btn"
              data-layout-align="space-between center"
              data-layout="layout"
            >
              <button
                onClick={cancel}
                className="confirm-btn-no"
              >
                取消
              </button>
              <button
                onClick={logout}
                className="confirm-btn-yes"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Mask.defaultProps = {
  title: '标题',
};

Mask.propTypes = {
  cancel: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Mask;
