import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.css';
import Typography from '@material-ui/core/Typography';

import { getQuestions } from '../../actions/questions';

const mapStateToProps = state => {
  return {
    questions: state.questions.get('data'),
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
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getQuestions());
  }

  renderLoader() {
    return "LOADING...";
  }

  renderQuestions() {
    const { questions } = this.props;

    if (questions.size === 0) {
      return "Unable to load questions at this time.";
    }

    return (
      <ul className='questions list'>
        { questions.map((question) => {
            return (<li>{ question.question }</li>);
          })
        }
      </ul>
    );
  }

  render() {
    const { loading } = this.props;
    return (
      <div className="quiz">
        <Typography variant="h4" color="inherit">
          Test your knowledge
        </Typography>
        <hr />
        { loading ? this.renderLoader()
          : this.renderQuestions()
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
