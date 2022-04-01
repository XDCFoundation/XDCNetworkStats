const axios = require('axios');

export default {getLocation, getHistory}

async function getLocation(requestData) {

  let url = process.env.REACT_APP_NODE_LOCATIONS + requestData;

  return axios.get(url)
  .then((response) => {
    return Promise.resolve(response.data);
    
  })
  .catch(function (err) {
    return Promise.reject(err);
  });
}

async function getHistory(){
  let url = process.env.REACT_APP_NODE_HISTORY

  return axios.get(url)
  .then((response) => {
    return Promise.resolve(response.data);
  })
  .catch(function (err) {
    return Promise.reject(err);
  });

}