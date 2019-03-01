import React from 'react';
import * as R from 'ramda';

const Selector = (props) => {
  const { options, selectedItem, onSelect } = props;

  const optionView = option => (
    <span
    className='Selector-Option'
    key={ option.key }
    onClick={ onSelect(option.key) }
    selected={ selectedItem == option.key }
    >
      { option.title }
    </span>
  );

  return (
    <div className='Selector'>
      { R.map(optionView, options) }
    </div>
  );
};

export default Selector;

// const mapStateToProps = (state, ownProps) => {
//   return {
//   };
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onClick: companyName => (
//       () => dispatch(Actions.requestRepos(companyName))
//     )
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Selector);
