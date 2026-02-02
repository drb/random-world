/**
 * Places data - US states, Canadian provinces, postal code formats
 */

// US States
const usStates = [
    { name: 'Alabama', abbr: 'AL' },
    { name: 'Alaska', abbr: 'AK' },
    { name: 'Arizona', abbr: 'AZ' },
    { name: 'Arkansas', abbr: 'AR' },
    { name: 'California', abbr: 'CA' },
    { name: 'Colorado', abbr: 'CO' },
    { name: 'Connecticut', abbr: 'CT' },
    { name: 'Delaware', abbr: 'DE' },
    { name: 'Florida', abbr: 'FL' },
    { name: 'Georgia', abbr: 'GA' },
    { name: 'Hawaii', abbr: 'HI' },
    { name: 'Idaho', abbr: 'ID' },
    { name: 'Illinois', abbr: 'IL' },
    { name: 'Indiana', abbr: 'IN' },
    { name: 'Iowa', abbr: 'IA' },
    { name: 'Kansas', abbr: 'KS' },
    { name: 'Kentucky', abbr: 'KY' },
    { name: 'Louisiana', abbr: 'LA' },
    { name: 'Maine', abbr: 'ME' },
    { name: 'Maryland', abbr: 'MD' },
    { name: 'Massachusetts', abbr: 'MA' },
    { name: 'Michigan', abbr: 'MI' },
    { name: 'Minnesota', abbr: 'MN' },
    { name: 'Mississippi', abbr: 'MS' },
    { name: 'Missouri', abbr: 'MO' },
    { name: 'Montana', abbr: 'MT' },
    { name: 'Nebraska', abbr: 'NE' },
    { name: 'Nevada', abbr: 'NV' },
    { name: 'New Hampshire', abbr: 'NH' },
    { name: 'New Jersey', abbr: 'NJ' },
    { name: 'New Mexico', abbr: 'NM' },
    { name: 'New York', abbr: 'NY' },
    { name: 'North Carolina', abbr: 'NC' },
    { name: 'North Dakota', abbr: 'ND' },
    { name: 'Ohio', abbr: 'OH' },
    { name: 'Oklahoma', abbr: 'OK' },
    { name: 'Oregon', abbr: 'OR' },
    { name: 'Pennsylvania', abbr: 'PA' },
    { name: 'Rhode Island', abbr: 'RI' },
    { name: 'South Carolina', abbr: 'SC' },
    { name: 'South Dakota', abbr: 'SD' },
    { name: 'Tennessee', abbr: 'TN' },
    { name: 'Texas', abbr: 'TX' },
    { name: 'Utah', abbr: 'UT' },
    { name: 'Vermont', abbr: 'VT' },
    { name: 'Virginia', abbr: 'VA' },
    { name: 'Washington', abbr: 'WA' },
    { name: 'West Virginia', abbr: 'WV' },
    { name: 'Wisconsin', abbr: 'WI' },
    { name: 'Wyoming', abbr: 'WY' },
    { name: 'District of Columbia', abbr: 'DC' }
];

// Canadian Provinces
const canadianProvinces = [
    { name: 'Alberta', abbr: 'AB' },
    { name: 'British Columbia', abbr: 'BC' },
    { name: 'Manitoba', abbr: 'MB' },
    { name: 'New Brunswick', abbr: 'NB' },
    { name: 'Newfoundland and Labrador', abbr: 'NL' },
    { name: 'Northwest Territories', abbr: 'NT' },
    { name: 'Nova Scotia', abbr: 'NS' },
    { name: 'Nunavut', abbr: 'NU' },
    { name: 'Ontario', abbr: 'ON' },
    { name: 'Prince Edward Island', abbr: 'PE' },
    { name: 'Quebec', abbr: 'QC' },
    { name: 'Saskatchewan', abbr: 'SK' },
    { name: 'Yukon', abbr: 'YT' }
];

// Postal code formats by country
// # = digit, A = letter, ? = alphanumeric
const postalCodeFormats = {
    US: '#####',
    US_EXTENDED: '#####-####',
    CA: 'A#A #A#',
    GB: 'A## #AA',
    DE: '#####',
    FR: '#####',
    AU: '####',
    JP: '###-####',
    IT: '#####',
    ES: '#####',
    NL: '#### AA',
    BR: '#####-###',
    IN: '######',
    MX: '#####',
    default: '#####'
};

// Timezone identifiers
const timezones = [
    'UTC', 'GMT',
    'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
    'America/Toronto', 'America/Vancouver', 'America/Mexico_City', 'America/Sao_Paulo',
    'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Rome', 'Europe/Madrid',
    'Europe/Amsterdam', 'Europe/Stockholm', 'Europe/Moscow',
    'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Hong_Kong', 'Asia/Singapore', 'Asia/Seoul',
    'Asia/Mumbai', 'Asia/Dubai', 'Asia/Bangkok', 'Asia/Jakarta',
    'Australia/Sydney', 'Australia/Melbourne', 'Australia/Perth',
    'Pacific/Auckland', 'Pacific/Honolulu',
    'Africa/Cairo', 'Africa/Johannesburg', 'Africa/Lagos'
];

export { usStates, canadianProvinces, postalCodeFormats, timezones };
export default { usStates, canadianProvinces, postalCodeFormats, timezones };
