import {httpConstants} from "../constants";
const { default: axios } = require('axios');


export default { getNodes, getGasPrice, getUpTime, getInitNodes, getCountryInit, getEth};
async function getNodes() {
  let url = process.env.REACT_APP_NODE+httpConstants.API_END_POINT.NODE;
  return axios
    .get(url)
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}


async function getGasPrice() {
  let url = process.env.REACT_APP_NODE+httpConstants.API_END_POINT.GAS_PRICE;
  return axios
    .get(url)
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function getUpTime(data) {
  let url = process.env.REACT_APP_NODE+httpConstants.API_END_POINT.UPTIME;
  return axios
    .get(url + data)
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}


async function getCountryInit() {
  let url = process.env.REACT_APP_NODE+httpConstants.API_END_POINT.EXPANDED;
  return axios
    .get(url)
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function getInitNodes() {
  let url = process.env.REACT_APP_NODE+httpConstants.API_END_POINT.INIT_TABLE;
  return axios
      .get(url)
      .then((res) => {
          return Promise.resolve(res.data);
      })
      .catch(function (err) {
          return Promise.reject(err);
      });
}

async function getEth() {
  let url = process.env.REACT_APP_NODE_ETH_GAS;
  return axios
      .get(url)
      .then((res) => {
          return Promise.resolve(res.data);
      })
      .catch(function (err) {
          return Promise.reject(err);
      });
}