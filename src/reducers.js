import * as Redux from 'redux';
import * as Loop from 'redux-loop';
import * as Actions from './actions';
import * as Tasks from './tasks';



const initCompany = (companyName, githubName) => {
  return {
    companyName: companyName,
    githubName: githubName,
    isFetching: false,
    repos: []
  };
};

export const initialState = {
  selectedCompany: 'Facebook',
  companies: {
    Facebook: initCompany('Facebook', 'facebook'),
    Amazon: initCompany('Amazon', 'amzn'),
    Netflix: initCompany('Netflix', 'netflix'),
    Google: initCompany('Google', 'google')
  }
}




const company = (state = initCompany('Facebook'), action) => {
  if (action.companyName !== state.companyName) {
    return state;
  }


  switch(action.type) {

    case Actions.REQUEST_REPOS:
      return Loop.loop(
        { ...state, isFetching: true },
        Loop.Cmd.run(Tasks.fetchRepo, {
          successActionCreator: Actions.receiveReposSuccess(state.companyName),
          failActionCreator: Actions.receiveReposFail,
          args: [state.githubName]
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