import React, { Component } from 'react';
// import { combineReducers } from 'redux';
import * as Loop from 'redux-loop';
import { connect } from 'react-redux';
import * as R from 'ramda';
import PropTypes from 'prop-types';

import logo from './logo.svg';
import './App.css';
import * as Actions from './actions';
import Company from './Company';
import Selector from './Selector';

class App extends Component {
  render() {
    const { companies, selectedCompany, onSelect, onClickToFetch } = this.props;

    const selectorOption = (company) => ({
      key: company.name,
      title: company.name
    });

    return (
      <div className="App">
        <header className="App-header">
          Fang Fetcher
        </header>

        <Selector
          options={ R.map(selectorOption, Object.values(companies)) }
          selectedItem={ selectedCompany }
          onSelect={ onSelect }
        />

        <Company 
          companyName={ selectedCompany } 
          onClickToFetch={ onClickToFetch(selectedCompany) }
        />
      </div>
    );
  }
}

App.propTypes = {
  companies: PropTypes.object.isRequired,
  selectedCompany: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClickToFetch: PropTypes.func.isRequired
};


const mapStateToProps = state => {
  return {
    companies: state.companies,
    selectedCompany: state.selectedCompany,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelect: companyName => (
      () => dispatch(Actions.selectCompany(companyName))
    ),
    onClickToFetch: companyName => (
      () => dispatch(Actions.requestRepos(companyName))
    )
  };
};

export const View = connect(mapStateToProps, mapDispatchToProps)(App);
