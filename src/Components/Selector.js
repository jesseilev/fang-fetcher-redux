import React from 'react';
import * as R from 'ramda';
import Flexbox from 'flexbox-react';


const Selector = (props) => {
  const { options, selectedItem, onSelect } = props;

  const optionView = option => {
    const isSelected = selectedItem == option.key;
    return (
      <Flexbox
        key={ option.key }
        onClick={ onSelect(option.key) }
        selected={ isSelected }

        flexDirection='row'
        alignItems='center'
        flexGrow={1}

        className={ 
          isSelected 
            ? 'Selector-option Selector-option_selected' 
            : 'Selector-option' 
        }
      >
        <Flexbox className='Selector-option-acronym'>
          { option.title[0] }
        </Flexbox>
        { option.title.slice(1).toUpperCase() }
      </Flexbox>
    );
  };

  return (
    <Flexbox 
      className='Selector'
      flexDirection='row'
      justifyContent='space-between'
      alignItems='stretch'
      flex='none'
      flexGrow={0}
      // minHeight='50px'
    >
      { R.map(optionView, options) }
    </Flexbox>
  );
};

export default Selector;
