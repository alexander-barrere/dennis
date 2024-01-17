#!/usr/bin/env node
const { Command } = require('commander');
const dns = require('dns');
const util = require('util');

const program = new Command();

// Promisify DNS methods
const resolveSoa = util.promisify(dns.resolveSoa); // Ensure this line is added
const resolveNs = util.promisify(dns.resolveNs);   // Ensure this line is added
const resolve4 = util.promisify(dns.resolve4);
const resolve6 = util.promisify(dns.resolve6);
const resolveMx = util.promisify(dns.resolveMx);
const resolveTxt = util.promisify(dns.resolveTxt);
const resolveCname = util.promisify(dns.resolveCname);

program
  .name('DNS_Probe')
  .description('CLI to probe DNS records')
  .version('1.0.0');

program.command('probe <domain>')
  .description('Probe DNS records for a domain')
  .action(async (domain) => {
    console.log(`Probing DNS records for domain: ${domain}\n`);

    try {
      // Resolve SOA record
      const soaRecord = await resolveSoa(domain);
      console.log('SOA Record:', JSON.stringify(soaRecord, null, 2));

      // Resolve NS records
      const nsRecords = await resolveNs(domain);
      console.log('NS Records:', JSON.stringify(nsRecords, null, 2));

      // Resolve A records
      const aRecords = await resolve4(domain);
      console.log('A Records:', JSON.stringify(aRecords, null, 2));

      // Resolve AAAA records
      const aaaaRecords = await resolve6(domain);
      console.log('AAAA Records:', JSON.stringify(aaaaRecords, null, 2));

      // Resolve MX records
      const mxRecords = await resolveMx(domain);
      console.log('MX Records:', JSON.stringify(mxRecords, null, 2));

      // Resolve TXT records
      const txtRecords = await resolveTxt(domain);
      console.log('TXT Records:', JSON.stringify(txtRecords.map(r => r.join(' ')), null, 2));

      // Resolve CNAME records
      try {
        const cnameRecords = await resolveCname(domain);
        console.log('CNAME Records:', JSON.stringify(cnameRecords, null, 2));
      } catch (cnameErr) {
        console.log('CNAME Records: No CNAME record found');
      }

    } catch (err) {
      console.error(`Error probing ${domain}: ${err.message}`);
    }
  });

program.parse(process.argv);
