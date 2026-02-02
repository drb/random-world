/**
 * Name titles (prefixes)
 */
const titles = [
    {
        name: 'Mr',
        gender: 'M',
        tags: []
    },
    {
        name: 'Master',
        gender: 'M',
        tags: ['child']
    },
    {
        name: 'Miss',
        gender: 'F',
        tags: ['child']
    },
    {
        name: 'Mrs',
        gender: 'F',
        tags: []
    },
    {
        name: 'Ms',
        gender: 'F',
        tags: []
    },
    {
        name: 'Mx',
        gender: 'N',
        tags: []
    },
    {
        name: 'Dr',
        gender: 'U',
        tags: []
    },
    {
        name: 'Professor',
        gender: 'U',
        tags: []
    }
];

/**
 * Post-nominal letters (suffixes)
 */
const postNominal = {
    doctorate: [
        'PhD',
        'DPhil',
        'DBEnv',
        'DREst',
        'EdD',
        'DLitt',
        'DSocSci',
        'EngD',
        'DD',
        'LLD',
        'DProf',
        'DCL'
    ],
    masters: [
        'MA',
        'MFA',
        'MSc',
        'MPhil',
        'MSt',
        'MRes',
        'MES',
        'MLitt',
        'MArch',
        'MAnth',
        'MMath',
        'MMathStat',
        'MMORSE',
        'MPharm',
        'MSci',
        'MEng',
        'MChem',
        'MBiochem',
        'MSocSc',
        'MMus',
        'LLM',
        'BCL',
        'MPhys',
        'MComp',
        'MAcc',
        'MFin',
        'MBA',
        'MPA',
        'MEd',
        'MEP',
        'MEnt',
        'MCGI'
    ],
    bachelors: [
        'BA',
        'BSc',
        'BEd',
        'LLB',
        'BEng',
        'MBChB'
    ]
};

export { titles, postNominal };
