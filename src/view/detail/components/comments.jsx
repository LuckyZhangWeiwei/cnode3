import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { is } from 'immutable';
import CommentItem from '@component/CommentItem';

class Comments extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !is(this.props.comments, nextProps.comments);
  }
  render() {
    return (
      this.props.comments ?
        this.props.comments.map((item, index) => {
          return <CommentItem key={item.get('id')} item={item} index={index} addclass="mgt bg-white" />;
        })
        :
        null
    );
  }
}

const mapStateToProps = state => ({
  comments: state.getIn(['detail', 'detail', 'replies']),
});

Comments.propTypes = {
  comments: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(Comments);
