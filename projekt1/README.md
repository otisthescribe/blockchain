# blockchain

Simple announcement dApp built on Truffle and tested locally with Ganache.

### Run local blockchain

```
npm install ganache -g
ganache
```

### Build project

```
npm install truffle -g
truffle compile
truffle migrate
```

### Contract usage

In `truffle console`:

```javascript
// get array of ganache accounts
let accounts = await web3.eth.getAccounts()

// defining contract's instance
let ann = await Announcement.deployed()
```

**Add announcement (price is in wei)**

```javascript
ann.add('title', 10, {from: accounts[0]})
```

Note: if you ommit `{from: <address>}`, the first one will be used by default.

**Get announcement**

```javascript
// Getting announcement with id=0
ann.anns(0)

// Getting price of an announcement with id=0
(await ann.anns(0))['price'].toNumber()
```

**Pay for an item**

```javascript
ann.pay(0, {from: accounts[2], value: '50'})
```

**Refund an item**

```javascript
ann.refund(0, {from: accounts[2], value: '50'})
```
