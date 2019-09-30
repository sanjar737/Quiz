import React, { Component } from 'react';
import Header from './components/Header/Header';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Header />
        )
    }
}