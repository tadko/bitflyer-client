import {BitFlyerClient, SendChildOrderRequest} from './BitFlyerClient';
import 'mocha';
import { expect } from 'chai';
import * as nock from 'nock';

const baseUrl = 'https://api.bitflyer.jp';

nock.disableNetConnect();

describe('Bitflyer', () => {
  let bf: BitFlyerClient;
  before(() => {
    bf = new BitFlyerClient();
  });

  describe('initialize', () => {
    it('can instanciate', () => {
      expect(bf).not.to.be.null;
    });
  });

  describe('#send_child_order', () => {
    beforeEach(() => {
      bf = new BitFlyerClient('key', 'secret');
    });
    it('can request', () => {
      const req: SendChildOrderRequest = {
        product_code: "BTC_JPY",
        child_order_type: "LIMIT",
        side: "BUY",
        price: 30000,
        size: 0.1,
        minute_to_expire: 10000,
        time_in_force: "GTC"
      }

      const res = {
        "child_order_acceptance_id": "JRF20150707-050237-639234"
      }
      
      const scope = nock(baseUrl)
      .post('/v1/me/sendchildorder', req, {reqheaders: {'ACCESS-KEY': 'key'}})
      .reply(200, res);

      return bf.sendChildOrder(req).then(data => {
        expect(data).to.deep.equal(res);
        expect(scope.isDone()).is.true;
      })
    });

  })
})