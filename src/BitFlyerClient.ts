import HttpClient from './HttpClient';

/**
 * BitFlyer用のAPIクラスです。
 */
export class BitFlyerClient extends HttpClient {
    
  private static readonly BASE_URL = 'https://api.bitflyer.jp';

  constructor(readonly key?: string, readonly secret:  string = '') {
      super(BitFlyerClient.BASE_URL, key, secret);
  }
  
  /**
   * 新規注文を出す
   * @param  {SendChildOrderRequest} request リクエスト
   * @return {Promise<SendChildOrderResponse>} レスポンス
   */
  async sendChildOrder(request: SendChildOrderRequest): Promise<SendChildOrderResponse> {
    const path = '/v1/me/sendchildorder';
    return await this.post<SendChildOrderResponse, SendChildOrderRequest>(path, request);
  }
  
  /**
   * 注文をキャンセルする
   * @param  {CancelChildOrderRequest} request リクエスト
   * @return {Promise<CancelChildOrderResponse>} レスポンス
   */
  async cancelChildOrder(request: CancelChildOrderRequest): Promise<CancelChildOrderResponse> {
    const path = '/v1/me/cancelchildorder';
    return await this.post<CancelChildOrderResponse, CancelChildOrderRequest>(path, request);
  }
  
  /**
   * 注文の一覧を取得
   * @param  {ChildOrdersRequest} request リクエスト
   * @return {Promise<ChildOrdersResponse>} レスポンス
   */
  async getChildOrders(request: ChildOrdersRequest): Promise<ChildOrdersResponse> {
    const path = '/v1/me/getchildorders';
    return await this.get<ChildOrdersResponse, ChildOrdersRequest>(path, request);
  }
  
  /**
   * 約定の一覧を取得
   * @param  {ExecutionsRequest} request リクエスト
   * @return {Promise<ExecutionsResponse>} レスポンス
   */
  async getExecutions(request: ExecutionsRequest): Promise<ExecutionsResponse> {
    const path = '/v1/me/getexecutions';
    return await this.get<ExecutionsResponse, ExecutionsRequest>(path, request);
  }

  /**
   * 建玉の一覧を取得
   * @param  {PositionsRequest} request リクエスト
   * @return {Promise<PositionsResponse>} レスポンス
   */
  async getPositions(request: PositionsRequest): Promise<PositionsResponse> {
    const path = '/v1/me/getpositions';
    return await this.get<PositionsResponse, PositionsRequest>(path, request);
  }
  
  /**
   * 資産残高を取得
   * @return {Promise<BalanceResponse>} レスポンス
   */
  async getBalance(): Promise<BalanceResponse> {
    const path = '/v1/me/getbalance';
    return await this.get<BalanceResponse>(path);
  }
  
  /**
   * 板情報
   * @return {Promise<BoardResponse>} レスポンス
   */
  async getBoard(): Promise<BoardResponse> {
    const path = '/v1/board';
    return await this.get<BoardResponse>(path);
  }
  
  /**
   * Ticker
   * @return {Promise<TickerResponse>} レスポンス
   */
  async getTicker(): Promise<TickerResponse> {
    const path = '/v1/ticker';
    return await this.get<TickerResponse>(path);
  }
 
  /**
   * 板の状態
   * @return {Promise<BoardStateResponse>} レスポンス
   */
  async getBoardState(): Promise<BoardStateResponse> {
    const path = '/v1/getboardstate';
    return await this.get<BoardStateResponse>(path);
  }

}

export interface PageFormat {
  count?: number;
  before?: number;
  after?: number;
}

export interface SendChildOrderRequest {
    product_code: string;
    child_order_type: 'LIMIT'|'MARKET';
    side: 'BUY'|'SELL';
    price?: number;
    size: number;
    minute_to_expire?: number;
    time_in_force?: 'GTC'|'IOC'|'FOK';
}

export interface SendChildOrderResponse {
    child_order_acceptance_id: string;
}

export interface CancelChildOrderRequest {
  product_code: string;
  child_order_id?: string;
  child_order_acceptance_id?: string;
}

export interface CancelChildOrderResponse {}

export interface ChildOrdersRequest extends PageFormat {
  product_code?:string;
  child_order_state?:'ACTIVE'|'COMPLETED'|'CANCELED'|'EXPIRED'|'REJECTED'
  child_order_id?:string; 
  child_order_acceptance_id?: string;
  parent_order_id?: string;
}

export type ChildOrdersResponse = ChildOrder[];

export interface ChildOrder {
  id: number;
  child_order_id: string;
  product_code: string;
  side: 'BUY'|'SELL';
  child_order_type: string;
  price: number;
  average_price: number;
  size: number;
  child_order_state: string;
  expire_date: string;
  child_order_date: string;
  child_order_acceptance_id: string;
  outstanding_size: number;
  cancel_size: number;
  executed_size: number;
  total_commission: number;
}

export interface ExecutionsRequest extends PageFormat {
  product_code: string;
  child_order_id?: string;
  child_order_acceptance_id?: string;
}

export type ExecutionsResponse = Execution[];

export interface Execution {
  id: number;
  child_order_id: string;
  side: 'BUY'|'SELL';
  price: number;
  size: number;
  commission: number;
  exec_date: string;
  child_order_acceptance_id: string;
}

export interface PositionsRequest {
  product_code: 'FX_BTC_JPY';
}

export type PositionsResponse = Position[];

export interface Position {
  product_code: "FX_BTC_JPY";
  side: "BUY"|'SELL';
  price: number;
  size: number;
  commission: number;
  swap_point_accumulate: number;
  require_collateral: number;
  open_date: string;
  leverage: number;
  pnl: number;
}

export type BalanceResponse = Balance[];

export interface Balance {
  currency_code: string;
  amount: number;
  available: number;
}

export interface BoardResponse {
  mid_price: number;
  bids: {price: number, size: number}[];
  asks: {price: number, size: number}[];
}

export interface TickerResponse {
  product_code: string;
  timestamp: string;
  tick_id: number;
  best_bid: number;
  best_ask: number;
  best_bid_size: number;
  best_ask_size: number;
  total_bid_depth: number;
  total_ask_depth: number;
  ltp: number;
  volume: number;
  volume_by_product: number;
}

export interface BoardStateResponse {
  health: 'NORMAL'|'BUSY'|'VERY_BUSY'|'SUPER_BUSY'|'NO_ORDER'|'STOP';
  state: 'RUNNING'|'CLOSED'|'STARTING'|'PREOPEN'|'CIRCUIT BREAK'|'AWAITING SQ'|'MATURED';
  data?: {special_quotation: number};
}