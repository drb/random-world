/**
 * Internet-related data
 */

// Browser user agent templates
const userAgentTemplates = [
    // Chrome
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{version} Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{version} Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{version} Safari/537.36',
    // Firefox
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:{version}) Gecko/20100101 Firefox/{version}',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:{version}) Gecko/20100101 Firefox/{version}',
    'Mozilla/5.0 (X11; Linux x86_64; rv:{version}) Gecko/20100101 Firefox/{version}',
    // Safari
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/{version} Safari/605.1.15',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/{version} Mobile/15E148 Safari/604.1',
    // Edge
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{version} Safari/537.36 Edg/{version}',
    // Opera
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{version} Safari/537.36 OPR/{version}'
];

// MIME types
const mimeTypes = [
    // Text
    'text/plain', 'text/html', 'text/css', 'text/javascript', 'text/xml',
    'text/csv', 'text/markdown', 'text/calendar',
    // Application
    'application/json', 'application/xml', 'application/pdf', 'application/zip',
    'application/gzip', 'application/x-tar', 'application/x-rar-compressed',
    'application/x-7z-compressed', 'application/octet-stream',
    'application/javascript', 'application/typescript',
    'application/x-www-form-urlencoded', 'application/xhtml+xml',
    'application/ld+json', 'application/graphql', 'application/wasm',
    'application/msword', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    // Image
    'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
    'image/bmp', 'image/tiff', 'image/x-icon', 'image/avif',
    // Audio
    'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm', 'audio/aac',
    'audio/flac', 'audio/midi',
    // Video
    'video/mp4', 'video/webm', 'video/ogg', 'video/mpeg', 'video/quicktime',
    'video/x-msvideo', 'video/x-matroska',
    // Font
    'font/woff', 'font/woff2', 'font/ttf', 'font/otf',
    // Multipart
    'multipart/form-data', 'multipart/byteranges'
];

// Common ports
const commonPorts = [
    { port: 20, service: 'FTP Data' },
    { port: 21, service: 'FTP Control' },
    { port: 22, service: 'SSH' },
    { port: 23, service: 'Telnet' },
    { port: 25, service: 'SMTP' },
    { port: 53, service: 'DNS' },
    { port: 67, service: 'DHCP Server' },
    { port: 68, service: 'DHCP Client' },
    { port: 69, service: 'TFTP' },
    { port: 80, service: 'HTTP' },
    { port: 110, service: 'POP3' },
    { port: 119, service: 'NNTP' },
    { port: 123, service: 'NTP' },
    { port: 143, service: 'IMAP' },
    { port: 161, service: 'SNMP' },
    { port: 194, service: 'IRC' },
    { port: 389, service: 'LDAP' },
    { port: 443, service: 'HTTPS' },
    { port: 445, service: 'SMB' },
    { port: 465, service: 'SMTPS' },
    { port: 514, service: 'Syslog' },
    { port: 587, service: 'SMTP Submission' },
    { port: 631, service: 'IPP' },
    { port: 636, service: 'LDAPS' },
    { port: 993, service: 'IMAPS' },
    { port: 995, service: 'POP3S' },
    { port: 1080, service: 'SOCKS' },
    { port: 1433, service: 'MSSQL' },
    { port: 1521, service: 'Oracle' },
    { port: 3306, service: 'MySQL' },
    { port: 3389, service: 'RDP' },
    { port: 5432, service: 'PostgreSQL' },
    { port: 5672, service: 'AMQP' },
    { port: 5900, service: 'VNC' },
    { port: 6379, service: 'Redis' },
    { port: 8080, service: 'HTTP Proxy' },
    { port: 8443, service: 'HTTPS Alt' },
    { port: 9200, service: 'Elasticsearch' },
    { port: 27017, service: 'MongoDB' }
];

// HTTP methods
const httpMethods = [
    'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'TRACE', 'CONNECT'
];

// HTTP status codes
const httpStatusCodes = [
    // 1xx Informational
    { code: 100, message: 'Continue', type: 'informational' },
    { code: 101, message: 'Switching Protocols', type: 'informational' },
    { code: 102, message: 'Processing', type: 'informational' },
    { code: 103, message: 'Early Hints', type: 'informational' },
    // 2xx Success
    { code: 200, message: 'OK', type: 'success' },
    { code: 201, message: 'Created', type: 'success' },
    { code: 202, message: 'Accepted', type: 'success' },
    { code: 203, message: 'Non-Authoritative Information', type: 'success' },
    { code: 204, message: 'No Content', type: 'success' },
    { code: 205, message: 'Reset Content', type: 'success' },
    { code: 206, message: 'Partial Content', type: 'success' },
    { code: 207, message: 'Multi-Status', type: 'success' },
    { code: 208, message: 'Already Reported', type: 'success' },
    { code: 226, message: 'IM Used', type: 'success' },
    // 3xx Redirection
    { code: 300, message: 'Multiple Choices', type: 'redirection' },
    { code: 301, message: 'Moved Permanently', type: 'redirection' },
    { code: 302, message: 'Found', type: 'redirection' },
    { code: 303, message: 'See Other', type: 'redirection' },
    { code: 304, message: 'Not Modified', type: 'redirection' },
    { code: 305, message: 'Use Proxy', type: 'redirection' },
    { code: 307, message: 'Temporary Redirect', type: 'redirection' },
    { code: 308, message: 'Permanent Redirect', type: 'redirection' },
    // 4xx Client Error
    { code: 400, message: 'Bad Request', type: 'clientError' },
    { code: 401, message: 'Unauthorized', type: 'clientError' },
    { code: 402, message: 'Payment Required', type: 'clientError' },
    { code: 403, message: 'Forbidden', type: 'clientError' },
    { code: 404, message: 'Not Found', type: 'clientError' },
    { code: 405, message: 'Method Not Allowed', type: 'clientError' },
    { code: 406, message: 'Not Acceptable', type: 'clientError' },
    { code: 407, message: 'Proxy Authentication Required', type: 'clientError' },
    { code: 408, message: 'Request Timeout', type: 'clientError' },
    { code: 409, message: 'Conflict', type: 'clientError' },
    { code: 410, message: 'Gone', type: 'clientError' },
    { code: 411, message: 'Length Required', type: 'clientError' },
    { code: 412, message: 'Precondition Failed', type: 'clientError' },
    { code: 413, message: 'Payload Too Large', type: 'clientError' },
    { code: 414, message: 'URI Too Long', type: 'clientError' },
    { code: 415, message: 'Unsupported Media Type', type: 'clientError' },
    { code: 416, message: 'Range Not Satisfiable', type: 'clientError' },
    { code: 417, message: 'Expectation Failed', type: 'clientError' },
    { code: 418, message: "I'm a teapot", type: 'clientError' },
    { code: 421, message: 'Misdirected Request', type: 'clientError' },
    { code: 422, message: 'Unprocessable Entity', type: 'clientError' },
    { code: 423, message: 'Locked', type: 'clientError' },
    { code: 424, message: 'Failed Dependency', type: 'clientError' },
    { code: 425, message: 'Too Early', type: 'clientError' },
    { code: 426, message: 'Upgrade Required', type: 'clientError' },
    { code: 428, message: 'Precondition Required', type: 'clientError' },
    { code: 429, message: 'Too Many Requests', type: 'clientError' },
    { code: 431, message: 'Request Header Fields Too Large', type: 'clientError' },
    { code: 451, message: 'Unavailable For Legal Reasons', type: 'clientError' },
    // 5xx Server Error
    { code: 500, message: 'Internal Server Error', type: 'serverError' },
    { code: 501, message: 'Not Implemented', type: 'serverError' },
    { code: 502, message: 'Bad Gateway', type: 'serverError' },
    { code: 503, message: 'Service Unavailable', type: 'serverError' },
    { code: 504, message: 'Gateway Timeout', type: 'serverError' },
    { code: 505, message: 'HTTP Version Not Supported', type: 'serverError' },
    { code: 506, message: 'Variant Also Negotiates', type: 'serverError' },
    { code: 507, message: 'Insufficient Storage', type: 'serverError' },
    { code: 508, message: 'Loop Detected', type: 'serverError' },
    { code: 510, message: 'Not Extended', type: 'serverError' },
    { code: 511, message: 'Network Authentication Required', type: 'serverError' }
];

// Username patterns
const usernameAdjectives = [
    'cool', 'super', 'mega', 'ultra', 'pro', 'dark', 'light', 'fast', 'wild',
    'epic', 'cyber', 'digital', 'atomic', 'cosmic', 'stellar', 'ninja', 'silent',
    'swift', 'blazing', 'frozen', 'shadow', 'golden', 'silver', 'iron', 'steel',
    'crystal', 'diamond', 'neon', 'pixel', 'retro', 'funky', 'groovy', 'chill',
    'happy', 'lucky', 'clever', 'brave', 'bold', 'fierce', 'noble', 'royal'
];

const usernameNouns = [
    'wolf', 'eagle', 'tiger', 'dragon', 'phoenix', 'knight', 'wizard', 'ninja',
    'samurai', 'pirate', 'hunter', 'gamer', 'coder', 'hacker', 'master', 'legend',
    'hero', 'king', 'queen', 'prince', 'shadow', 'storm', 'thunder', 'lightning',
    'blade', 'arrow', 'spark', 'flame', 'frost', 'viper', 'cobra', 'hawk', 'raven',
    'fox', 'bear', 'lion', 'panther', 'shark', 'pilot', 'rider', 'runner', 'warrior'
];

// Password character sets
const passwordCharsets = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

export {
    userAgentTemplates,
    mimeTypes,
    commonPorts,
    httpMethods,
    httpStatusCodes,
    usernameAdjectives,
    usernameNouns,
    passwordCharsets
};

export default {
    userAgentTemplates,
    mimeTypes,
    commonPorts,
    httpMethods,
    httpStatusCodes,
    usernameAdjectives,
    usernameNouns,
    passwordCharsets
};
