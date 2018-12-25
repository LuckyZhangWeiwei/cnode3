import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LazyImage from '@component/LazyImage';
import { formatDate } from '@script/utils';

import '@fonts/svg/write.svg';
import '@fonts/svg/page-views.svg';

const TitleType = props => (
  <span className={`${props.color} ft-white mgr title-type`}>{props.type}</span>
);
TitleType.defaultProps = {
  color: 'bg-sgrey',
};

TitleType.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string,
};

const getContentType = (item) => {
  if (item.get('top')) {
    return <TitleType color="bg-color" type="置顶" />;
  }
  if (item.get('good')) {
    return <TitleType color="bg-color" type="精华" />;
  }
  switch (item.get('tab')) {
    case 'share':
      return <TitleType type="分享" />;
    case 'good':
      return <TitleType color="bg-olor" type="精华" />;
    case 'ask':
      return <TitleType type="问答" />;
    case 'job':
      return <TitleType type="招聘" />;
    case 'dev':
      return <TitleType type="测试" />;
    default:
      return null;
  }
};


const Content = (props) => {
  const { info: item, isLink } = props;
  return (
    <div data-layout="layout" data-layout-align="start center">
      {
          props.isLazyImg ? (
            <Link to={{
              pathname: '/otheruser',
              search: `?username=${item.getIn(['author', 'loginname'])}`,
              }
           }>
              <LazyImage
                className="author-avatar mgr bd-radius"
                src={item.getIn(['author', 'avatar_url'])}
                data-layout-flex="0"
                alt=""
              />
            </Link>
          ) : (
            <Link to={{
              pathname: '/otheruser',
              search: `?username=${item.getIn(['author', 'loginname'])}`,
          }}>
              <img
                className="author-avatar mgr bd-radius"
                src={item.getIn(['author', 'avatar_url'])}
                data-layout-flex="0"
                alt=""
              />
            </Link>
          )
      }
      {
          isLink ?
            <Link
              to={{
              pathname: '/index/article-details',
              search: `?id=${item.get('id')}`,
              state: {
                  id: item.get('id'),
              },
              }}
              className="w100"
              data-ellipsis
            >
              <div style={{ marginLeft: '.5rem' }}>
                <h3 data-ellipsis>
                  {getContentType(item)}
                  {item.get('title')}
                </h3>
                <div
                  className="numFt mgtb"
                  data-layout="layout"
                  data-layout-align="space-between center"
                >
                  <span>
                    <svg className="svg svg-write">
                      <use xlinkHref="#write" fill="#b6b6b6" />
                    </svg>
                    {item.getIn(['author', 'loginname'])}
                  </span>
                  {formatDate(item.get('create_at'))}
                </div>
                <div
                  className="numFt"
                  data-layout="layout"
                  data-layout-align="space-between center"
                >
                  <span>
                    <svg className="svg svg-write">
                      <use xlinkHref="#page-views" fill="#b6b6b6" />
                    </svg>
                    {item.get('reply_count')}/{item.get('visit_count')}
                  </span>
                  {formatDate(item.get('last_reply_at'))}
                </div>
              </div>
            </Link>
              :
            <div data-ellipsis className="w100">
              <h3 data-ellipsis>
                {getContentType(item)}
                {item.get('title')}
              </h3>
              <div
                className="numFt mgtb"
                data-layout="layout"
                data-layout-align="space-between center"
              >
                <span>
                  <svg className="svg svg-write">
                    <use xlinkHref="#write" fill="#b6b6b6" />
                  </svg>
                  {item.getIn(['author', 'loginname'])}
                </span>
                {formatDate(item.get('create_at'))}
              </div>
              <div
                className="numFt"
                data-layout="layout"
                data-layout-align="space-between center"
              >
                <span>
                  <svg className="svg svg-write">
                    <use xlinkHref="#page-views" fill="#b6b6b6" />
                  </svg>
                  {item.get('reply_count')}/{item.get('visit_count')}
                </span>
                {formatDate(item.get('last_reply_at'))}
              </div>
            </div>
      }
    </div>
  );
};

Content.defaultProps = {
  isLazyImg: true,
};

Content.propTypes = {
  info: PropTypes.object.isRequired,
  isLink: PropTypes.bool.isRequired,
  isLazyImg: PropTypes.bool,
};

const TopicItem = (props) => {
  const item = props.info;
  return (
    <div className={`article-item ${props.addclass ? props.addclass : ''}`}>
      <Content {...props} info={item} isLink={props.isLinks} />
    </div>
  );
};

TopicItem.defaultProps = {
  isLinks: true,
};

TopicItem.propTypes = {
  info: PropTypes.object.isRequired,
  isLinks: PropTypes.bool,
  addclass: PropTypes.string,
};

export default TopicItem;
