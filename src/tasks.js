
import fetch from 'cross-fetch';


const githubUrl = 'https://api.github.com/search/repositories?q=';

const queryString = companyName => `org:${companyName}+sort:stars`;

export const fetchRepo = (companyName) => {
  return fetch(githubUrl + queryString(companyName))
    .then(response => response.json());
};