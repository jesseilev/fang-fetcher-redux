
import fetch from 'cross-fetch';


const githubUrl = companyName => `https://api.github.com/users/${companyName}/repos`;

export const fetchRepo = (companyName) => {
  // debugger;
  return fetch(githubUrl(companyName))
    .then(response => response.json());
};