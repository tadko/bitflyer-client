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
        price: 31690,
        size: 0.01,
        minute_to_expire: 10000,
        time_in_force: "GTC"
      }

      const res = {
        "child_order_acceptance_id": "JRF20150707-200203-452209"
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

  describe('#get_balance', () => {
    beforeEach(() => {
      bf = new BitFlyerClient('key', 'secret');
    });
    it('can request', () => {
      const res = [
        {"currency_code": "JPY", "amount": 1024078, "available": 508000},
        {"currency_code": "BTC", "amount": 10.24, "available": 4.12},
        {"currency_code": "ETH", "amount": 20.48, "available": 16.38}
      ]
      
      const scope = nock(baseUrl)
      .get('/v1/me/getbalance')
      .reply(200, res);

      return bf.getBalance().then(data => {
        expect(data).to.deep.equal(res);
        expect(scope.isDone()).is.true;
      })
    });
  })

  describe('#get_ticker', () => {
    beforeEach(() => {
      bf = new BitFlyerClient('key', 'secret');
    });
    it('can request', () => {

      const res = {
        "product_code": "BTC_JPY",
        "timestamp": "2015-07-08T02:50:59.97",
        "tick_id": 3579,
        "best_bid": 30000,
        "best_ask": 36640,
        "best_bid_size": 0.1,
        "best_ask_size": 5,
        "total_bid_depth": 15.13,
        "total_ask_depth": 20,
        "ltp": 31690,
        "volume": 16819.26,
        "volume_by_product": 6819.26
      }

      const scope = nock(baseUrl)
      .get('/v1/ticker')
      .reply(200, res);

      return bf.getTicker().then(data => {
        expect(data).to.deep.equal(res);
        expect(scope.isDone()).is.true;
      })
    });
  })

})