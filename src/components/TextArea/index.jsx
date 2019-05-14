import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import './styles.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { checkAnswer } from '../../actions/answers';

const mapStateToProps = state => {
  return {
    answers: state.answers.get('data'),
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
    answers: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }

  state = {
   value: '',
 };

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
    const { value } = this.state;

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
          <Button
            disabled={ checking }
            color="secondary"
            size='medium'
            variant="contained"
            onClick={ () => this.submitAnswer() }
          >
            Check my answer!
          </Button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TextArea));