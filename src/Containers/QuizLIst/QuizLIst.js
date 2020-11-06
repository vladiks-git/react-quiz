import React, {Component} from "react";
import './QuizList.sass'
import {NavLink} from "react-router-dom";
import Loader from "../../Components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizes} from "../../store/actions/quizActions";

class QuizLIst extends Component {



    renderQuizes = () => {
        return this.props.quizes.map((quiz ,index) => {
            return(
                <li key={index}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }


     componentDidMount() {
        this.props.fetchQuizes()
    }

    render() {
        return (
            this.props.quizes.length === 0 && this.props.loading
                ? <Loader/>
                :
            <div className={'QuizList'}>
               <div>
                   <h1>Список тестов</h1>
                   <ul>
                       {this.renderQuizes()}
                   </ul>
               </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        quizes: state.quizReducer.quizes,
        loading: state.quizReducer.loading
    }
}

function mapDispatchToProps(dispatch) {
    return{
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizLIst)
