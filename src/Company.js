import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import Flexbox from 'flexbox-react';

import * as Actions from './actions';

const styles = {
  company: isFetching => ({
    border: '1px solid red',
    opacity: isFetching ? '0.5' : '1'
  })
}


const Company = (props) => {
  const { company, onClickToFetch } = props;
  
  const repoView = repo => {
    return (
      <Flexbox 
        element='li'
        key={repo.id}
      >
        <Flexbox 
          element='a'
          href={repo.html_url}
        >
          {repo.name}
        </Flexbox>
      </Flexbox>
    );
  };

  const fetchView = () => {
    return (
      <button
        onClick={onClickToFetch}
      >
        Click to Fetch Repos from {company.companyName}
      </button>
    );
  };

  const reposListView = () => {
    return (
      <Flexbox
        element='ul'
        flexDirection='column'
      >
        { company.repos.length > 0 
            ? R.map(repoView, company.repos) 
            : fetchView() 
        }
      </Flexbox>
    );
  };

  return (
    <Flexbox
      flexDirection='column'
      style={ styles.company(company.isFetching) }
    >
      <header>{ company.companyName }</header>
      
      { reposListView() }
    </Flexbox>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    company: state.companies[ownProps.companyName]
  };
}

export default connect(mapStateToProps)(Company);



