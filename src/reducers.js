
import * as Loop from 'redux-loop';
import * as Actions from './actions';
import * as Tasks from './tasks';



export const initialState = {
    selectedCompany: 'Facebook',
    companies: {
        Facebook: {
            name: 'Facebook',
            isFetching: false,
            repos: [],
        },
        Amazon: {
            name: 'Amazon',
            isFetching: false,
            repos: []
        },
        Netflix: {
            name: 'Netflix',
            isFetching: false,
            repos: []
        },
        Google: {
            name: 'Google',
            isFetching: false,
            repos: []
        }
    }
}




const company = (state, action) => {
  if (action.companyName !== state.name) {
    return state;
  }


  switch(action.type) {

    case Actions.REQUEST_REPOS:
      return Loop.loop(
        Object.assign(state, { isFetching: true }),
        Loop.Cmd.run(Tasks.fetchRepo, {
          successActionCreator: Actions.receiveReposSuccess(state.name),
          failActionCreator: Actions.receiveReposFail,
          args: [state.name]
        })
      );

    case Actions.RECEIVE_REPOS_SUCCESS: 
      return Object.assign(state, { 
        repos: action.repos,
        isFetching: false
      });

    case Actions.RECEIVE_REPOS_FAIL:
      return Loop.loop(
        Object.assign(state, { isFetching: false }),
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