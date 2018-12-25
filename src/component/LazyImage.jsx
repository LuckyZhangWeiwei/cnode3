import React from 'react';
import Image from 'react-lazy-image';
import PropTypes from 'prop-types';

const LazyImage = props => (
  <Image
    {...props}
    defaultSource={require('@images/favicon.ico')}
    source={props.src}
    offset={1000}
  />
);

LazyImage.defaultProps = {
  src: '',
};

LazyImage.propTypes = {
  src: PropTypes.string,
};

export default LazyImage;
