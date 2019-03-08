import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import Flexbox from 'flexbox-react';
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";


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

  const fetchButton = (
    <Flexbox
      className='Company-button'
      onClick={onClickToFetch}
      alignItems='center'
      padding='32px'
    >
      Fetch repos from {company.companyName}
    </Flexbox>
  );

  const vampireView = (
    <Flexbox>
      (^,..,^)
    </Flexbox>
  );

  const fetchView = (
    <Flexbox 
      className='Company-vampire'
    >
      { company.isFetching ? vampireView : fetchButton }
    </Flexbox>
  );

  const reposListView = repos => {
    return (
      <Row 
        gutter={50}
        align='center'

        style= {{
          width: '100%',
          height: '100%',
          padding: '20px'
        }}
      >
        { 
          R.map(repo => <Repo repo={repo}/>, repos) 
        }
      </Row>
      // </Flexbox>
    );
  };

  return (
    <Flexbox
      className='Company'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      flexGrow={1}
    >

      
      { company.repos.length > 0  
          ? reposListView(company.repos) 
          : fetchView
      }
    </Flexbox>
  );
};

export default Company;



