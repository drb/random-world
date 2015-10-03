var cards = [
    {
        name: "American Express",
        shortName: "AE",
        startsWith: [34, 37],
        len: [15]
    }, {
        name: "Diners Club - Carte Blanche",
        shortName: "DC-CB",
        startsWith: [300, 301, 302, 303, 304, 305],
        len: [14]
    }, {
        name: "Diners Club - International",
        shortName: "DC-I",
        startsWith: [36],
        len: [14]
    }, {
        name: "Diners Club - USA & Canada",
        shortName: "DC",
        startsWith: [54],
        len: [16]
    }, {
        name: "Discover",
        shortName: "D",
        startsWith: [6011, 622126, 622925, 644, 645, 646, 647, 648, 649, 65],
        len: [16]
    }, {
        name: "InstaPayment",
        shortName: "IP",
        startsWith: [637, 638, 639],
        len: [16]    
    }, {
        name: "JCB",
        shortName: "JCB",
        startsWith: [3528, 3589],
        len: [16]    
    }, {
        name: "Laser",
        shortName: "L",
        startsWith: [6304, 6706, 6771, 6709],
        len: [16, 19]
    }, {
        name: "Maestro",
        shortName: "MA",
        startsWith: [5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763],
        len: [16, 19]
    }, {
        name: "MasterCard",
        shortName: "MC",
        startsWith: [51, 52, 53, 54, 55],
        len: [16, 19]
    }, {
        name: "Visa",
        shortName: "V",
        startsWith: [4],
        len: [13, 16]
    }, {
        name: "Visa Electron",
        shortName: "VE",
        startsWith: [4026, 417500, 4508, 4844, 4913, 4917],
        len: [16]
    }
];

module.exports = cards;