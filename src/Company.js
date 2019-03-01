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
      style={{ opacity: company.isFetching ? 0.5 : 1 }}
      >
        { company.repos.length > 0 ? R.map(repoView, company.repos) : fetchView() }
      </div>
    );
  };

  return (
    <div>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  // return {
  //   onClickToFetch: dispatch(ownProps.onClickToFetch)
  // }
}

export default connect(mapStateToProps)(Company);



