import React, { Component } from 'react';
// import { combineReducers } from 'redux';
import * as Loop from 'redux-loop';
import { connect } from 'react-redux';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import Flexbox from 'flexbox-react';


import '../App.css';
import * as Actions from '../actions';
import Company from '../Components/Company';
import Selector from '../Components/Selector';


const Header = () => (
  <Flexbox 
    element='header'
    className="App-header"

    flexDirection='column'
    alignItems='center'
    flex='none'
  >
    <Flexbox 
      className="App-header-title"
    >
      FANG Fetcher
    </Flexbox>
    <Flexbox 
      className="App-header-subtitle"
    >
      Sink your teeth into the repositories of 
      tech's most red-blooded companies.
    </Flexbox>
  </Flexbox>
);


const Footer = () => (
  <Flexbox element='footer'
    className='App-footer'

    flexDirection='row'
    justifyContent='flex-end'
    flex='none'
  >
    <a
      href='https://github.com/jesseilev/fang-fetcher-redux'
    >
      View source on github
    </a>

    <Flexbox
      marginLeft='1em'
      marginRight='1em'
    >
      |
    </Flexbox>

    <a
      href='https://www.investopedia.com/terms/f/fang-stocks-fb-amzn.asp'
    >
      Huh? What is FANG?
    </a>
  </Flexbox>
);

const App = props => {

  const { companies, selectedCompany, onSelect, onClickToFetch } = props;

  const selectorOptionData = (company) => ({
    key: company.companyName,
    title: company.companyName
  });

  return (
    <Flexbox
      className='App'
      flexDirection='column'
      justifyContent='center'
      alignItems='stretch'
      alignContent='center'
      height='100%'
    >
      <Header />

      <Flexbox
        className='App-main-container'
        flexDirection='row'
        justifyContent='center'
        flexGrow={1}
      >
        <Flexbox
          element='main'
          className='App-main'
          flexDirection='column'
          justifyContent='flex-start'
          alignItems='stretch'
          maxWidth='992px'
          flexGrow={1}
        >

          <Flexbox
            flexDirection='column'
            justifyContent='flex-start'
            flexGrow={1}
          >
            <Selector
              options={ R.map(selectorOptionData, Object.values(companies)) }
              selectedItem={ selectedCompany }
              onSelect={ onSelect }
            />

            <Company 
              company={ companies[selectedCompany] }
              onClickToFetch={ onClickToFetch(selectedCompany) }
            />
          </Flexbox>

        </Flexbox>
      </Flexbox>

      <Footer />

    </Flexbox>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
