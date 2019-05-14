import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

function ResetQuiz(props) {
  const { reset, disabled } = props;
  return (
    <Button
      disabled={ disabled }
      color="secondary"
      size='medium'
      variant="contained"
      onClick={ () => reset() }
      style={{ marginTop: 36 }}
    >
      Try Again!
    </Button>
  );
}

ResetQuiz.propTypes = {
  reset: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ResetQuiz;
