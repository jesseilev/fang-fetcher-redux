import React from 'react';
import * as R from 'ramda';
import Flexbox from 'flexbox-react';


const styles = {
  option: isSelected => ({
    background: isSelected ? 'white' : 'lightgrey',
    border: isSelected ? '2px solid red' : '0px',
    borderBottom: isSelected ? '0px' : '2px solid red',
    cursor: 'default'
  })
}

const Selector = (props) => {
  const { options, selectedItem, onSelect } = props;

  const optionView = option => {
    const isSelected = selectedItem == option.key;
    return (
      <Flexbox
        key={ option.key }
        onClick={ onSelect(option.key) }
        selected={ isSelected }

        padding='8px'
        flexGrow='1'

        className='Selector-option'
        style={ styles.option(isSelected) }
      >
        { option.title }
      </Flexbox>
    );
  };

  return (
    <Flexbox 
      className='Selector'
      flexDirection='row'
      justifyContent='space-between'
      alignItems='stretch'
    >
      { R.map(optionView, options) }
    </Flexbox>
  );
};

export default Selector;
