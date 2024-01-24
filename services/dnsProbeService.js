const dns = require('dns');
const util = require('util');

// Create a new resolver instance to set custom DNS servers
const resolver = new dns.Resolver();
resolver.setServers(['10.10.10.10', '10.10.10.20']); // Replace with whatever DNS server you want

// Promisified DNS methods for asynchronous operations using the custom resolver
const resolve = {
  A: util.promisify(resolver.resolve4.bind(resolver)),
  AAAA: util.promisify(resolver.resolve6.bind(resolver)),
  MX: util.promisify(resolver.resolveMx.bind(resolver)),
  TXT: util.promisify(resolver.resolveTxt.bind(resolver)),
  CNAME: util.promisify(resolver.resolveCname.bind(resolver)),
  NS: util.promisify(resolver.resolveNs.bind(resolver)),
  SOA: util.promisify(resolver.resolveSoa.bind(resolver)),
  SRV: util.promisify(resolver.resolveSrv.bind(resolver)),
};

async function queryDNS(domain, recordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT', 'SRV']) {
  let results = [];

  for (const type of recordTypes) {
    try {
      let records = await resolve[type](domain);
      // Normalize the records based on type
      if (type === 'A' || type === 'AAAA' || type === 'NS' || type === 'CNAME') {
        results.push({ Type: type, Values: records });
      } else if (type === 'MX' || type === 'TXT') {
        // For MX records, map to format correctly
        // For TXT records, flatten since they are returned as an array of arrays
        const values = type === 'MX'
          ? records.map(mx => ({ exchange: mx.exchange, priority: mx.priority }))
          : records.map(txtArray => txtArray.join(''));
        results.push({ Type: type, Values: values });
      } else if (type === 'SOA' || type === 'SRV') {
        results.push({ Type: type, Values: [records] }); // For SOA and SRV, wrap in array if not already
      }
    } catch (error) {
      results.push({ Type: type, Error: error.message });
    }
  }
  
  return results;
}

module.exports = {
  queryDNS
};
