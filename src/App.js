import React,{Component} from 'react';
import Layout from "./Layout/Layout";
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Quiz from "./Containers/Quiz/Quiz";
import QuizList from "./Containers/QuizLIst/QuizLIst";
import Auth from './Containers/Auth/Auth'
import QuizCreator from "./Containers/QuizCreator/QuizCreator";
import {connect} from "react-redux";
import Logout from "./Components/Logout/Logout";
import {autoLogin} from "./store/actions/authAction";

class App extends Component {

    componentDidMount() {
        this.props.autoLogin()
    }

    render() {
        let routes = (
            <Switch>
                <Route path={'/auth'} component={Auth}/>
                <Route path={'/quiz/:id'} component={Quiz}/>
                <Route path={'/'} exact component={QuizList}/>
                <Redirect to={'/'}/>
            </Switch>
        )
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path={'/quiz-creator'} component={QuizCreator}/>
                    <Route path={'/quiz/:id'} component={Quiz}/>
                    <Route path={'logout'} component={Logout}/>
                    <Route path={'/'} exact component={QuizList}/>
                    <Redirect to={'/'}/>
                </Switch>
            )
        }
        return(
            <Layout>
                {routes}
            </Layout>
        )
    }



}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.authReducer.token
    }
}

function mapDispatchToProps(dispatch) {
    return{
        autoLogin: () => dispatch(autoLogin())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
