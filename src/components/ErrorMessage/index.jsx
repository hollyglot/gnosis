import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';

function ErrorMessage(props) {
  const { message } = props;
  const color = red[700];

  return (
    <div className='error-message' style={{ marginBottom: 24 }}>
      <Typography variant='h6' id='message' style={{ color: color }}>
        { message }
      </Typography>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
