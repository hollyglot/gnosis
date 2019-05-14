import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { getQuestions, setCurrentQuestion } from '../../actions/questions';
import LoadingIndicator from '../../components/LoadingIndicator';
import TextArea from '../../components/TextArea';
import { QUESTION_KEYS } from '../../models/Question';

const mapStateToProps = state => {
  return {
    questions: state.questions.get('data'),
    options: state.questions.get('options'),
    loading: state.questions.get('loading'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export class Quiz extends Component {
  static propTypes = {
    questions: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getQuestions());
  }

  renderLoader() {
    return (<LoadingIndicator />);
  }

  renderQuestions() {
    const { questions, options } = this.props;

    if (questions.size === 0) {
      return "Unable to load questions at this time.";
    }

    const currentPosition = options.get(QUESTION_KEYS.CURRENT_QUESTION);
    const currentQuestion = questions.get(currentPosition);

    if (currentQuestion.choices.size) {
      return (<Typography variant="h6" color="inherit">
        so many choices...
      </Typography>);
    }

    return (<TextArea question={ currentQuestion } />);
  }

  render() {
    const { loading } = this.props;
    return (
      <Grid container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={ 24 }
      >
        <Grid item xs={ 12 } md={ 12 } lg={ 12 } style={{ paddingTop: 48 }}>
          <Typography variant="h4" color="inherit">
            Test your knowledge
          </Typography>
          <hr />
        </Grid>
        <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
          { loading ? this.renderLoader()
            : this.renderQuestions()
          }
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
