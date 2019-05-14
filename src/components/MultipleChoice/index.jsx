import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from '@material-ui/core/styles';
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
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class MultipleChoice extends Component {
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


  submitAnswer() {
    const { dispatch, question } = this.props;
    const { value } = this.state;
    dispatch(checkAnswer(question.get('id'), value));
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { checking, classes, question } = this.props;
    const choices = question.get('choices');

    return (
      <div className='multiple-choice'>
        <Typography variant='h6' color='inherit'>
          { question.get('question') }
        </Typography>
        <form className='flex-columns' noValidate autoComplete='off'>
          <FormControl component="fieldset" className={ classes.formControl } style={{ marginTop: 12 }}>
            <RadioGroup
              aria-label="multiple choice"
              name="multiple-choice"
              className={ classes.group }
              value={ this.state.value }
              onChange={ this.handleChange }
            >
              { choices.map((choice) => {
                  return (<FormControlLabel key={ uuidv4() } value={ choice }
                    control={<Radio color="primary" style={{ paddingTop: 6, paddingBottom: 6 }} />}
                    label={ choice } />);
                })
              }
            </RadioGroup>
          </FormControl>
          <SubmitAnswer
            disabled={ checking }
            onSubmit={ () => this.submitAnswer() }
          />
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MultipleChoice));
