import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import Flexbox from 'flexbox-react';


const styles = {
  company: isFetching => ({
    background: 'white',
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

        flexDirection='row'
      >
        <Flexbox 
          element='a'
          href={repo.html_url}
        >
          {repo.name}
        </Flexbox>

        <Flexbox>
          * {repo.stargazers_count}
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

  const reposListView = repos => {
    return (
      <Flexbox
        element='ul'
        flexDirection='column'
      >
        { R.map(repoView, repos) }
      </Flexbox>
    );
  };

  return (
    <Flexbox
      flexDirection='column'
      paddingTop='8px'
      style={ styles.company(company.isFetching) }
    >

      <Flexbox
        element='header'
      >
        Repositories by { company.companyName }
      </Flexbox>
      
      { company.repos.length > 0  
          ? reposListView(company.repos) 
          : fetchView()
      }
    </Flexbox>
  );
};

export default Company;



