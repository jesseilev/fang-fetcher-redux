
import * as R from 'ramda';



export const SELECT_COMPANY = 'SELECT_COMPANY';
export const REQUEST_REPOS = 'REQUEST_REPOS';
export const RECEIVE_REPOS_SUCCESS = 'RECEIVE_REPOS_SUCCESS';
export const RECEIVE_REPOS_FAIL = 'RECEIVE_REPOS_FAIL';

export const selectCompany = companyName => {
  return {
    type: SELECT_COMPANY,
    companyName
  }
}

export const requestRepos = (companyName) => {
  return {
    type: REQUEST_REPOS,
    companyName
  };
};

export const receiveReposSuccess = companyName => {
  return json => {
    return {
      type: RECEIVE_REPOS_SUCCESS,
      companyName,
      repos: R.take(18, json.items)
    };
  };
};

export const receiveReposFail = () => {
  return {
    type: RECEIVE_REPOS_FAIL
  };
};
