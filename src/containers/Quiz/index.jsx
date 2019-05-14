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
import ErrorMessage from '../../components/ErrorMessage';
import LoadingIndicator from '../../components/LoadingIndicator';
import MultipleChoice from '../../components/MultipleChoice';
import ResetQuiz from '../../components/ResetQuiz';
import Score from '../../components/Score';
import TextArea from '../../components/TextArea';
import { QUESTION_KEYS } from '../../models/Question';

const mapStateToProps = state => {
  return {
    questions: state.questions.get('data'),
    questionsError: state.questions.get('errorMessage'),
    questionsOptions: state.questions.get('options'),
    answers: state.answers.get('data'),
    answersError: state.answers.get('errorMessage'),
    checkingAnswer: state.answers.get('loading'),
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
    questionsOptions: PropTypes.object.isRequired,
    questionsError: PropTypes.string.isRequired,
    answers: PropTypes.object.isRequired,
    answersError: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor() {
    super();

    this.state = {
      openDialog: false,
      previousAnswer: null,
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getQuestions());
  }

  componentWillReceiveProps(nextProps) {
    const { answers, questions, questionsOptions } = this.props;
    const { answers: nextAnswers, checkingAnswer, questionsOptions: nextOptions } = nextProps;

    const questionChange = questionsOptions.get(QUESTION_KEYS.CURRENT_QUESTION) !== nextOptions.get(QUESTION_KEYS.CURRENT_QUESTION);

    if (questionChange) {
      const prevPosition = questionsOptions.get(QUESTION_KEYS.CURRENT_QUESTION);
      const prevQuestion = questions.get(prevPosition);
      const prevAnswer = prevQuestion ? answers.get(prevQuestion.get('id')) : null;
      if (prevAnswer) {
        this.setState({ previousAnswer: prevAnswer });
      }
    }

    if ((nextAnswers.size !== 0) && (answers.size !== nextAnswers.size) && !checkingAnswer) {
      this.setState({ openDialog: true });
    }
  }

  getNextQuestion() {
    const { dispatch, questionsOptions } = this.props;
    const currentPosition = questionsOptions.get(QUESTION_KEYS.CURRENT_QUESTION);
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
    const { answers, questions, questionsError, questionsOptions } = this.props;

    const errorMessage = "Unable to load questions at this time.";
    if (questionsError.length) {
      return (<ErrorMessage message={ errorMessage } />);
    }
    if (questions.size === 0) {
      return (<ErrorMessage message={ errorMessage } />);
    }


    const currentPosition = questionsOptions.get(QUESTION_KEYS.CURRENT_QUESTION);
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

    if (currentQuestion.choices.size) {
      return (<MultipleChoice question={ currentQuestion } />);
    }

    return (<TextArea question={ currentQuestion } />);
  }

  render() {
    const { answers, answersError, loading, questions, questionsOptions } = this.props;
    const { openDialog, previousAnswer } =  this.state;

    let currentAnswer;
    if (questions.size) {
      const currentPosition = questionsOptions.get(QUESTION_KEYS.CURRENT_QUESTION);
      const currentQuestion = questions.get(currentPosition);
      const answer = currentQuestion ? answers.get(currentQuestion.get('id')) : null;
      currentAnswer = answer || previousAnswer;
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
          { answersError.length ?
            (<ErrorMessage message='An unexpected error has occurred.' />)
            :  null
          }
          { loading ? this.renderLoader()
            : this.renderQuestions()
          }
          <Dialog open={ openDialog } onClose={ () => this.closeDialog() }>
            <AnswerValidation
              valid={ currentAnswer ? currentAnswer.get('valid') : false }
              closeDialog={ () => this.closeDialog() }
            />
          </Dialog>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
