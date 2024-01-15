#!/usr/bin/env node
const { Command } = require('commander');
const dns = require('dns');
const util = require('util');

const program = new Command();

// Promisify DNS methods
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
    console.log(`Probing DNS records for domain: ${domain}`);

    try {
      // Resolve A records
      const aRecords = await resolve4(domain);
      console.log('A Records:', aRecords);

      // Resolve AAAA records
      const aaaaRecords = await resolve6(domain);
      console.log('AAAA Records:', aaaaRecords);

      // Resolve MX records
      const mxRecords = await resolveMx(domain);
      console.log('MX Records:', mxRecords);

      // Resolve TXT records
      const txtRecords = await resolveTxt(domain);
      console.log('TXT Records:\n' + txtRecords.map(r => r.join(' ')).join('\n'));

      // Resolve CNAME records
      try {
        const cnameRecords = await resolveCname(domain);
        console.log('CNAME Records:', cnameRecords);
      } catch (cnameErr) {
        console.log('CNAME Records: No CNAME record found');
      }

    } catch (err) {
      console.error(`Error probing ${domain}: ${err.message}`);
    }
  });

program.parse(process.argv);
