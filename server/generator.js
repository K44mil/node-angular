const fs = require('fs');
const path = require('path');

function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}

class User {
    constructor(
        email,
        password,
        firstName,
        lastName,
        albumNumber,
        role,
        isVerified,
        isBlocked
    ) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.albumNumber = albumNumber;
        this.role = role;
        this.isVerified = isVerified;
        this.isBlocked = isBlocked;
    }
}

// Users generator
const firstNames = [
    'Julia', 'Zuzanna', 'Zofia', 'Hanna', 'Maja', 'Lena', 'Alicja', 'Oliwia', 'Maria', 'Laura',
    'Antoni', 'Jan', 'Jakub', 'Aleksander', 'Franciszek', 'Szymon', 'Filip', 'Mikołaj', 'Stanisław', 'Wojciech' 
];

const lastNames = [
    'Nowak', 'Woźniak', 'Kowalczyk', 'Wójcik', 'Drozd', 'Pająk', 'Trojan', 'Bieś', 'Kozubal', 'Piątek',
    'Duduś', 'Baron', 'Walczyk', 'Traciak', 'Kumiega', 'Mazan', 'Stokłosa', 'Doroba', 'Ziobro', 'Olech'
];

function getRandomAlbumNumber() {
    let albumNumber = '';
    for (let i = 0; i < 6; i++)
        albumNumber += randomInt(0, 9);
    return albumNumber;
}

function getEmail(firstName, lastName) {
    firstName = clearPolishSigns(firstName.toLowerCase());
    lastName =  clearPolishSigns(lastName.toLowerCase());
    return `${firstName}${lastName}${randomInt(0, 10000)}@example.com`;
}

function clearPolishSigns(text) {
    text = text.replace(/ą/g, 'a');
    text = text.replace(/ć/g, 'c');
    text = text.replace(/ę/g, 'e');
    text = text.replace(/ł/g, 'l');
    text = text.replace(/ń/g, 'n');
    text = text.replace(/ó/g, 'o');
    text = text.replace(/ś/g, 's');
    text = text.replace(/ż/g, 'z');
    text = text.replace(/ź/g, 'z');
    return text;
}

const USERS = [];

for (let i = 0; i < 300; i++) {
    const fNameIndex = randomInt(0, 20);
    const lNameIndex = randomInt(0, 20);

    const isVerified = randomInt(0, 2);
    let isBlocked;

    if (isVerified === 0) isBlocked = 0;
    if (isVerified === 1)
        isBlocked = randomInt(0, 2);

    const user = new User(
        getEmail(firstNames[fNameIndex], lastNames[lNameIndex]),
        '$2a$10$kQD8YZU752PHfzAoq1RCF.UNUK1uoh5PqgpbVesArqqO5cr28ANqS',
        firstNames[fNameIndex],
        lastNames[lNameIndex],
        getRandomAlbumNumber(),
        'student',
        isVerified,
        isBlocked
    );

    USERS.push(user);
}

fs.appendFile(path.join(__dirname, '_data/users2.json'), JSON.stringify(USERS), (err) => {
    if (err) throw err;
    console.log('Users created');
});

console.log(path.join(__dirname, '_data/users2.json'));