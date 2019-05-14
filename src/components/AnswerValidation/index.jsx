import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';

function AnswerValidation(props) {
  const { classes, closeDialog, valid } = props;
  const color = valid ? teal[800] : red[700];
  const width = window.innerWidth > 400 ? 400 : '100%';

  return (
    <div className='answer-notification' style={{ padding: 30, textAlign: 'center', width }}>
      { valid ?
        (<div>
          <i className='material-icons' style={{ color: color, fontSize: 96, height: 96, width: 96 }}>
            check
          </i>
          <Typography variant='h6' id='dialog-title' style={{ color: color }}>
            CORRECT!
          </Typography>
        </div>)

      : (<div>
          <i className='material-icons' style={{ color: color, fontSize: 96, height: 96, width: 96 }}>
            close
          </i>
          <Typography variant='h6' id='dialog-title' style={{ color: color }}>
            INCORRECT
          </Typography>
        </div>)
      }
      <Button
        color="primary"
        size='medium'
        variant="contained"
        onClick={ () => closeDialog() }
        style={{ marginTop: 24 }}
      >
        Next Question
      </Button>
    </div>
  );
}

AnswerValidation.propTypes = {
  classes: PropTypes.object.isRequired,
  closeDialog: PropTypes.func.isRequired,
  valid: PropTypes.bool
};

export default AnswerValidation;
