class Outbound {
  constructor(client) {
    this._client = client;
  }

  all(params, callback) {
    return this._client.get('/outbound/faxes', params, callback);
  }

  completed(ids, callback) {
    return this._client.get('/outbound/faxes/completed', { 'ids' : ids }, callback);
  }

  find(id, callback) {
    return this._client.get(`/outbound/faxes/${id}`, callback);
  }

  image(id, callback) {
    return this._client.get(`/outbound/faxes/${id}/image`, callback);
  }

  cancel(id, callback) {
    return this._client.post(`/outbound/faxes/${id}/cancel`, callback);
  }
}

export default Outbound;
