# Random World

[![npm version](https://img.shields.io/npm/v/random-world.svg)](https://www.npmjs.com/package/random-world)

A Node.js module for generating random data. Built for usage with mock servers, testing, and data generation pipelines.

## Installation

```bash
npm install random-world
```

## Quick Start

### As a Library

```javascript
import random from 'random-world';

// Generate names
random.names.fullname();         // "Jennifer Martinez"
random.names.email();            // "john.smith@example.com"

// Generate numbers
random.numbers.integer({ min: 1, max: 100 });  // 42

// Generate network data
random.network.ip();             // "192.168.1.45"
random.network.domain();         // "example.com"

// Generate UUIDs
random.strings.uuid();           // "550e8400-e29b-41d4-a716-446655440000"

// Generate company data
random.company.name();           // "Global Technologies Inc"
random.company.jobTitle();       // "Senior Developer"

// Generate phone numbers
random.phone.number();           // "(555) 123-4567"
random.phone.imei();             // "353456789012345"

// Generate colors
random.colors.hex();             // "#FF5733"
random.colors.name();            // "cornflowerblue"

// Generate internet data
random.internet.username();      // "cool_ninja42"
random.internet.password();      // "Kj8#mNp2$qRs5tUv"
random.internet.mac();           // "a1:b2:c3:d4:e5:f6"
```

### As a CLI

The CLI is built-in and replaces the old `random-world-cli` package.

```bash
# Generate 10 random names
random-world names.fullname -r 10

# Generate 5 IP addresses as JSON
random-world network.ip -r 5 -f json

# Generate integers with options
random-world numbers.integer -o '{"min":1,"max":100}' -r 10

# Generate unique values only
random-world names.firstname -r 20 -u
```

## CLI Reference

```
Usage:
  random-world <method> [options]

Options:
  -r, --repeat <n>     Number of items to generate (default: 1)
  -f, --format <fmt>   Output format: text, json, csv, sql (default: text)
  -u, --unique         Generate unique values only
  -o, --options <json> JSON options to pass to the method
  -h, --help           Show help message
  -v, --version        Show version number
```

### Output Formats

| Format | Description |
|--------|-------------|
| `text` | Plain text, one value per line |
| `json` | JSON array |
| `csv`  | Comma-separated values with header |
| `sql`  | SQL INSERT statements |

### Examples

```bash
# Generate CSV of 100 email addresses
random-world names.email -r 100 -f csv

# Generate SQL inserts for cities
random-world places.city -r 50 -f sql

# Generate JSON array of credit card numbers
random-world money.ccnumber -r 10 -f json

# Generate unique UUIDs
random-world strings.uuid -r 1000 -u -f json

# Generate company names
random-world company.name -r 20

# Generate phone numbers
random-world phone.number -r 10 -f json

# Generate hex colors
random-world colors.hex -r 5

# Generate passwords
random-world internet.password -o '{"length":24,"symbols":false}' -r 5
```

---

## Modules

- [Names](#names)
- [Network](#network)
- [Numbers](#numbers)
- [Strings](#strings)
- [Places](#places)
- [Dates](#dates)
- [Geography](#geography)
- [Money](#money)
- [Files](#files)
- [Phone](#phone)
- [Company](#company)
- [Colors](#colors)
- [Internet](#internet)
- [Collections](#collections)
- [Truth](#truth)
- [Object Parser](#object-parser)

---

### Names

Generate random names, titles, and email addresses.

#### `names.firstname(options)`

Generate a random first name.

| Option | Type | Description |
|--------|------|-------------|
| `gender` | `string` | Limit to `'male'`, `'female'`, or `'nonbinary'` |
| `startsWith` | `string` | Filter names starting with substring |
| `charCase` | `string` | Transform case: `'upper'` or `'lower'` |

```javascript
random.names.firstname();                          // "Emma"
random.names.firstname({ gender: 'male' });        // "James"
random.names.firstname({ startsWith: 'Ch' });      // "Charlotte"
```

#### `names.lastname(options)`

Generate a random last name (surname).

| Option | Type | Description |
|--------|------|-------------|
| `startsWith` | `string` | Filter names starting with substring |
| `charCase` | `string` | Transform case: `'upper'` or `'lower'` |

```javascript
random.names.lastname();                           // "Johnson"
random.names.lastname({ charCase: 'upper' });      // "WILLIAMS"
```

#### `names.fullname(options)`

Generate a full name (first + last). Accepts same options as `firstname()`.

```javascript
random.names.fullname();                           // "Michael Davis"
random.names.fullname({ gender: 'female' });       // "Sarah Thompson"
```

#### `names.title(options)`

Generate a random title (Mr, Mrs, Dr, etc.).

| Option | Type | Description |
|--------|------|-------------|
| `gender` | `string` | Limit to `'male'`, `'female'`, or `'nonbinary'` |

```javascript
random.names.title();                              // "Dr"
random.names.title({ gender: 'nonbinary' });       // "Mx"
```

#### `names.email(options)`

Generate a random email address.

| Option | Type | Description |
|--------|------|-------------|
| `hasDot` | `boolean` | Include dot in name portion |
| `hasPlusAddress` | `boolean` | Include plus addressing |
| `charCase` | `string` | Transform case (defaults to `'lower'`) |
| `standard` | `boolean` | Use standard TLDs only |

```javascript
random.names.email();                              // "johnsmith@example.com"
random.names.email({ hasDot: true });              // "john.smith@example.com"
random.names.email({ hasPlusAddress: true });      // "john+tag@example.com"
```

#### `names.suffix(options)`

Generate a random post-nominal suffix (PhD, MBA, etc.).

| Option | Type | Description |
|--------|------|-------------|
| `type` | `string` | Limit to `'doctorate'`, `'masters'`, or `'bachelors'` |

```javascript
random.names.suffix();                             // "MBA"
random.names.suffix({ type: 'doctorate' });        // "PhD"
random.names.suffix({ type: 'masters' });          // "MSc"
```

#### `names.middleName(options)`

Generate a random middle name. Accepts same options as `firstname()`.

```javascript
random.names.middleName();                         // "Elizabeth"
random.names.middleName({ gender: 'male' });       // "Robert"
```

---

### Network

Generate random network-related data.

#### `network.ip(options)`

Generate a random IPv4 address.

| Option | Type | Description |
|--------|------|-------------|
| `mask` | `boolean` | Include CIDR notation |

```javascript
random.network.ip();                               // "192.168.45.12"
random.network.ip({ mask: true });                 // "10.0.0.1/24"
```

#### `network.ipv6()`

Generate a random IPv6 address.

```javascript
random.network.ipv6();                             // "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
```

#### `network.domain(options)`

Generate a random domain name.

| Option | Type | Description |
|--------|------|-------------|
| `standard` | `boolean` | Use standard TLDs only (default: `true`) |

```javascript
random.network.domain();                           // "example.com"
random.network.domain({ standard: false });        // "example.photography"
```

#### `network.url(options)`

Generate a random URL.

| Option | Type | Description |
|--------|------|-------------|
| `protocol` | `string` | Protocol to use (default: `'http'`) |
| `port` | `number` | Include port number |

```javascript
random.network.url();                              // "http://www.example.com"
random.network.url({ protocol: 'https', port: 8080 }); // "https://www.example.com:8080"
```

#### `network.tld(options)`

Generate a random top-level domain.

| Option | Type | Description |
|--------|------|-------------|
| `standard` | `boolean` | Standard TLDs only (default: `true`) |
| `includeDot` | `boolean` | Include leading dot (default: `true`) |

```javascript
random.network.tld();                              // ".com"
random.network.tld({ includeDot: false });         // "org"
```

---

### Numbers

Generate random numbers.

#### `numbers.integer(options)`

Generate a random integer.

| Option | Type | Description |
|--------|------|-------------|
| `min` | `number` | Minimum value (default: `0`) |
| `max` | `number` | Maximum value (default: `10000000`) |
| `round` | `boolean` | Round the value (default: `true`) |
| `padding` | `number` | Zero-pad to specified length |
| `asString` | `boolean` | Return as string |

```javascript
random.numbers.integer();                          // 4582391
random.numbers.integer({ min: 1, max: 10 });       // 7
random.numbers.integer({ padding: 5 });            // "00042"
```

#### `numbers.number(options)`

Alias for `integer()`.

#### `numbers.float(options)`

Generate a random float. Same options as `integer()` but `round` defaults to `false`.

```javascript
random.numbers.float({ min: 0, max: 1 });          // 0.7423891
```

#### `numbers.sum(options)`

Generate an array of numbers that sum to a target value.

| Option | Type | Description |
|--------|------|-------------|
| `count` | `number` | Number of values to generate |
| `max` | `number` | Target sum |

```javascript
random.numbers.sum({ count: 5, max: 100 });        // [23, 18, 31, 15, 13]
```

---

### Strings

Generate random strings, words, and UUIDs.

#### `strings.uuid()`

Generate a UUID v4.

```javascript
random.strings.uuid();                             // "550e8400-e29b-41d4-a716-446655440000"
```

#### `strings.word(options)`

Generate random dictionary word(s).

| Option | Type | Description |
|--------|------|-------------|
| `limit` | `number` | Number of words (default: `1`) |
| `delimiter` | `string` | Word separator (default: `'-'`) |
| `charCase` | `string` | Transform case: `'upper'`, `'lower'`, `'sentence'` |

```javascript
random.strings.word();                             // "apple"
random.strings.word({ limit: 3 });                 // "apple-banana-orange"
random.strings.word({ charCase: 'upper' });        // "EXAMPLE"
```

#### `strings.sentence()`

Generate a random sentence from Lorem Ipsum text.

```javascript
random.strings.sentence();                         // "Lorem ipsum dolor sit amet"
```

#### `strings.random(options)`

Generate a random string of characters.

| Option | Type | Description |
|--------|------|-------------|
| `len` | `number` | String length (default: `16`) |
| `chars` | `string` | Character set to use |

```javascript
random.strings.random();                           // "aB3kL9mN2pQrS5tU"
random.strings.random({ len: 8, chars: '0123456789' }); // "48293751"
```

#### `strings.block(options)`

Generate a block pattern string.

| Option | Type | Description |
|--------|------|-------------|
| `blockSize` | `number` | Pattern of block sizes (default: `333`) |
| `delimiter` | `string` | Block separator (default: `'-'`) |
| `chars` | `string` | Character set |

```javascript
random.strings.block();                            // "ABC-DEF-GHI"
random.strings.block({ blockSize: 4444 });         // "ABCD-EFGH-IJKL-MNOP"
```

#### `strings.hash(options)`

Generate a random hash-like hex string.

| Option | Type | Description |
|--------|------|-------------|
| `type` | `string` | Hash type: `'md5'`, `'sha1'`, `'sha256'`, `'sha512'` |
| `length` | `number` | Custom length (overrides type) |

```javascript
random.strings.hash();                             // 64-char SHA256-style hash
random.strings.hash({ type: 'md5' });              // 32-char MD5-style hash
random.strings.hash({ length: 40 });               // 40-char hex string
```

#### `strings.slug(options)`

Generate a random URL-friendly slug.

| Option | Type | Description |
|--------|------|-------------|
| `wordCount` | `number` | Number of words (default: random 2-5) |
| `separator` | `string` | Word separator (default: `'-'`) |

```javascript
random.strings.slug();                             // "quick-brown-fox"
random.strings.slug({ wordCount: 3 });             // "hello-world-example"
```

---

### Places

Generate random location data.

#### `places.city(options)`

Generate a random city name.

| Option | Type | Description |
|--------|------|-------------|
| `country` | `string` | Restrict to specific country |

```javascript
random.places.city();                              // "New York"
random.places.city({ country: 'UK' });             // "Manchester"
```

#### `places.country()`

Generate a random country name.

```javascript
random.places.country();                           // "Canada"
```

#### `places.countrycode()`

Generate a random ISO 2-letter country code.

```javascript
random.places.countrycode();                       // "US"
```

#### `places.street()`

Generate a random street address.

```javascript
random.places.street();                            // "42 Oak Avenue"
```

#### `places.state(options)`

Generate a random US state or Canadian province.

| Option | Type | Description |
|--------|------|-------------|
| `country` | `string` | `'US'` (default) or `'CA'` for Canada |
| `abbreviated` | `boolean` | Return 2-letter abbreviation |
| `full` | `boolean` | Return object with name and abbr |

```javascript
random.places.state();                             // "California"
random.places.state({ abbreviated: true });        // "CA"
random.places.state({ country: 'CA' });            // "Ontario"
```

#### `places.postalCode(options)`

Generate a random postal/ZIP code.

| Option | Type | Description |
|--------|------|-------------|
| `country` | `string` | Country code (default: `'US'`) |

```javascript
random.places.postalCode();                        // "90210"
random.places.postalCode({ country: 'CA' });       // "K1A 0B1"
random.places.postalCode({ country: 'GB' });       // "SW1 1AA"
```

#### `places.fullAddress(options)`

Generate a complete address string.

| Option | Type | Description |
|--------|------|-------------|
| `country` | `string` | Country code (default: `'US'`) |

```javascript
random.places.fullAddress();                       // "42 Oak Avenue, Springfield, IL, 62701"
```

---

### Dates

Generate random dates and times.

#### `dates.now()`

Get the current date/time.

```javascript
random.dates.now();                                // Date object
```

#### `dates.date(options)`

Generate a random date.

| Option | Type | Description |
|--------|------|-------------|
| `start` | `string` | Minimum date (UK format: DD/MM/YYYY) |
| `end` | `string` | Maximum date (UK format: DD/MM/YYYY) |
| `format` | `string` | Date format (default: `'UK'`) |

```javascript
random.dates.date();                               // Random Date object
random.dates.date({ start: '01/01/2020', end: '31/12/2025' });
```

#### `dates.unixtimestamp()`

Generate a Unix timestamp.

```javascript
random.dates.unixtimestamp();                      // 1704067200
```

#### `dates.year(options)`

Generate a random year. Accepts same options as `date()`.

```javascript
random.dates.year();                               // 2019
```

#### `dates.month(options)`

Generate a random month name.

| Option | Type | Description |
|--------|------|-------------|
| `short` | `boolean` | Return 3-character format |

```javascript
random.dates.month();                              // "September"
random.dates.month({ short: true });               // "Sep"
```

#### `dates.dayofweek(options)`

Generate a random day of the week.

| Option | Type | Description |
|--------|------|-------------|
| `short` | `boolean` | Return 3-character format |

```javascript
random.dates.dayofweek();                          // "Wednesday"
random.dates.dayofweek({ short: true });           // "Wed"
```

#### `dates.day(options)`

Generate a random day of the month (1-31). Accepts same options as `date()`.

```javascript
random.dates.day();                                // 15
```

#### `dates.time(options)`

Generate a random time string in HH:MM:SS format.

| Option | Type | Description |
|--------|------|-------------|
| `format24` | `boolean` | Use 24-hour format (default: `true`) |

```javascript
random.dates.time();                               // "14:32:07"
```

#### `dates.hour(options)`

Generate a random hour.

| Option | Type | Description |
|--------|------|-------------|
| `format24` | `boolean` | 24-hour format 0-23 (default: `true`) or 12-hour 1-12 |

```javascript
random.dates.hour();                               // 14
random.dates.hour({ format24: false });            // 9
```

#### `dates.minute()`

Generate a random minute (0-59).

```javascript
random.dates.minute();                             // 42
```

#### `dates.second()`

Generate a random second (0-59).

```javascript
random.dates.second();                             // 17
```

#### `dates.isoDate(options)`

Generate a random date in ISO 8601 format.

| Option | Type | Description |
|--------|------|-------------|
| `includeTime` | `boolean` | Include time portion (default: `true`) |

```javascript
random.dates.isoDate();                            // "2023-07-15T14:32:07.000Z"
random.dates.isoDate({ includeTime: false });      // "2023-07-15"
```

#### `dates.timezone()`

Generate a random timezone identifier.

```javascript
random.dates.timezone();                           // "America/New_York"
```

---

### Geography

Generate random geographical coordinates.

#### `geo.latlong()`

Generate a random latitude/longitude pair.

```javascript
random.geo.latlong();                              // { lat: 45.123456, long: -93.654321 }
```

#### `geo.lat()`

Generate a random latitude.

```javascript
random.geo.lat();                                  // 45.123456
```

#### `geo.long()`

Generate a random longitude.

```javascript
random.geo.long();                                 // -93.654321
```

---

### Money

Generate random credit card and financial data.

#### `money.ccnumber(options)`

Generate a valid credit card number (Luhn-checked).

| Option | Type | Description |
|--------|------|-------------|
| `shortName` | `string` | Card type code |
| `hasHyphens` | `boolean` | Format with hyphens |

```javascript
random.money.ccnumber();                           // "4532015112830366"
random.money.ccnumber({ hasHyphens: true });       // "4532-0151-1283-0366"
random.money.ccnumber({ shortName: 'V' });         // Visa card number
```

**Supported Card Types:**

| Card Type | Code |
|-----------|------|
| American Express | `AE` |
| Diners Club - Carte Blanche | `DC-CB` |
| Diners Club - International | `DC-I` |
| Diners Club - USA & Canada | `DC` |
| Discover | `D` |
| InstaPayment | `IP` |
| JCB | `JCB` |
| Laser | `L` |
| Maestro | `MA` |
| MasterCard | `MC` |
| Visa | `V` |
| Visa Electron | `VE` |

#### `money.cctype()`

Generate a random card type name.

```javascript
random.money.cctype();                             // "MasterCard"
```

#### `money.ccexpiry()`

Generate a random expiry date (MM/YY).

```javascript
random.money.ccexpiry();                           // "09/27"
```

#### `money.ccstart()`

Generate a random start date (MM/YY).

```javascript
random.money.ccstart();                            // "03/22"
```

#### `money.cvv()`

Generate a random 3-digit CVV.

```javascript
random.money.cvv();                                // "847"
```

#### `money.cv2()`

Alias for `cvv()`.

---

### Files

Generate random file-related data.

#### `files.extension(options)`

Generate a random file extension.

| Option | Type | Description |
|--------|------|-------------|
| `includeDot` | `boolean` | Include leading dot |

```javascript
random.files.extension();                          // "png"
random.files.extension({ includeDot: true });      // ".jpg"
```

#### `files.filename(options)`

Generate a random filename.

| Option | Type | Description |
|--------|------|-------------|
| `extension` | `string` | Specific extension to use |
| `includeExtension` | `boolean` | Include extension (default: `true`) |

```javascript
random.files.filename();                           // "report_2023.pdf"
random.files.filename({ extension: 'txt' });       // "notes.txt"
random.files.filename({ includeExtension: false }); // "document"
```

#### `files.filepath(options)`

Generate a random file path.

| Option | Type | Description |
|--------|------|-------------|
| `platform` | `string` | `'unix'` (default) or `'windows'` |
| `depth` | `number` | Directory depth (default: random 1-5) |

```javascript
random.files.filepath();                           // "/home/data/documents/report.pdf"
random.files.filepath({ platform: 'windows' });    // "C:\\Users\\data\\file.docx"
random.files.filepath({ depth: 2 });               // "/var/log/app.log"
```

---

### Phone

Generate random phone-related data.

#### `phone.number(options)`

Generate a random phone number.

| Option | Type | Description |
|--------|------|-------------|
| `country` | `string` | Country code (default: `'US'`) |
| `formatted` | `boolean` | Format with separators (default: `true`) |
| `length` | `number` | Raw digit count when unformatted |

```javascript
random.phone.number();                             // "(555) 123-4567"
random.phone.number({ country: 'GB' });            // "0207 123 4567"
random.phone.number({ formatted: false });         // "5551234567"
```

#### `phone.areaCode(options)`

Generate a random area code.

| Option | Type | Description |
|--------|------|-------------|
| `country` | `string` | Country code (default: `'US'`) |

```javascript
random.phone.areaCode();                           // "415"
random.phone.areaCode({ country: 'US' });          // "212"
```

#### `phone.countryCode(options)`

Generate a random international dialing code.

| Option | Type | Description |
|--------|------|-------------|
| `country` | `string` | Specific country code |

```javascript
random.phone.countryCode();                        // "+44"
random.phone.countryCode({ country: 'US' });       // "+1"
random.phone.countryCode({ country: 'JP' });       // "+81"
```

#### `phone.imei()`

Generate a random 15-digit IMEI number with valid Luhn checksum.

```javascript
random.phone.imei();                               // "353456789012345"
```

---

### Company

Generate random company and business data.

#### `company.name(options)`

Generate a random company name.

| Option | Type | Description |
|--------|------|-------------|
| `includeSuffix` | `boolean` | Include LLC, Inc, etc. (default: `true`) |
| `style` | `string` | `'combined'`, `'prefix'`, `'root'`, or `'person'` |

```javascript
random.company.name();                             // "Global Technologies Inc"
random.company.name({ includeSuffix: false });     // "Apex Solutions"
random.company.name({ style: 'person' });          // "Smith & Associates"
```

#### `company.suffix()`

Generate a random company suffix.

```javascript
random.company.suffix();                           // "LLC"
```

#### `company.industry()`

Generate a random industry/sector name.

```javascript
random.company.industry();                         // "Healthcare"
```

#### `company.department()`

Generate a random department name.

```javascript
random.company.department();                       // "Engineering"
```

#### `company.catchPhrase()`

Generate a random business catch phrase.

```javascript
random.company.catchPhrase();                      // "Leverage scalable synergies"
```

#### `company.jobTitle(options)`

Generate a random job title.

| Option | Type | Description |
|--------|------|-------------|
| `level` | `string` | `'executive'`, `'management'`, or `'individual'` |
| `includeDepartment` | `boolean` | Include department context |

```javascript
random.company.jobTitle();                         // "Senior Developer"
random.company.jobTitle({ level: 'executive' });   // "Chief Technology Officer"
random.company.jobTitle({ level: 'management' }); // "Director"
```

---

### Colors

Generate random color data.

#### `colors.hex(options)`

Generate a random hex color.

| Option | Type | Description |
|--------|------|-------------|
| `includeHash` | `boolean` | Include # prefix (default: `true`) |

```javascript
random.colors.hex();                               // "#FF5733"
random.colors.hex({ includeHash: false });         // "A1B2C3"
```

#### `colors.rgb(options)`

Generate a random RGB color.

| Option | Type | Description |
|--------|------|-------------|
| `format` | `string` | `'object'` (default) or `'string'` |

```javascript
random.colors.rgb();                               // { r: 255, g: 128, b: 64 }
random.colors.rgb({ format: 'string' });           // "rgb(255, 128, 64)"
```

#### `colors.hsl(options)`

Generate a random HSL color.

| Option | Type | Description |
|--------|------|-------------|
| `format` | `string` | `'object'` (default) or `'string'` |

```javascript
random.colors.hsl();                               // { h: 240, s: 50, l: 75 }
random.colors.hsl({ format: 'string' });           // "hsl(240, 50%, 75%)"
```

#### `colors.name(options)`

Generate a random CSS color name.

| Option | Type | Description |
|--------|------|-------------|
| `includeHex` | `boolean` | Return object with hex value |

```javascript
random.colors.name();                              // "cornflowerblue"
random.colors.name({ includeHex: true });          // { name: "coral", hex: "#FF7F50" }
```

---

### Internet

Generate random internet-related data.

#### `internet.username(options)`

Generate a random username.

| Option | Type | Description |
|--------|------|-------------|
| `style` | `string` | `'mixed'`, `'adjective_noun'`, `'name_number'`, or `'random'` |
| `length` | `number` | Length for random style |

```javascript
random.internet.username();                        // "cool_ninja42"
random.internet.username({ style: 'adjective_noun' }); // "swift_eagle"
random.internet.username({ style: 'name_number' }); // "john4521"
```

#### `internet.password(options)`

Generate a random password.

| Option | Type | Description |
|--------|------|-------------|
| `length` | `number` | Password length (default: `16`) |
| `uppercase` | `boolean` | Include uppercase (default: `true`) |
| `lowercase` | `boolean` | Include lowercase (default: `true`) |
| `numbers` | `boolean` | Include numbers (default: `true`) |
| `symbols` | `boolean` | Include symbols (default: `true`) |

```javascript
random.internet.password();                        // "Kj8#mNp2$qRs5tUv"
random.internet.password({ length: 32 });          // 32-char password
random.internet.password({ symbols: false });      // "Kj8mNp2qRs5tUvWx"
```

#### `internet.userAgent()`

Generate a random browser user agent string.

```javascript
random.internet.userAgent();                       // "Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
```

#### `internet.mac(options)`

Generate a random MAC address.

| Option | Type | Description |
|--------|------|-------------|
| `separator` | `string` | Separator character (default: `':'`) |
| `uppercase` | `boolean` | Uppercase hex (default: `false`) |

```javascript
random.internet.mac();                             // "a1:b2:c3:d4:e5:f6"
random.internet.mac({ separator: '-' });           // "a1-b2-c3-d4-e5-f6"
random.internet.mac({ uppercase: true });          // "A1:B2:C3:D4:E5:F6"
```

#### `internet.port(options)`

Generate a random port number.

| Option | Type | Description |
|--------|------|-------------|
| `type` | `string` | `'random'`, `'common'`, `'registered'`, or `'dynamic'` |
| `includeService` | `boolean` | Return object with service name (common only) |

```javascript
random.internet.port();                            // 8080
random.internet.port({ type: 'common' });          // 443
random.internet.port({ type: 'common', includeService: true }); // { port: 22, service: "SSH" }
```

#### `internet.httpMethod()`

Generate a random HTTP method.

```javascript
random.internet.httpMethod();                      // "POST"
```

#### `internet.httpStatusCode(options)`

Generate a random HTTP status code.

| Option | Type | Description |
|--------|------|-------------|
| `type` | `string` | `'informational'`, `'success'`, `'redirection'`, `'clientError'`, `'serverError'` |
| `includeMessage` | `boolean` | Return object with message |

```javascript
random.internet.httpStatusCode();                  // 200
random.internet.httpStatusCode({ type: 'clientError' }); // 404
random.internet.httpStatusCode({ includeMessage: true }); // { code: 200, message: "OK" }
```

#### `internet.mimeType()`

Generate a random MIME type.

```javascript
random.internet.mimeType();                        // "application/json"
```

---

### Collections

Generate random arrays and pick from lists.

#### `collections.array(options)`

Generate an array of random numbers.

| Option | Type | Description |
|--------|------|-------------|
| `limit` | `number` | Array length (default: random 1-12) |

```javascript
random.collections.array();                        // [45, 123, 78, 201, 34]
random.collections.array({ limit: 5 });            // [12, 89, 156, 23, 67]
```

#### `collections.pickone(options)`

Pick a random item from a delimited string.

| Option | Type | Description |
|--------|------|-------------|
| `items` | `string` | Delimited list of items |
| `delimiter` | `string` | Delimiter (default: `'|'`) |

```javascript
random.collections.pickone({ items: 'red|green|blue' });        // "green"
random.collections.pickone({ items: 'a,b,c', delimiter: ',' }); // "b"
```

---

### Truth

Generate random boolean values.

#### `truth.boolean()`

Generate a random boolean.

```javascript
random.truth.boolean();                            // true
```

---

### Object Parser

Generate data from object templates with placeholder tokens.

#### `object.fromObject(methods, template)`

Parse an object template and replace placeholders with random values.

```javascript
const template = {
  type: 'object',
  struct: {
    name: '$fullname',
    age: '$integer{"min": 18, "max": 65}',
    email: '$email',
    active: '$boolean'
  }
};

random.object.fromObject(random, template);
// { name: "John Smith", age: 34, email: "jane@example.com", active: true }
```

Use `$$` prefix to lock a value across multiple references in the same record.

---

## Programmatic Bulk Generation

For generating multiple records programmatically:

```javascript
import { generateBulk, generateRecords } from 'random-world/lib/bulk.js';
import random from 'random-world';

// Generate 100 names
const names = generateBulk(
  () => random.names.fullname(),
  100,
  { unique: true }
);

// Generate structured records
const users = generateRecords(
  {
    id: () => random.strings.uuid(),
    name: () => random.names.fullname(),
    email: () => random.names.email(),
    age: () => random.numbers.integer({ min: 18, max: 80 })
  },
  50
);
```

---

## Requirements

- Node.js >= 18.0.0

## Running Tests

```bash
npm test
```

## License

MIT
