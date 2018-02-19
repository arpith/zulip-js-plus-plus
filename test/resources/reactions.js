const reactions = require('../../lib/resources/reactions');
const events = require('../../lib/resources/events');
const queues = require('../../lib/resources/queues');
const chai = require('chai');

chai.use(require('chai-as-promised'));

const realm = process.env.ZULIP_REALM;
const apiURL = `${realm}/api/v1`;
const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  apiURL,
};

const eventParams = {
  last_event_id: -1,
  dont_block: true,
};

const reactionParams = {
  message_id: 1,
  emoji: 'smile',
};

chai.should();

describe('Reactions', () => {
  before(() => queues(config).register({ event_types: ['reaction'] }).then((res) => {
    eventParams.queue_id = res.queue_id;
  }));

  it('Should add reaction',
    () => reactions(config).add(reactionParams).should.eventually.have.property('result', 'success')
  );

  it('Should remove reaction',
    () => reactions(config).remove(reactionParams).should.eventually.have.property('result', 'success')
  );

  it('Should retrieve reaction events',
    () => events(config).retrieve(eventParams).should.eventually.have.property('result', 'success')
  );
});
