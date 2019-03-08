import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import Flexbox from 'flexbox-react';
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";

import Repo from './Repo';


const ring = (n, items) => {
  return R.take(n, R.flatten(R.repeat(items, n)));
}

const Company = (props) => {
  const { company, onClickToFetch } = props;

  const FetchButton = () => (
    <Flexbox
      className='Company-button'
      onClick={onClickToFetch}
      alignItems='center'
    >
      Fetch repos from {company.companyName}
    </Flexbox>
  );

  const bloodDrips = () => {
    const drip = (
      <Flexbox className='Company-bloodDrip'>&nbsp; &nbsp; {"'"} </Flexbox> 
    );
    const blank = (
      <Flexbox className='Company-bloodDrip'>&nbsp; &nbsp; &nbsp;</Flexbox> 
    );
    const sequence = R.flatten([
      drip,
      R.repeat(blank, 3),
      drip,
      R.repeat(blank, 8),
      drip,
      R.repeat(blank, 5)
    ]);
    return R.take(6, R.reverse(ring(company.ticksSinceRequest, sequence)));
  }

  const Vampire = () => (
    <Flexbox
      className='Company-vampire'
      flexDirection='column'
      height='100%'
      justifyContent='flex-start'
      paddingTop="6em"
    >
      <Flexbox>(^,..,^)</Flexbox>
      { bloodDrips() }
    </Flexbox>
  );

  const fetchView = company.isFetching ? <Vampire /> : <FetchButton />;

  const reposListView = repos => {
    return (
      <Row 
        className='Company-reposListView'
        align='center'
        style= {{ width: '100%' }}
      >
        { 
          R.map(repo => <Repo repo={repo}/>, repos) 
        }
      </Row>
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
      { 
        company.repos.length > 0  
          ? reposListView(company.repos) 
          : fetchView
      }
    </Flexbox>
  );
};

export default Company;



