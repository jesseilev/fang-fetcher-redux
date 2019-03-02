import React, { Component } from 'react';
// import { combineReducers } from 'redux';
import * as Loop from 'redux-loop';
import { connect } from 'react-redux';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import Flexbox from 'flexbox-react';

import logo from './logo.svg';
import './App.css';
import * as Actions from './actions';
import Company from './Company';
import Selector from './Selector';



class App extends Component {
  render() {
    const { companies, selectedCompany, onSelect, onClickToFetch } = this.props;

    const selectorOption = (company) => ({
      key: company.companyName,
      title: company.companyName
    });

    return (
      <Flexbox
        className='App'
        flexDirection='column'
        justifyContent='flex-start'
        alignItems='center'
        alignContent='center'
        // style={{background: '#509'}}
      >
        <Flexbox 
          element='header'
          className="App-header"
          padding='30px'
        >
          Fang Fetcher
        </Flexbox>

        <Flexbox
          element='main'
          flexDirection='column'
          justifyContent='center'
        >
          <Selector
            options={ R.map(selectorOption, Object.values(companies)) }
            selectedItem={ selectedCompany }
            onSelect={ onSelect }
          />

          <Company 
            companyName={ selectedCompany } 
            onClickToFetch={ onClickToFetch(selectedCompany) }
          />
        </Flexbox>
      </Flexbox>
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
