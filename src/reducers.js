import * as Redux from 'redux';
import * as Loop from 'redux-loop';
import * as Actions from './actions';
import * as Tasks from './tasks';



const initCompany = companyName => {
  return {
    name: companyName,
    isFetching: false,
    repos: []
  };
};

export const initialState = {
  selectedCompany: 'Facebook',
  companies: {
    Facebook: initCompany('Facebook'),
    Amazon: initCompany('Amazon'),
    Netflix: initCompany('Netflix'),
    Google: initCompany('Google')
  }
}




const company = (state = initCompany('Facebook'), action) => {
  if (action.companyName !== state.name) {
    return state;
  }


  switch(action.type) {

    case Actions.REQUEST_REPOS:
      return Loop.loop(
        { ...state, isFetching: true },
        Loop.Cmd.run(Tasks.fetchRepo, {
          successActionCreator: Actions.receiveReposSuccess(state.name),
          failActionCreator: Actions.receiveReposFail,
          args: [state.name]
        })
      );

    case Actions.RECEIVE_REPOS_SUCCESS: 
      return {
        ...state, 
        repos: action.repos,
        isFetching: false
      };

    case Actions.RECEIVE_REPOS_FAIL:
      return Loop.loop(
        { ...state, isFetching: false },
        Loop.Cmd.run( () => alert('FAILED!') )
      );

    default:
      return state;
  }
};

const companies = Loop.combineReducers({
  Facebook: company,
  Amazon: company,
  Netflix: company,
  Google: company
});

const selectedCompany = (state = '', action) => {
  switch(action.type) {
    case Actions.SELECT_COMPANY:
      return action.companyName;
    default:
      return state;
  }
};

export const rootReducer = Loop.combineReducers({
  companies: companies,
  selectedCompany: selectedCompany
});