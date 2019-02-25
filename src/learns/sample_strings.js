'use strict'

/*
var name = 'Alex';
var hello = `Hello ${name}`;
console.log( hello )*/


/*
let name = 'Alex';
const html = `
    <div>
        <h1>${name}</h1>
    </div>
`;

console.log( html );*/

const tag = ( strings, ...values ) => {
    console.log( strings, values );

    return `${strings[0]}${values[0]}${strings[1]}${values[1]}`;
}

const message = tag `it's ${ new Date().getHours()} and I'm ${ 'sleepy'}`;

console.log( message);
