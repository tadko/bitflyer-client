Bitflyer Client
====

JS client for Bitflyer API

## Install

`npm install --save @tadko/bitflyer-client`

## Usage
```typescript
import { BitflyerClient } from 'bitflyer-client'

const bitflyerClient = new BitflyerClient();

bitflyerClient.getBalance()
.then(console.log)
.catch(console.error)
```

