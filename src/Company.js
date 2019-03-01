import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import * as Actions from './actions';


const Company = (props) => {
  const { company, onClickToFetch } = props;
  
  const repoView = repo => {
    return (
      <div key={repo.id}>
        <a href={repo.html_url}>
          {repo.name}
        </a>
      </div>
    );
  };

  const fetchView = () => {
    return (
      <button
      onClick={onClickToFetch}
      >
        Click to Fetch Repos from {company.name}
      </button>
    );
  };

  const reposListView = () => {
    return (
      <div
      >
        { company.repos.length > 0 ? R.map(repoView, company.repos) : fetchView() }
      </div>
    );
  };

  return (
    <div
    style={{ background: company.isFetching ? '#222' : '#479' }}
    >
      <header>{ company.name }</header>
      
      { reposListView() }
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    company: state.companies[ownProps.companyName]
  };
}

export default connect(mapStateToProps)(Company);



