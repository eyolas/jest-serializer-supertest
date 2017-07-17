# jest-serializer-path
[![NPM version][npm-image]][npm-url]
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](http://www.repostatus.org/badges/latest/active.svg)](http://www.repostatus.org/#active)

Remove absolute paths from your Jest snapshots.

#### Quick Start

```bash
npm install --save-dev jest-serializer-supertest
```

Add this to your `package.json` Jest config:

```
"jest": {
  "snapshotSerializers": [
    "jest-serializer-supertest"
  ]
}
```

Or include only in individual tests:

```js
const serializer = require('jest-serializer-supertest')

expect.addSnapshotSerializer(serializer)
```

[npm-image]: https://img.shields.io/npm/v/jest-serializer-supertest.svg?style=flat-square
[npm-url]: https://github.com/eyolas/jest-serializer-supertest
