import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

function SubmitAnswer(props) {
  const { onSubmit, disabled } = props;
  return (
    <Button
      disabled={ disabled }
      color="secondary"
      size='medium'
      variant="contained"
      onClick={ () => onSubmit() }
    >
      Check my answer!
    </Button>
  );
}

SubmitAnswer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default SubmitAnswer;
