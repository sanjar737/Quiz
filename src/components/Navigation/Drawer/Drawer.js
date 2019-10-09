import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import cssClasses from './Drawer.module.css';
import Backdrop from '../../Ui/Backdrop/Backdrop';

const links = [
    {to: '/', exact: true, label: 'Список'},
    {to: '/auth', exact: false, label: 'Авторизация'},
    {to: '/quiz-creator', exact: false, label: 'Создать тест'}
]

export default class Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink 
                        onClick={this.props.onClose} 
                        exact={link.exact} 
                        to={link.to}  
                        activeClassName={cssClasses.active}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const classes = [cssClasses.drawer];
        if (!this.props.isOpen) {
            classes.push(cssClasses.close)
        }
        return (
            <Fragment>
                <nav className={classes.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </Fragment>

        )
    }
}