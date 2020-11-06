import React, {Component} from 'react'
import './Layout.sass'
import MenuToggle from "../Navigation/MenuToggle/MenuToggle";
import Drawer from "../Navigation/Drawer/Drawer";
import {connect} from "react-redux";

class Layout extends Component {

    state = {
        menu: false
    }


    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    closeMenu =() => {
        this.setState({
            menu: false
        })
    }

    render() {
        return (
            <div className={'Layout'}>

                <Drawer
                    isOpen={this.state.menu}
                    onClickHandler={this.closeMenu}
                    isAuthenticated={this.props.isAuthenticated}
                />

                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />

                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        isAuthenticated: state.authReducer.token
    }
}

export default connect(mapStateToProps)(Layout)