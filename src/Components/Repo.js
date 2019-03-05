import React from 'react';
import Flexbox from 'flexbox-react';
import numeral from 'numeral';

const styles = {
  repo: {
    border: '1px solid #eee',
    boxShadow: '1px 1px 5px 0px rgba(0, 0, 0, 0.02)'
  }
};

const prettyNumber = n => {
  // if (n < 1000) {
  //   return n;
  // }

  // return (n / 1000) 

};


const Repo = props => {
  const { repo } = props;
  return (
    <Flexbox 
      // element='li'
      key={repo.id}        

      flexDirection='column'
      // justifyContent='space-between'
      width='100%'
      // maxWidth='400px'
      marginBottom='16px'
      // marginRight='16px'
      padding='16px'
      style={styles.repo}
    >
      <Flexbox
        flexDirection='column'
        minWidth='150px'
        // alignItems='flex-end'
        marginRight='16px'
        paddingRight='16px'

        // flexGrow={1}
        // justifyContent='space-between'
        style={{ borderBottoms: '1px solid #eee' }}
      >

        <Flexbox 
          element='a'
          className='Repo-link'       
          href={repo.html_url}
          // padding='8px'
        >
          {repo.name}
        </Flexbox>

        <Flexbox
          // padding='8px'
        >          
           ★ { numeral(repo.stargazers_count).format('0a') }
      </Flexbox>

      </Flexbox>

      <Flexbox
        marginTop='8px'
      >
        {repo.description}
      </Flexbox>

    </Flexbox>
  );
}

export default Repo;