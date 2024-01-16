const dgram = require('dgram');
const dnsPacket = require('dns-packet');

const DNS_SERVERS = ['1.1.1.1', '8.8.8.8'];
const DNS_PORT = 53;
const RECORD_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT', 'SRV'];

function constructDnsPacket(domain, recordType, dnssec) {
  // Example packet construction logic
  const packet = dnsPacket.encode({
      type: 'query',
      questions: [{
          type: recordType,
          name: domain
      }],
      // Additional DNSSEC or other settings
  });

  return packet; // This should return a buffer
}


async function queryDNS(domain, dnssec = false) {
  let allAnswers = [];
  for (const recordType of RECORD_TYPES) {
    const packet = constructDnsPacket(domain, recordType, dnssec);
    const client = dgram.createSocket('udp4');
    try {
      const message = await new Promise((resolve, reject) => {
        client.send(packet, DNS_PORT, DNS_SERVERS[0], (error) => {
          if (error) {
            client.close();
            reject(error);
            return;
          }
          client.on('message', (msg) => {
            client.close();
            resolve(msg);
          });
        });
      });
      const response = dnsPacket.decode(message);
      allAnswers = allAnswers.concat(response.answers);
    } catch (error) {
      console.error(`Error querying ${recordType} record for domain ${domain}:`, error);
      // Continue querying the next record type even if the current one fails
    }
  }
  return { answers: allAnswers };
}

module.exports = {
  queryDNS
};
