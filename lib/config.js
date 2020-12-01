
module.exports = {
  paypal: {
      businessEmail: '',
      url: 'https://www.sandbox.paypal.com/cgi-bin/webscr',
      currency: 'USD'
  },
  secret: '',
  name: 'nodeStore',
  db: {
      url: 'mongodb://localhost:27017/Nutristy',
      sessions: 'sessions'
  },
  locale: {
      lang: 'de-DE',
      currency: 'INR'
  }
};