import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import Flexbox from 'flexbox-react';

import Repo from './Repo';


const styles = {
  company: isFetching => ({
    background: 'white',
    opacity: isFetching ? '0.5' : '1'
  }),
  button: {
    height: '50px',
    color: 'white',
    background: 'red',
    borderRadius: '2px',
    boxShadow: '1px 2px 2px 0px rgba(0,0,0,0.1)'
  }
}


const Company = (props) => {
  const { company, onClickToFetch } = props;

  const repoView = repo => <Repo repo={repo} />;

  const fetchView = () => {
    return (
      <Flexbox>
        <Flexbox
          onClick={onClickToFetch}
          alignItems='center'
          padding='16px'
          height='100px'
          style={styles.button}
        >
          Load Repos from {company.companyName}
        </Flexbox>
      </Flexbox>
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
      justifyContent='center'
      alignItems='center'
      flexGrow={1}
      padding='8px'
      height='100%'
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



