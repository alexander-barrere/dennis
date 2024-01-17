const dns = require('dns');
const util = require('util');

const DNS_SERVERS = ['1.1.1.1', '8.8.8.8'];
const DNS_PORT = 53;
const RECORD_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT', 'SRV'];

async function queryDNS(domain, recordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT', 'SRV']) {
  let results = {};
  for (const type of recordTypes) {
    try {
      results[type] = await resolve[type](domain);
    } catch (error) {
      console.error(`Error querying ${type} record for domain ${domain}:`, error);
      results[type] = `Error: ${error.message}`;
    }
  }
  return results;
}

const resolve = {
  A: util.promisify(dns.resolve4),
  AAAA: util.promisify(dns.resolve6),
  CNAME: util.promisify(dns.resolveCname),
  MX: util.promisify(dns.resolveMx),
  NS: util.promisify(dns.resolveNs),
  TXT: util.promisify(dns.resolveTxt),
  SRV: util.promisify(dns.resolveSrv)
};

module.exports = {
  queryDNS
};
