const dgram = require('dgram');
const net = require('net');
const dnsPacket = require('dns-packet');

const DNS_SERVERS = ['1.1.1.1', '8.8.8.8'];
const DNS_PORT = 53;

function constructDnsPacket(domain, recordType, dnssec) {
  const questions = [{ type: recordType, name: domain }];
  const additionals = dnssec ? [{
    type: 'OPT',
    name: '.',
    udpPayloadSize: 4096,
    flags: dnsPacket.DNSSEC_OK,
  }] : [];

  return dnsPacket.encode({
    type: 'query',
    questions: questions,
    additionals: additionals
  });
}

async function queryDNSOverUDP(domain, recordType, dnssec = false) {
  const packet = constructDnsPacket(domain, recordType, dnssec);
  const client = dgram.createSocket('udp4');
  return new Promise((resolve, reject) => {
    client.send(packet, DNS_PORT, DNS_SERVERS[0], (error) => {
      if (error) {
        client.close();
        reject(error);
        return;
      }
      client.on('message', (message) => {
        client.close();
        const response = dnsPacket.decode(message);
        resolve(response);
      });
    });
  });
}

async function queryDNSOverTCP(domain, recordType, dnssec = false) {
  const packet = constructDnsPacket(domain, recordType, dnssec);
  const lengthBuffer = Buffer.alloc(2);
  lengthBuffer.writeUInt16BE(packet.length, 0);
  const tcpPacket = Buffer.concat([lengthBuffer, packet]);
  const client = new net.Socket();
  return new Promise((resolve, reject) => {
    client.connect(DNS_PORT, DNS_SERVERS[0], () => {
      client.write(tcpPacket);
    });
    let dataBuffer = Buffer.alloc(0);
    client.on('data', (data) => {
      dataBuffer = Buffer.concat([dataBuffer, data]);
      if (dataBuffer.length > 2) {
        const expectedLength = dataBuffer.readUInt16BE();
        if (dataBuffer.length >= expectedLength + 2) {
          const responsePacket = dataBuffer.slice(2);
          const response = dnsPacket.decode(responsePacket);
          resolve(response);
          client.destroy();
        }
      }
    });
    client.on('error', (error) => {
      client.destroy();
      reject(error);
    });
    client.on('close', () => {
      reject(new Error('Connection closed prematurely.'));
    });
  });
}

async function queryDNSWithDNSSEC(domain, recordType, protocol = 'UDP') {
  if(protocol === 'UDP') {
    return queryDNSOverUDP(domain, recordType, true);
  } else if(protocol === 'TCP') {
    return queryDNSOverTCP(domain, recordType, true);
  } else {
    throw new Error(`Unsupported protocol: ${protocol}. Use 'UDP' or 'TCP'.`);
  }
}

module.exports = {
  queryDNSOverUDP,
  queryDNSOverTCP,
  queryDNSWithDNSSEC
};
