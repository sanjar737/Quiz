import React, { Component } from 'react';
import cssClasses from './Layout.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import { connect } from 'react-redux';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        }
        this.toggleMenuHandler = this.toggleMenuHandler.bind(this);
    }

    toggleMenuHandler() {
        this.setState(prevState => {
            return {
                menu: !prevState.menu
            }
        })
    }

    render() {
        return (
            <div className={cssClasses.layout}>
                {
                    this.props.isAuthenticated ?
                        <div>
                            <Drawer
                                isOpen={this.state.menu}
                                onClose={this.toggleMenuHandler}
                            />
                            <MenuToggle
                                isOpen={this.state.menu}
                                onToggle={this.toggleMenuHandler}
                            />
                        </div> :
                         null
                }
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)