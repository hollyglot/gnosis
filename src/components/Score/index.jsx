import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

function Score(props) {
  const { score } = props;
  return (
    <Typography variant='h5' color='primary'>
      Your score: { score }
    </Typography>
  );
}

Score.propTypes = {
  score: PropTypes.number.isRequired,
};

export default Score;
