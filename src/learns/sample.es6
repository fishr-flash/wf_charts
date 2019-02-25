'use strict';

console.log( "hello webpack");
//document.write( 'Hello Webpack!');



///const promise = new Promise;


/*
const promise = new Promise(
    ( resolve, reject ) => {

        if( false ){
            resolve( 'hello promise ');
        }else{
            reject( 'ops, error');
        }

    }
);

promise.then( data => console.log( data ) )
promise.catch( error => console.log( 'error: ' + error ) )
*/


/*
const promise = new Promise( ( resolve, reject) => {
    setTimeout(
        () => {
            if( false ){
                resolve( 'hello promise' )
            }else{
                reject( 'ops error')
            }
        }
        , 2000
    )
})

promise.then( data => console.log( data ) )
promise.catch( error => console.log( 'error: ' + error ) )*/


/*const promise = new Promise( ( resolve, reject) => {
    setTimeout(
        () => {
            if( false ){
                resolve( 'hello promise' )
            }else{
                reject( 'ops error')
            }
        }
        , 2000
    )
})*/

/*
promise.then( data => console.log( 'success: ', data))
.catch ( error => console.log( 'error: ', error ))*/

/*
promise.then( data =>{
                    console.log( 'success: ', data)
                    return 'is second then';
                })
        .then( data => console.log( 'success2: ', data) )
        .catch ( error => console.log( 'error: ', error ) )*/

const promise = new Promise( ( resolve, reject) => {
    throw new Error( 'ALARM');
    setTimeout(
        () => {
            if( true ){
                resolve( 'hello promise' )
            }else{
                reject( 'ops error')
            }
        }
        , 2000
    )
})

promise.then(
    data => console.log( 'success: ', data)
    ,error => console.log( 'error: ', error)
)

