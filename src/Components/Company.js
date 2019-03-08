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
      <Flexbox className='Company-blooddrip'>&nbsp; &nbsp; {"'"} </Flexbox> 
    );
    const blank = (
      <Flexbox className='Company-blooddrip'>&nbsp; &nbsp; &nbsp;</Flexbox> 
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
        gutter={50}
        align='center'

        style= {{
          width: '100%',
          height: '100%',
          padding: '1em'
        }}
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
      { company.repos.length > 0  
          ? reposListView(company.repos) 
          : fetchView
      }
    </Flexbox>
  );
};

export default Company;



