import React,{Component} from "react";
import './Drawer.sass'
import {NavLink} from 'react-router-dom'


export default class Drawer extends Component{

    onCLickHandlerClose = () => {
        this.props.onClickHandler()
    }


    renderLinks(links){
        return links.map((link, index) => {
            return(
                <li key={index}>
                    <NavLink
                        to={link.path}
                        exact={link.exact}
                        onClick={this.onCLickHandlerClose}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {

        const cls = [
            'Drawer',
        ]

        if(!this.props.isOpen){
            cls.push('close')
        }

        const links = [
            {path: '/', label: 'List of tests', exact: true},
        ]

        if(this.props.isAuthenticated){
            links.push({path: '/quiz-creator', label: 'quiz-creator', exact: true})
            links.push({path: '/logout', label: 'logout', exact: true})
        }else {
            links.push({path: '/auth', label: 'authentication', exact: false})
        }

        return(
            <nav className={cls.join(' ')}>
                <ul>
                    {this.renderLinks(links)}
                </ul>
            </nav>
        )
    }
}