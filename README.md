<img src="./client/public/img/dennis.png" alt="drawing" style="width:200px;"/>

# The D.eN.niS. System

The D.eN.niS. System is a DNS probe and reporting application designed to work seamlessly with Cloud, On-Premises, and Active Directory DNS servers. This utility is crafted to perform DNS queries for user-specified records or domains, analyze the responses, and provide comprehensive reports.

## Features

- Accepts user input to probe DNS records or domains via GUI or CLI
- Supports queries over TCP/UDP and DNSSEC protocols
- Provides reports in PDF and CSV formats
- Visualizes DNS query data graphically within the app
- No need for integration into existing network solutions or user authentication
- Standalone operation for both real-time and static data representation

## User Stories

- As a user, I want to enter a DNS record or domain to probe using either the graphical or command-line interface.
- As a user, I expect to receive a report on the DNS probe findings in either PDF or CSV format.
- As a user, I desire to view graphical representations of DNS probe data within the application.
- As a user, I need to perform DNSSEC-aware probes when necessary and select from all DNS record types.
- As a user, I require the application to function on internal networks and access public internet domains and servers.

## Technologies Used

- Node.js
- Express
- Socket.io
- PeeWee
- SQLite
- React
- Bootstrap
- HTML/CSS3
- Chromium/Puppeteer
- D3.js
- PDFKit
- Node-cron
- Commander.js
- dns-packet
- csv-writer

## Getting Started

To get started with DNS_Probe, clone the repo and install dependencies:

```
git clone [REPOSITORY_URL]
cd dns_probe
npm install
cd client
npm install
```

### Starting the Application

To start the server, run:

```
npm start
```

In the client directory, start the React application:

```
cd client
npm start
```

### Using the CLI

The CLI tool can be used to probe DNS records directly from the command line. To use it, run:

```
npm link
dnsprobe probe <domain>
```

## Configuration

Configure your application by modifying the configuration files located in the project. Most importantly, update the API baseURL in client/src/utils/api.js to match your server's URL.

## License

DNS_Probe is available under the ISC license. See the LICENSE file for more info.

## Contribution

Contributions are welcome! Please ensure that your pull requests adhere to the following guidelines:

- Automated tests for any new features or fixes
- Consistent code style
- Detailed commit messages
- Descriptive pull requests

Happy Coding!
