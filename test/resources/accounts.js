const accounts = ['node', 'browser'].map((d) => {
  return [d, require(`../../dist/${d}/resources/accounts`)];
});
const chai = require('chai');
chai.use(require('chai-as-promised'));

const realm = process.env.ZULIP_REALM;
const apiURL = `${realm}/api/v1`;

const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  apiURL,
};

chai.should();
describe('Accounts', () => {
  accounts.map(([name, module]) => {
    it(`Should get API key (${name})`, () => {
      module(config).retrieve().should.eventually.have.property('result', 'success');
    });
  });
});
