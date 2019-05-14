import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import SubmitAnswer from '../SubmitAnswer';
import { checkAnswer } from '../../actions/answers';

const mapStateToProps = state => {
  return {
    checking: state.answers.get('loading')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class TextArea extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }

  constructor() {
    super();

    this.state = {
      value: '',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submitAnswer() {
    const { dispatch, question } = this.props;
    const { value } = this.state;
    dispatch(checkAnswer(question.get('id'), value));
  }

  render() {
    const { checking, classes, question } = this.props;

    return (
      <div className='text-area'>
        <Typography variant='h6' color='inherit'>
          { question.question }
        </Typography>
        <form className='flex-columns' noValidate autoComplete='off'>
          <TextField
            id='text-area-multiline'
            label='Enter your answer'
            multiline
            fullWidth
            rows='2'
            style={{ marginTop: 16, marginBottom: 24, marginLeft: 0 }}
            className={ classes.textField }
            margin='normal'
            variant='outlined'
            value={ this.state.value }
            onChange={ this.handleChange('value') }
          />
          <SubmitAnswer
            disabled={ checking }
            onSubmit={ () => this.submitAnswer() }
          />
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TextArea));
