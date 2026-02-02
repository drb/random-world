/**
 * Company data
 */

// Company name prefixes (adjectives/descriptors)
const namePrefix = [
    'Global', 'National', 'International', 'United', 'American', 'Pacific',
    'Atlantic', 'Northern', 'Southern', 'Eastern', 'Western', 'Central',
    'Premium', 'Elite', 'Prime', 'Advanced', 'Modern', 'Dynamic', 'Strategic',
    'Innovative', 'Creative', 'Digital', 'Smart', 'Cyber', 'Tech', 'Data',
    'Cloud', 'Net', 'Web', 'Apex', 'Peak', 'Summit', 'Pinnacle', 'Zenith',
    'Quantum', 'Fusion', 'Synergy', 'Vertex', 'Nova', 'Stellar', 'Bright',
    'Clear', 'Pure', 'Blue', 'Green', 'Red', 'Silver', 'Golden', 'Crystal',
    'Diamond', 'Platinum', 'Iron', 'Steel', 'Titan', 'Atlas', 'Omega', 'Alpha',
    'Beta', 'Delta', 'Sigma', 'Micro', 'Macro', 'Meta', 'Ultra', 'Mega', 'Super'
];

// Company name roots (nouns)
const nameRoot = [
    'Systems', 'Solutions', 'Technologies', 'Industries', 'Enterprises',
    'Holdings', 'Group', 'Partners', 'Associates', 'Consulting', 'Services',
    'Labs', 'Works', 'Dynamics', 'Innovations', 'Ventures', 'Capital',
    'Networks', 'Communications', 'Media', 'Digital', 'Software', 'Hardware',
    'Electronics', 'Manufacturing', 'Engineering', 'Construction', 'Development',
    'Research', 'Analytics', 'Logistics', 'Supply', 'Distribution', 'Trading',
    'Financial', 'Insurance', 'Healthcare', 'Pharma', 'Bio', 'Medical',
    'Energy', 'Power', 'Resources', 'Materials', 'Chemicals', 'Foods',
    'Beverages', 'Retail', 'Wholesale', 'Properties', 'Realty', 'Motors',
    'Aerospace', 'Defense', 'Security', 'Education', 'Publishing'
];

// Company suffixes
const suffixes = [
    'Inc', 'Inc.', 'LLC', 'Ltd', 'Ltd.', 'Corp', 'Corp.', 'Co', 'Co.',
    'Corporation', 'Incorporated', 'Limited', 'Company', 'PLC', 'LLP',
    'LP', 'GmbH', 'AG', 'SA', 'NV', 'BV', 'Pty Ltd', 'Pty'
];

// Industries/Sectors
const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail',
    'Energy', 'Telecommunications', 'Transportation', 'Construction',
    'Agriculture', 'Mining', 'Real Estate', 'Education', 'Entertainment',
    'Hospitality', 'Food & Beverage', 'Automotive', 'Aerospace', 'Defense',
    'Pharmaceuticals', 'Biotechnology', 'Insurance', 'Banking', 'Investment',
    'Consulting', 'Legal Services', 'Accounting', 'Marketing', 'Advertising',
    'Media', 'Publishing', 'Software', 'Hardware', 'Semiconductors',
    'Consumer Electronics', 'E-commerce', 'Logistics', 'Shipping', 'Utilities',
    'Oil & Gas', 'Renewable Energy', 'Environmental Services', 'Waste Management',
    'Security Services', 'Staffing', 'Human Resources', 'Training', 'Research',
    'Non-profit', 'Government', 'Healthcare Services', 'Medical Devices'
];

// Departments
const departments = [
    'Human Resources', 'HR', 'Finance', 'Accounting', 'Marketing', 'Sales',
    'Engineering', 'Research & Development', 'R&D', 'Information Technology', 'IT',
    'Operations', 'Production', 'Manufacturing', 'Quality Assurance', 'QA',
    'Customer Service', 'Customer Support', 'Legal', 'Compliance', 'Risk Management',
    'Business Development', 'Strategy', 'Corporate Development', 'Public Relations', 'PR',
    'Communications', 'Procurement', 'Supply Chain', 'Logistics', 'Facilities',
    'Administration', 'Executive', 'Product Management', 'Project Management',
    'Design', 'Creative', 'Content', 'Analytics', 'Data Science', 'Security',
    'Internal Audit', 'Investor Relations', 'Treasury', 'Tax', 'Payroll'
];

// Job title levels
const jobLevels = {
    executive: [
        'Chief Executive Officer', 'CEO', 'Chief Operating Officer', 'COO',
        'Chief Financial Officer', 'CFO', 'Chief Technology Officer', 'CTO',
        'Chief Marketing Officer', 'CMO', 'Chief Information Officer', 'CIO',
        'Chief Human Resources Officer', 'CHRO', 'Chief Legal Officer', 'CLO',
        'Chief Data Officer', 'CDO', 'Chief Product Officer', 'CPO',
        'Chief Revenue Officer', 'CRO', 'Chief Strategy Officer', 'CSO',
        'President', 'Vice President', 'Executive Vice President', 'EVP',
        'Senior Vice President', 'SVP', 'Managing Director', 'Partner'
    ],
    management: [
        'Director', 'Senior Director', 'Associate Director', 'Head',
        'Manager', 'Senior Manager', 'General Manager', 'Regional Manager',
        'Branch Manager', 'Department Manager', 'Team Lead', 'Team Leader',
        'Supervisor', 'Coordinator', 'Administrator', 'Principal'
    ],
    individual: [
        'Analyst', 'Senior Analyst', 'Associate', 'Senior Associate',
        'Specialist', 'Senior Specialist', 'Consultant', 'Senior Consultant',
        'Engineer', 'Senior Engineer', 'Staff Engineer', 'Principal Engineer',
        'Developer', 'Senior Developer', 'Architect', 'Designer',
        'Administrator', 'Representative', 'Officer', 'Agent',
        'Technician', 'Assistant', 'Clerk', 'Intern', 'Trainee'
    ]
};

// Business buzzwords for catch phrases
const buzzwordVerbs = [
    'aggregate', 'architect', 'benchmark', 'brand', 'cultivate', 'deliver',
    'deploy', 'disintermediate', 'drive', 'e-enable', 'embrace', 'empower',
    'enable', 'engage', 'engineer', 'enhance', 'envision', 'evolve',
    'expedite', 'exploit', 'extend', 'facilitate', 'generate', 'grow',
    'harness', 'implement', 'incentivize', 'incubate', 'innovate', 'integrate',
    'iterate', 'leverage', 'maximize', 'mesh', 'monetize', 'morph',
    'optimize', 'orchestrate', 'productize', 'recontextualize', 'redefine',
    'reintermediate', 'reinvent', 'repurpose', 'revolutionize', 'scale',
    'seize', 'streamline', 'strategize', 'syndicate', 'synergize', 'synthesize',
    'target', 'transform', 'transition', 'unleash', 'utilize', 'visualize'
];

const buzzwordAdjectives = [
    '24/7', '24/365', 'B2B', 'B2C', 'back-end', 'best-of-breed', 'bleeding-edge',
    'bricks-and-clicks', 'clicks-and-mortar', 'collaborative', 'compelling',
    'cross-functional', 'cross-media', 'cross-platform', 'customer-centric',
    'customized', 'cutting-edge', 'distributed', 'dot-com', 'dynamic',
    'e-business', 'efficient', 'elastic', 'emerging', 'end-to-end',
    'enterprise', 'extensible', 'frictionless', 'front-end', 'global',
    'granular', 'holistic', 'impactful', 'innovative', 'integrated',
    'interactive', 'intuitive', 'killer', 'leading-edge', 'magnetic',
    'mission-critical', 'next-generation', 'one-to-one', 'open-source',
    'out-of-the-box', 'plug-and-play', 'proactive', 'real-time', 'revolutionary',
    'robust', 'scalable', 'seamless', 'sticky', 'strategic', 'synergistic',
    'transparent', 'turn-key', 'ubiquitous', 'user-centric', 'value-added',
    'vertical', 'viral', 'virtual', 'visionary', 'web-enabled', 'wireless',
    'world-class'
];

const buzzwordNouns = [
    'action-items', 'alignments', 'applications', 'architectures', 'bandwidth',
    'best practices', 'channels', 'communities', 'content', 'convergence',
    'core competencies', 'deliverables', 'e-business', 'e-commerce', 'e-markets',
    'e-services', 'e-tailers', 'ecosystems', 'experiences', 'eyeballs',
    'functionalities', 'human capital', 'imperatives', 'infomediaries',
    'infrastructures', 'initiatives', 'intellectual capital', 'interfaces',
    'markets', 'methodologies', 'metrics', 'mindshare', 'models', 'networks',
    'niches', 'paradigms', 'partnerships', 'platforms', 'portals', 'processes',
    'relationships', 'resources', 'results', 'ROI', 'schemas', 'services',
    'solutions', 'strategic alliances', 'strategies', 'supply-chains',
    'synergies', 'systems', 'technologies', 'users', 'value', 'vortals',
    'web services', 'web-readiness'
];

export {
    namePrefix,
    nameRoot,
    suffixes,
    industries,
    departments,
    jobLevels,
    buzzwordVerbs,
    buzzwordAdjectives,
    buzzwordNouns
};

export default {
    namePrefix,
    nameRoot,
    suffixes,
    industries,
    departments,
    jobLevels,
    buzzwordVerbs,
    buzzwordAdjectives,
    buzzwordNouns
};
