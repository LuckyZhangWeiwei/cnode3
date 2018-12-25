import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import '@fonts/svg/send.svg';

class InputComment extends React.Component {
  constructor(props) {
    super(props);
    this.postArticle = this.postArticle.bind(this);
    this.changeText = this.changeText.bind(this);
    this.state = {
      reply: null,
    };
  }
  postArticle() {
    if (!this.state.reply) {
      toast.error('内容不能为空哦！', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      this.props.postComment(this.state.reply);
      this.setState({
        reply: null,
      });
    }
  }
  changeText(event) {
    this.setState({
      reply: event.target.value,
    });
  }
  render() {
    const { TextArea } = Input;
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
                src={this.props.avatar_url}
                alt=""
              />
            </Link>
          </div>
          <div className="ipt-txt-wrap w100 pr">
            <TextArea
              placeholder="朕说两句..."
              onChange={this.changeText}
              value={this.state.reply}
              autosize={{ minRows: 1, maxRows: 18 }}
              ref="inputComment"
            />
          </div>
          <div className="speak-submit-wrap bg-white">
            <button
              id="btn-speak-submit"
              type="submit"
              className="btn-speak-submit bg-white w100"
              onClick={this.postArticle}
            >
              <svg className="svg svg-send" data-svg-wh="1">
                <use xlinkHref="#send" />
              </svg>
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

InputComment.propTypes = {
  avatar_url: PropTypes.string.isRequired,
  postComment: PropTypes.func.isRequired,
};

export default InputComment;
