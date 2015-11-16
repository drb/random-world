![NPM Stats](https://nodei.co/npm/random-world.png?downloads=true&downloadRank=true&stars=true)

[![Build Status](https://travis-ci.org/drb/random-world.svg)](https://travis-ci.org/drb/random-world) [![npm version](https://badge.fury.io/js/random-world.svg)](http://badge.fury.io/js/random-world)

# Random World

Node module for generating random data - built for usage with a [RAML-based API mocking server](https://www.npmjs.com/package/raml-mock-server) to generate collections of complex data structures with more realistic values.

## Installation

`npm install random-world`

## Instantiation

```javascript
var random = require('random-world');
```
## Modules

These are a work in progress and are added to as the parent project evolves. Method names and options are likely to change.

* [Places](#places)
* [Collections](#collections)
* [Dates & Times](#dates)
* [Files](#files)
* [Geography](#geography)
* [Names](#names)
* [Network](#network)
* [Numbers](#numbers)
* [Strings](#strings)
* [Truth (Booleans)](#truth)
* [Money](#money)
* [Complex Structures](#objects)

### Places

Location-specific methods.

* `random.city()` - Generate a random city name.
  * `country` - String representing the country to restrict the city to.
* `random.country()` - Generate a random country name.
* `random.countrycode()` - Generate a random country code.

---

### Collections

Arrays of random data.

* `random.array()` - Generate an array up 12 items long, filled with random numbers between 1-200.
  * `limit` - Explicit length of the array
* `random.pickone()` - Returns a random item from a pre-defined list of values, separated by a delimiter. Delimter is defaulted to pipe (|) but can be specified in the options.
  * `delimiter` - The custom delimiter separating the values

---

### Dates

* `random.now()` - The date and time right now.
* `random.unixtimestamp()` - A date and time in UNIX timestamp format.
  * `format` - UK date format is only supported
  * `start` - Minimum bound the randomisation should start from.
  * `end` - Maximum bound the randomisation should end at.
* `random.date()` - A random date
  * `format` - UK date format is only supported
  * `start` - Minimum bound the randomisation should start from.
  * `end` - Maximum bound the randomisation should end at.
* `random.dayofweek()` - A random day of the week.
  * `short` - Short 3 character format (i.e. Mon vs Monday).
* `random.year()` - A random year
  * `format` - UK date format is only supported
  * `start` - Minimum bound the year randomisation should start from.
  * `end` - Maximum bound the year randomisation should end at.
* `random.month()` - A random day of the week.
  * `short` - Short 3 character format (i.e. Jul vs July).

---

### Files

Returns random file extensions

* `random.extension()` - A random file extension.
  * `includeDot` - Returns a dot prefix for the extension (i.e. .png vs png).
  
---

### Geography

Generate randomised lat/long sets.

* `random.latlong()` - Object containing a longitude and latitude.
* `random.lat()` - A random latitude.
* `random.long()` - A random longitude.

---

### Names

Returns names for people using a dictionary of popular first and last names - only data from the USA is supported at the moment.

* `random.firstname()` - Returns a person's first name.
  * `gender` - Limit result to male or female names.
    * `male|female`
  * `startsWith` - Return names starting with the supplied substring.
  * `charCase` - Transform the name to upper or lowercase.
    * `upper|lower
* `random.lastname()` - Returns a person's last name (surname).
  * `startsWith` - Return names starting with the supplied substring.
  * `charCase` - Transform the name to upper or lowercase.
    * `upper|lower
* `random.fullname()` - Returns a person's first name.
  * `gender` - Limit result to male or female names.
    * `male|female`
  * `startsWith` - Return names starting with the supplied substring.
  * `charCase` - Transform the name to upper or lowercase.
    * `upper|lower
* `random.title()` - Returns a random title.
* `random.email()` - Returns a person's first name.
  * `hasDot` - Split name section of address (before @) with a dot.
  * `hasPlusAddress` - Include a plus address in the name section.
  * `charCase` - Transform the address to upper or lowercase.
    * `upper|lower
  * `standard` - Limit the TLDs to a standard set (.com, .org, .co.uk etc).

---

### Network

Network specific values.

* `random.domain()` - Returns a mock domain name.
* `random.ip()` - Returns an IPv4 IP address.
* `random.ipv6()` - Returns an IPv6 IP address. Not yet implemented.
* `random.tld()` - Returns a top level domain.
  * `standard` - Limit the TLDs to a standard set (.com, .org, .co.uk etc).

---

### Numbers

Integers and floats.

* `random.integer()` - Returns a random integer.
  * `min` - Minimum value to return.
  * `max` - Maximum value to return.
  * `round` - Round the value (to nearest whole number).
  * `padding` - Zero-pads value up to the length specified.
* `random.number()` - Alias for `integer()`.
* `random.float()` - Returns a random float.
* `random.sum()` - Returns an array of X values that add up to the target value.

---

### Strings

String patterns.

* `random.sentence()` - Returns a sentence retrieved from Lorem Ipsum strings.
* `random.block()` - Creates a string made up of blocks of characters.
  * `blockSize` - Length of each block.
  * `delimiter` - Split each block with specific delimiter.
  * `chars` - Limit blocks to defined characters. Defaults to A-Z.
* `random.random()` - A random string created from the default characters, or the supplied chars.
  * `chars` - Limit string to defined characters. Defaults to A-Za-z0-9.
  * `len` - Length of the string. Defaults to 16.
* `random.word()` - A random dictionary word.
  * `charCase` - Transform the word to upper or lowercase.
    * `upper|lower`
  * `limit` - Number of words to return. Defaults to 1.
  
---

### Truth

Randomised boolean values.

* `random.boolean()` - Returns a random true or false.

---

### Money

Credit card data specific methods.

* `random.ccnumber()` - Returns a random (valid, MOD10 checked) credit card number.
  * `shortName` - Limits the returned card number to a specific card type. See following table for supported types.
  * `hasHyphens` - Boolean. Formats credit card number with a hypen very 4 characters.
* `random.ccstart()` - Returns a random start date in MM/YY format.
* `random.ccexpiry()` - Returns a random expiry in MM/YY format.
* `random.cctype()` - Returns a random credit card type. e.g. MasterCard, VISA etc
* `random.cvv()` - Returns a random 3 digit CVV value.
* `random.cv2()` - Alias to `cvv()` method.

Supported card types.

|Card Type|Short Code|
|---|---|
| American Express  |AE   |
| Diners Club - Carte Blanche  | DC-CB  |
|  Diners Club - International | DC-I  |
|  Diners Club - USA & Canada | DC  |
| Discover  | D  |
| InstaPayment  |  IP |
|  JCB | JCB  |
|Laser   |  L |
|  Maestro | MA  |
|  MasterCard | MC  |
|  Visa | V  |
|  Visa Electron | VE  |

---

### Objects

* `random.fromObject()` - Parses an object for placeholders that represent `random-world` methods. 

```
{
  "struct": {
    "name": "$fullname",
    "addressId": "$number{\"min\": 100, \"max\": 2000, \"round\": true}",
    "description": "$word{\"charCase\": \"upper\"} Office",
    "addressLine1": "$word",
    "city": "$city",
    "postcode": "$postcode",
    "country": "$country",
    "isDeleted": "$boolean"
  }
}
```

Nested object parser takes a complex object and converts all placeholders for `random-world` methods to a randomly assigned value. Documentation for this is covered in [more detail here](https://www.npmjs.com/package/raml-mock-server).

---

## Running Tests

`npm test`

[![Build Status](https://travis-ci.org/drb/random-world.svg)](https://travis-ci.org/drb/random-world) [![npm version](https://badge.fury.io/js/random-world.svg)](http://badge.fury.io/js/random-world)
