import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { Radio, Input, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import 'simplemde/dist/simplemde.min.css';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { actionCreators } from '@view/post/store';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      des: null,
      tab: 'dev',
    };
    this.titleChange = this.titleChange.bind(this);
    this.desChange = this.desChange.bind(this);
    this.tabChange = this.tabChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.postArticle = this.postArticle.bind(this);
  }

  componentDidMount() {
    if (!this.props.isLogin) {
      this.props.history.push('/user/login?search=/share');
    }
  }

  titleChange(event) {
    this.setState({
      ...this.state,
      title: event.target.value,
    });
  }

  desChange(value) {
    this.setState({
      ...this.state,
      des: value,
    });
  }

  tabChange(event) {
    this.setState({
      ...this.state,
      tab: event.target.value,
    });
  }

  clearForm() {
    this.setState({
      title: null,
      des: null,
      tab: 'dev',
    });
  }

  postArticle() {
    return new Promise(() => {
      if (!this.state.title) {
        toast.error('标题不能为空哦！', {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      } else if (this.state.title.length < 10) {
        toast.error('标题不能小于10个字哦！', {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      } else if (!this.state.des) {
        toast.error('内容不能为空哦!', {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      } else if (this.state.des.length < 10) {
        toast.error('内容不能少于10个字!', {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
      this.props.postTopic(this.state, () => { this.props.history.push(`/?tab=${this.state.tab}`); });
    });
  }

  render() {
    const RadioGroup = Radio.Group;
    return (
      <div className="post">
        <Input
          placeholder="请输入标题"
          value={this.state.title}
          onChange={this.titleChange}
          className="control"
        />
        <SimpleMDE
          value={this.state.des}
          options={{
            placeholder: '请输入内容',
            spellChecker: false,
          }}
          style={{ marginBottom: '10px' }}
          onChange={this.desChange}
        />
        <RadioGroup
          defaultValue={this.state.tab}
          className="control"
          onChange={this.tabChange}
          value={this.state.tab}
        >
          <Radio.Button value="share" className="radio-item">分享</Radio.Button>
          <Radio.Button value="ask" className="radio-item">问答</Radio.Button>
          <Radio.Button value="job" className="radio-item">招聘</Radio.Button>
          <Radio.Button value="dev" className="radio-item" style={{ width: '34%' }}>客户端测试</Radio.Button>
        </RadioGroup>
        <div className="button-container" style={{ textAlign: 'center' }}>
          <Button onClick={this.postArticle} type="primary" style={{ marginRight: '15px' }} >提 交</Button>
          <Button onClick={this.clearForm}>清 空</Button>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.getIn(['login', 'isLogin']),
});

const mapDispatchToProps = dispatch => ({
  postTopic(data, func) {
    dispatch(actionCreators.postTopic(data, func));
  },
});

Post.propTypes = {
  postTopic: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
