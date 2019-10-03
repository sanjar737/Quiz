import React, { Component, Fragment } from 'react';
import cssClasses from './Drawer.module.css';
import Backdrop from '../../Ui/Backdrop/Backdrop';

const links = [1, 2, 3]
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
                    <a href='/'>
                        Link {link}
                    </a>
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