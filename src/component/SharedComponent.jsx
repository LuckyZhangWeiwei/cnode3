import React from 'react';
import PropTypes from 'prop-types';

export const LoadLoop = () => <div className="tc pdtb">玩命加载中...</div>;
export const LoadFail = () => <div className="tc pdtb">加载失败!</div>;
export const NotResult = props => <div className="tc pdtb">{props.text}</div>;

NotResult.defaultProps = {
  text: '暂无数据!',
};

NotResult.propTypes = {
  text: PropTypes.string,
};
