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
* [Complex Structures](#objects)

### Places

Location-specific methods.

* `random.city()` - generate a random city name.
  * `country` - String representing the country to restrict the city to.

---

### Collections

Arrays of random data.

* `random.array()` - generate an array up 12 items long, filled with random numbers between 1-200.
  * `limit` - Explicit length of the array

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

---

### Network

Network specific values.

* `random.domain()` - Returns a mock domain name.
* `random.ip()` - Returns an IPv4 IP address.
* `random.ipv6()` - Returns an IPv6 IP address.
* `random.tld()` - Returns a top level domain.

---

### Numbers

Integers and floats.

* `random.integer()` - Returns a random integer.
* `random.float()` - Returns a random float.
* `random.sum()` - Returns an array of X values that add up to the target value.

---

### Strings

String patterns.

* `random.sentence()` - Returns a sentence retrieved from Lorem Ipsum strings.
* `random.block()` - Creates a string made up of blocks of characters.
* `random.random()` - A random string created from the default characters, or the supplied chars.
* `random.word()` - A random dictionary word.

---

### Objects

* `random.fromMock()` - Parses an object for placeholders that represent `random-world` methods. 

Nested object parser takes a complex object and converts all placeholders for `random-world` methods to a randomly assigned value. Documentation for this is covered in [more detail here](https://www.npmjs.com/package/raml-mock-server).

---

## Running Tests

`npm test`

[![Build Status](https://travis-ci.org/drb/random-world.svg)](https://travis-ci.org/drb/random-world) [![npm version](https://badge.fury.io/js/random-world.svg)](http://badge.fury.io/js/random-world)
