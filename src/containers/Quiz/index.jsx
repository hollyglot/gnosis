import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.css';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { clearAnswers } from '../../actions/answers';
import { getQuestions, setCurrentQuestion } from '../../actions/questions';
import AnswerValidation from '../../components/AnswerValidation';
import LoadingIndicator from '../../components/LoadingIndicator';
import MultipleChoice from '../../components/MultipleChoice';
import ResetQuiz from '../../components/ResetQuiz';
import Score from '../../components/Score';
import TextArea from '../../components/TextArea';
import { QUESTION_KEYS } from '../../models/Question';

const mapStateToProps = state => {
  return {
    questions: state.questions.get('data'),
    answers: state.answers.get('data'),
    checkingAnswer: state.answers.get('loading'),
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

  constructor() {
    super();

    this.state = {
      openDialog: false,
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getQuestions());
  }

  componentWillReceiveProps(nextProps) {
    const { answers } = this.props;
    const { answers: nextAnswers, checkingAnswer } = nextProps;

    if ((nextAnswers.size !== 0) && (answers.size !== nextAnswers.size) && !checkingAnswer) {
      this.setState({ openDialog: true });
    }
  }

  getNextQuestion() {
    const { dispatch, options } = this.props;
    const currentPosition = options.get(QUESTION_KEYS.CURRENT_QUESTION);
    dispatch(setCurrentQuestion(currentPosition + 1));
  }

  resetQuiz() {
    const { dispatch } = this.props;
    dispatch(clearAnswers());
    dispatch(getQuestions());
  }

  closeDialog() {
    this.setState({ openDialog: false });
    this.getNextQuestion();
  };

  renderLoader() {
    return (<LoadingIndicator />);
  }

  renderQuestions() {
    const { answers, questions, options } = this.props;

    if (questions.size === 0) {
      return "Unable to load questions at this time.";
    }


    const currentPosition = options.get(QUESTION_KEYS.CURRENT_QUESTION);
    if (currentPosition === questions.size) {
      const score = answers.reduce((amount, answer) => {
        return amount + (answer.valid ? 1 : 0);
      }, 0);
      return (<div>
        <Score score={ score } />
        <ResetQuiz reset={ () => this.resetQuiz() }/>
      </div>);
    }
    const currentQuestion = questions.get(currentPosition);

    if (!currentQuestion) {
      return "Unable to load questions at this time.";
    }

    if (currentQuestion.choices.size) {
      return (<MultipleChoice question={ currentQuestion } />);
    }

    return (<TextArea question={ currentQuestion } />);
  }

  render() {
    const { answers, loading, options, questions } = this.props;
    const { openDialog } =  this.state;

    let currentAnswer;
    if (questions.size) {
      const currentPosition = options.get(QUESTION_KEYS.CURRENT_QUESTION);
      const currentQuestion = questions.get(currentPosition);
      currentAnswer = currentQuestion ? answers.get(currentQuestion.get('id')) : undefined;
    }

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
          <Dialog open={ openDialog } onClose={ () => this.closeDialog() }>
            <AnswerValidation
              valid={ currentAnswer ? currentAnswer.valid : false }
              closeDialog={ () => this.closeDialog() }
            />
          </Dialog>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
