import React from 'react';
import Flexbox from 'flexbox-react';
import numeral from 'numeral';
import { Row, Col } from 'react-simple-flex-grid';



const Repo = props => {
  const { repo } = props;
  return (
    <Col
      className='Repo-container'
      key={repo.name}

      xs={12}
      sm={6}
      md={4}
    >
      <Flexbox
        className='Repo'
        flexDirection='column'
        key={repo.name + '_container'}
      >
        <a 
          className='Repo-link'       
          href={repo.html_url}
          key={repo.name + '_title'}
        >
          {repo.name}
        </a>

        <Flexbox
          className='Repo-stars'
          key={repo.name + '_stars'}
        >          
           ★ { numeral(repo.stargazers_count).format('0a') }
        </Flexbox>

        <Flexbox
          className='Repo-description'
          key={repo.name + '_description'}
        >
          {repo.description}
        </Flexbox>

      </Flexbox>
    </Col>

  );
}

export default Repo;