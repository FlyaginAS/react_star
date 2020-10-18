import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';
import ErrorButton from '../error-button/error-button';

export default class App extends Component {
  state = {
    selectedPerson: null,
    hasError: false,
  };
  componentDidCatch(err) {
    console.log('componentDidCatch');
    this.setState({ hasError: true });
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id,
    });
  };

  render() {
    if (this.state.hasError) {
      return <span>OOps... the error</span>;
    }

    return (
      <div>
        <Header />
        <RandomPlanet />
        <ErrorButton />
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onPersonSelected={this.onPersonSelected} />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>
      </div>
    );
  }
}
