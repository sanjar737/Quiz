import React, { Component } from 'react';
import cssClasses from './Layout.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        }
        this.toggleMenuHandler=this.toggleMenuHandler.bind(this);
    }

    toggleMenuHandler() {
        this.setState(prevState =>  {
            return {
                menu: !prevState.menu
            }
        })
    }

    render() {
        return (
            <div className={cssClasses.layout}>
                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.toggleMenuHandler}
                />
                <MenuToggle 
                    isOpen={this.state.menu}
                    onToggle={this.toggleMenuHandler}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}