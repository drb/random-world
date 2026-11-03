/**
 * British (en-GB) names, each list ordered most-common-first so pickRanked can
 * weight them by frequency.
 *
 * First names reflect today's working-age adults (born roughly 1966-2001), not
 * current baby-name charts, so a generated "colleague" sounds like one. Orders
 * are approximate, drawn from ONS birth-registration rankings across those
 * decades and surname frequency counts for England, Wales and Scotland.
 * ASCII-only; a few surnames carry an apostrophe (O'Brien), so strip
 * non-letters before using one in an email local part.
 */

const male = [
    'David', 'Paul', 'Mark', 'Andrew', 'James', 'Michael', 'Daniel', 'Christopher',
    'John', 'Richard', 'Matthew', 'Stephen', 'Robert', 'Thomas', 'Peter', 'Simon',
    'Steven', 'Jonathan', 'Ian', 'Lee', 'Adam', 'Gary', 'Craig', 'Martin',
    'Neil', 'Darren', 'Benjamin', 'Nicholas', 'Jason', 'Kevin', 'Anthony', 'Alexander',
    'Samuel', 'Luke', 'Ryan', 'Jamie', 'Joseph', 'Philip', 'Stuart', 'Gareth',
    'Liam', 'Scott', 'Sean', 'Alan', 'Graham', 'Carl', 'Dean', 'Wayne',
    'Timothy', 'Edward', 'William', 'Oliver', 'Jack', 'Joshua', 'Ashley',
    'Russell', 'Kieran', 'Ross', 'Shaun', 'Barry', 'Keith', 'Colin', 'Jeremy',
    'Nathan', 'Aaron', 'Dominic', 'Tom', 'Rob', 'Chris', 'Ben', 'Matt',
    'Mohammed', 'Ahmed', 'Imran', 'Asif', 'Rajesh', 'Sanjay', 'Amit', 'Hassan',
    'Kwame', 'Tunde', 'Rhys', 'Owen', 'Dylan', 'Callum', 'Connor', 'Fraser',
    'Euan', 'Alistair', 'Hamish', 'Declan', 'Ciaran', 'Patrick', 'George', 'Harry',
    'Charlie', 'Henry', 'Rory', 'Toby', 'Marcus', 'Jake', 'Bradley', 'Elliot'
];

const female = [
    'Sarah', 'Claire', 'Emma', 'Laura', 'Rebecca', 'Nicola', 'Lisa', 'Michelle',
    'Helen', 'Rachel', 'Louise', 'Kelly', 'Joanne', 'Gemma', 'Victoria', 'Amy',
    'Katie', 'Hannah', 'Jennifer', 'Karen', 'Samantha', 'Natalie', 'Charlotte', 'Lucy',
    'Julie', 'Jessica', 'Sophie', 'Stephanie', 'Emily', 'Kerry', 'Donna', 'Amanda',
    'Elizabeth', 'Catherine', 'Joanna', 'Lauren', 'Kate', 'Zoe', 'Hayley', 'Leanne',
    'Jade', 'Danielle', 'Alison', 'Susan', 'Angela', 'Tracey', 'Deborah', 'Jane',
    'Anna', 'Fiona', 'Caroline', 'Kirsty', 'Jodie', 'Holly', 'Georgina', 'Ruth',
    'Melanie', 'Sharon', 'Kathryn', 'Lindsay', 'Vicky', 'Becky', 'Jo', 'Kim',
    'Eleanor', 'Alice', 'Grace', 'Olivia', 'Chloe', 'Megan', 'Bethany', 'Abigail',
    'Harriet', 'Philippa', 'Rosie', 'Ellie', 'Jasmine', 'Naomi', 'Esther', 'Beth',
    'Priya', 'Aisha', 'Fatima', 'Nadia', 'Ayesha', 'Sana', 'Anjali', 'Neha',
    'Yasmin', 'Shabnam', 'Ngozi', 'Abena', 'Siobhan', 'Niamh', 'Aileen', 'Morag',
    'Catriona', 'Rhian', 'Cerys', 'Bronwen', 'Tamsin', 'Imogen', 'Freya', 'Isobel'
];

const surnames = [
    'Smith', 'Jones', 'Williams', 'Taylor', 'Brown', 'Davies', 'Evans', 'Wilson',
    'Thomas', 'Johnson', 'Roberts', 'Robinson', 'Thompson', 'Wright', 'Walker', 'White',
    'Edwards', 'Hughes', 'Green', 'Hall', 'Lewis', 'Harris', 'Clarke', 'Patel',
    'Jackson', 'Wood', 'Turner', 'Martin', 'Cooper', 'Hill', 'Ward', 'Morris',
    'Moore', 'Clark', 'Lee', 'King', 'Baker', 'Harrison', 'Morgan', 'Allen',
    'James', 'Scott', 'Phillips', 'Watson', 'Davis', 'Parker', 'Price', 'Bennett',
    'Young', 'Griffiths', 'Mitchell', 'Kelly', 'Cook', 'Carter', 'Richardson', 'Bailey',
    'Collins', 'Bell', 'Shaw', 'Murphy', 'Miller', 'Cox', 'Richards', 'Khan',
    'Marshall', 'Anderson', 'Simpson', 'Ellis', 'Adams', 'Singh', 'Begum', 'Wilkinson',
    'Foster', 'Chapman', 'Powell', 'Webb', 'Rogers', 'Gray', 'Mason', 'Ali',
    'Hunt', 'Hussain', 'Campbell', 'Matthews', 'Owen', 'Palmer', 'Holmes', 'Mills',
    'Barnes', 'Knight', 'Lloyd', 'Butler', 'Russell', 'Barker', 'Fisher', 'Stevens',
    'Jenkins', 'Murray', 'Dixon', 'Harvey', 'Graham', 'Pearson', 'Ahmed', 'Fletcher',
    'Walsh', 'Kaur', 'Gibson', 'Howard', 'Andrews', 'Stewart', 'Elliott', 'Reynolds',
    'Saunders', 'Payne', 'Fox', 'Ford', 'Pearce', 'Day', 'Brooks', 'West',
    'Lawrence', 'Cole', 'Atkinson', 'Bradley', 'Spencer', 'Gill', 'Dawson', 'Ball',
    'Burton', "O'Brien", 'Watts', 'Rose', 'Booth', 'Perry', 'Ryan', 'Grant',
    'Wells', 'Armstrong', 'Francis', 'Rees', 'Hayes', 'Hart', 'Hudson', 'Newman',
    'Barrett', 'Webster', 'Hunter', 'Gregory', 'Carr', 'Lowe', 'Page', 'Marsh',
    'Riley', 'Dunn', 'Woods', 'Parsons', 'Berry', 'Stone', 'Reid', 'Holland',
    'Hawkins', 'Harding', 'Porter', 'Robertson', 'Newton', 'Oliver', 'Reed', 'Kennedy',
    'Williamson', 'Bird', 'Gardner', 'Shah', 'Dean', 'Lane', 'Cooke', 'Bates',
    'Henderson', 'Parry', 'Burgess', 'Bishop', 'Walton', 'Burns', 'Nicholson', 'Shepherd',
    'Ross', 'Cross', 'Long', 'Freeman', 'Warren', 'Nicholls', 'Hamilton', 'Byrne',
    'Sutton', 'McDonald', 'Yates', 'Hodgson', 'Robson', 'Curtis', 'Hopkins', "O'Connor",
    'Harper', 'Coleman', 'Watkins', 'Moss', 'McCarthy', 'Chambers', "O'Neill", 'Griffin',
    'Sharp', 'Hardy', 'Wheeler', 'Potter', 'Osborne', 'Johnston', 'Gordon', 'Doyle',
    'Wallace', 'George', 'Jordan', 'Hutchinson', 'Okafor', 'Mensah', 'Nguyen', 'Chen'
];

export default { male, female, surnames };
export { male, female, surnames };
