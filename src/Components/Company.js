import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import Flexbox from 'flexbox-react';

import Repo from './Repo';


const styles = {
  company: isFetching => ({
    background: 'white',
    opacity: isFetching ? '0.5' : '1'
  })
}


const Company = (props) => {
  const { company, onClickToFetch } = props;

  const repoView = repo => <Repo repo={repo} />;

  const fetchView = () => {
    return (
      <button
        onClick={onClickToFetch}
      >
        Click to Fetch Repos from {company.companyName}
      </button>
    );
  };

  const reposListView = repos => {
    return (
      <Flexbox
        // element='ul'
        flexDirection='row'
        flexWrap='wrap'
        justifyContent='center'
        alignContent='flex-start'
      >
        { R.map(repoView, repos) }
      </Flexbox>
    );
  };

  return (
    <Flexbox
      flexDirection='column'
      padding='8px'
      style={ styles.company(company.isFetching) }
    >

      
      { company.repos.length > 0  
          ? reposListView(company.repos) 
          : fetchView()
      }
    </Flexbox>
  );
};

export default Company;



