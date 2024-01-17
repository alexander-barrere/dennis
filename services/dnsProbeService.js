const dns = require('dns');
const util = require('util');

// Promisified DNS methods for asynchronous operations
const resolve = {
  A: util.promisify(dns.resolve4),
  AAAA: util.promisify(dns.resolve6),
  MX: util.promisify(dns.resolveMx),
  TXT: util.promisify(dns.resolveTxt),
  CNAME: util.promisify(dns.resolveCname),
  NS: util.promisify(dns.resolveNs),
  SOA: util.promisify(dns.resolveSoa),
  // Add other DNS methods if needed
};

async function queryDNS(domain, recordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT', 'SRV']) {
  let results = [];

  for (const type of recordTypes) {
    try {
      let records = await resolve[type](domain);
      // Ensure the records are in an array
      records = Array.isArray(records) ? records : [records];
      // Normalize the records based on type
      if (type === 'A' || type === 'AAAA' || type === 'NS') {
        results.push({ Type: type, Values: records });
      } else if (type === 'MX' || type === 'SOA' || type === 'TXT') {
        // For MX and SOA, assume they're already objects and directly add them
        // For TXT records, which are arrays of strings, wrap them in an object with a Values array
        results.push({ Type: type, Values: type === 'TXT' ? records : [records] });
      } else if (type === 'CNAME' || type === 'SRV') {
        // Handle other types as needed
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
