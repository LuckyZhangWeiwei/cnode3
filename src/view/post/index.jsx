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
    if (!this.state.title) {
      toast.error('标题不能为空哦！', {
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
    this.props.postTopic(this.state);
  }

  render() {
    const RadioGroup = Radio.Group;
    return (
      <div style={{ position: 'relative', padding: '20px 10px' }}>
        <Input placeholder="请输入标题" value={this.state.title} onChange={this.titleChange} style={{ marginBottom: '10px' }} />
        <SimpleMDE
          value={this.state.des}
          options={{ placeholder: '请输入内容' }}
          style={{ marginBottom: '10px' }}
          onChange={this.desChange}
        />
        <RadioGroup
          defaultValue={this.state.tab}
          buttonStyle="solid"
          style={{ width: '100%' }}
          onChange={this.tabChange}
          value={this.state.tab}
        >
          <Radio.Button value="share" style={{ textAlign: 'center', width: '22%' }}>分享</Radio.Button>
          <Radio.Button value="ask" style={{ textAlign: 'center', width: '22%' }}>问答</Radio.Button>
          <Radio.Button value="job" style={{ textAlign: 'center', width: '22%' }}>招聘</Radio.Button>
          <Radio.Button value="dev" style={{ textAlign: 'center', width: '34%' }}>客户端测试</Radio.Button>
        </RadioGroup>
        <div style={{ position: 'absolute', Bottom: '50px', textAlign: 'right' }}>
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
  postTopic(data) {
    dispatch(actionCreators.postTopic(data));
  },
});

Post.propTypes = {
  postTopic: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  history: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
