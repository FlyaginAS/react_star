import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import './person-details.css';

export default class PersonDetails extends Component {
  swapiService = new SwapiService();
  state = {
    person: null,
    loading: true,
    error: false,
  };
  componentDidMount() {
    this.updatePerson();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props === prevProps) return;
    this.updatePerson();
    this.setState({ loading: true });
  }
  updatePerson = () => {
    if (!this.props.personId) {
      return;
    }
    this.swapiService
      .getPerson(this.props.personId)
      .then(this.onLoad)
      .catch(this.onError);
  };
  onLoad = (person) => {
    this.setState({
      person,
      loading: false,
      error: false,
    });
  };
  onError = () => {
    this.setState({
      person: null,
      loading: false,
      error: true,
    });
  };

  render() {
    if (!this.state.person) {
      return <span>Select a person </span>;
    }
    const { person, loading, error } = this.state;
    const hasData = !(loading || error);
    const spinner = loading ? <Spinner /> : null;
    const errorIndicator = error ? <ErrorIndicator /> : null;
    const content = hasData ? <PersonView person={person} /> : null;
    return (
      <div className="person-details card">
        {spinner}
        {errorIndicator}
        {content}
      </div>
    );
  }
}

const PersonView = (props) => {
  const { id, name, gender, birthYear, eyeColor } = props.person;
  return (
    <React.Fragment>
      <img
        className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
      />

      <div className="card-body">
        <h4>{name} </h4>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
