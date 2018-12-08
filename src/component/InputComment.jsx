import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '@fonts/svg/send.svg';
import 'simplemde/dist/simplemde.min.css';

const InputComment = (props) => {
  return (
    <div id="room-speak" className="room-speak">
      <div data-layout-align="space-between center" data-layout="layout">
        <div
          className="bg-white small-avatar-wrap"
          data-layout="layout"
          data-layout-flex="0"
          data-layout-align="center center"
        >
          <Link
            to={{
              pathname: '/user',
            }}
          >
            <img
              className="small-author-avatar bdr-half"
              src={props.avatar_url}
              alt=""
            />
          </Link>
        </div>
        <div className="ipt-txt-wrap w100 pr">
          <input
            placeholder="朕说两句..."
            type="text"
            className="ipt w100"
          />
        </div>
        <div className="speak-submit-wrap bg-white">
          <button
            id="btn-speak-submit"
            type="submit"
            className="btn-speak-submit bg-white w100"
          >
            <svg className="svg svg-send" data-svg-wh="1">
              <use xlinkHref="#send" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

InputComment.propTypes = {
  avatar_url: PropTypes.string.isRequired,
};

export default InputComment;
