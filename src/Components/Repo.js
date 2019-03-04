import React from 'react';
import Flexbox from 'flexbox-react';

const styles = {
  repo: {
    // border: '1px solid grey',
    boxShadow: '1px 2px 2px 2px rgba(0, 0, 0, 0.1)'
  }
}
const Repo = props => {
  const { repo } = props;
  return (
    <Flexbox 
      // element='li'
      key={repo.id}        

      flexDirection='column'
      width='150px'
      marginTop='16px'
      marginRight='16px'
      padding='8px'
      style={styles.repo}
    >
      <Flexbox 
        element='a'          
        href={repo.html_url}
      >
        {repo.name}
      </Flexbox>

      <Flexbox
      >
        {repo.description}
      </Flexbox>

      <Flexbox>          
        * {repo.stargazers_count}
      </Flexbox>
    </Flexbox>
  );
}

export default Repo;