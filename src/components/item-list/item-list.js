import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {
  swapiService = new SwapiService();
  state = {
    items: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateList();
  }
  onLoaded = (items) => {
    this.setState({
      items,
      loading: false,
      error: false,
    });
  };
  onError = (err) => {
    this.setState({
      items: null,
      loading: false,
      error: true,
    });
  };

  updateList = () => {
    this.swapiService.getAllPeople().then(this.onLoaded).catch(this.onError);
  };

  render() {
    const { items, loading, error } = this.state;
    const { onPersonSelected } = this.props;
    let elements;
    if (items) {
      elements = items.map((item) => {
        return (
          <li
            key={item.id}
            className="list-group-item"
            onClick={() => onPersonSelected(item.id)}
          >
            {item.name}
          </li>
        );
      });
    }
    const hasData = !(loading || error);
    const spinner = loading ? <Spinner /> : null;
    const errorIndicator = error ? <ErrorIndicator /> : null;
    const content = hasData ? elements : null;
    return (
      <ul className="item-list list-group">
        {errorIndicator}
        {spinner}
        {content}
      </ul>
    );
  }
}
