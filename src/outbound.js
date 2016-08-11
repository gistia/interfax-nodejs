class Outbound {
  constructor(client) {
    this._client = client;
  }

  all(params, callback) {
    return this._client.get('/outbound/faxes', params, callback);
  }
}

export default Outbound;