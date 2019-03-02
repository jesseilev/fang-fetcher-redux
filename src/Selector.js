import React from 'react';
import * as R from 'ramda';
import Flexbox from 'flexbox-react';


const styles = {
  option: isSelected => ({
    background: isSelected ? 'red' : 'grey',
    cursor: 'default'
  })
}

const Selector = (props) => {
  const { options, selectedItem, onSelect } = props;

  const optionView = option => {
    const isSelected = selectedItem == option.key;
    return (
      <Flexbox
        className='Selector-option'
        key={ option.key }
        onClick={ onSelect(option.key) }
        selected={ isSelected }
        padding='8px'
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
    >
      { R.map(optionView, options) }
    </Flexbox>
  );
};

export default Selector;
