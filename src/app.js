const express = require('express');
const Github = require('github');
const GitHubApi = require('github');
const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');

const server = express();

const githubCli = new Github({
  baseUri: 'https://api.github.com',
  token: process.env.GITHUB_TOKEN
});

const github = new GitHubApi({
  debug: true
});

github.authenticate({
  type: 'oauth',
  token: process.env.GITHUB_TOKEN
});

const handle = 'k33g';
githubCli.users.getForUser({ username: handle }).then((response) => {
  console.log(response.data);
});

server.post('/login', (req, res) => {
  const { username, oauth_token } = req.body;
  console.log(username, oauth_token);
  github.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_TOKEN
  });

  github.authenticate({
    type: 'basic',
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  });

  github.authenticate({
    type: 'oauth',
    key: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
  });
  // TODO log in to GitHub, return success/failure response
});

server.get('/gists', (req, res) => {
  // TODO retrieve a list of gists for the currently authed user
  githubCli.gists.getAll({}).then((response) => {
    console.log(response);
  });
});

server.listen(3000);
