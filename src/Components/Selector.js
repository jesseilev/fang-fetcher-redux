import React from 'react';
import * as R from 'ramda';
import Flexbox from 'flexbox-react';


const styles = {
  option: isSelected => ({
    background: isSelected ? 'white' : '#ccc',
    // border: isSelected ? '2px solid red' : '0px',
    // borderBottom: isSelected ? '0px' : '2px solid red',
    cursor: 'default',
    boxShadow: isSelected ? '0px 0px 5px 0px rgba(0,0,0, 0.1)' : 'inset 0px -1px 1px 0px rgba(0,0,0, 0.1)'
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
        flexGrow={1}

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
