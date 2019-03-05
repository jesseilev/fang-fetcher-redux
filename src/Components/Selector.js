import React from 'react';
import * as R from 'ramda';
import Flexbox from 'flexbox-react';


const styles = {
  option: isSelected => ({
    background: isSelected ? 'white' : '#fdfdfd',
    cursor: 'default',
    border: isSelected ? '1px solid #eee' : '0px',
    borderBottom: isSelected ? '0px' : '1px solid #eee',
    borderRadius: '2px'
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

        padding='16px'
        flexGrow={1}

        className={ isSelected ? 'Selector-option_selected' : 'Selector-option' }
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
      // minHeight='30px'
    >
      { R.map(optionView, options) }
    </Flexbox>
  );
};

export default Selector;
