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
        justifyContent='center'
        alignItems='center'
        alignContent='center'
        height='100%'
      >
        <Flexbox 
          element='header'
          className="App-header"

          flexDirection='column'
          alignItems='center'
          padding='16px'
          width='100%'
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

        <Flexbox
          element='main'
          className='App-main'
          flexDirection='column'
          justifyContent='flex-start'
          alignItems='stretch'
          maxWidth='600px'
          flexGrow={1}
        >

          <Flexbox
            flexDirection='column'
            justifyContent='flex-start'
            flexGrow={1}
          >
            <Selector
              options={ R.map(selectorOption, Object.values(companies)) }
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
