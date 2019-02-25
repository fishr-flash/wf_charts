'use strict'

import jsnhist from './data/rawhist_24022019_1402-24022019_1955';
import hloader from './data/history_loader';


//const weaponKey = 'ПП-2000 Карбон';
//const weaponKey = 'AT308 Синдикат';
const weaponKey = 'H&K MP5A5 Custom Синдикат';
const warrs = jsnhist();

//console.log( warrs );
/**
 * head: {…}
 ​​​ entity_id: 3924
 ​​​ key: "Сайга H.G.C. Custom Синдикат"
 ​​​ max_cost: 125
 ​​​ min_cost: 95
 ​​​ <prototype>: Object { … }
 ​​ timeline: Array(65) [ {…}, {…}, {…}, … ]
 ​​ <prototype>: Object { … }

 надо сделать выходной массив как
 var data = google.visualization.arrayToDataTable([
 ['Year', 'Sales', 'Expenses'],
 ['2013',  1000,      400],
 ['2014',  1170,      460],
 ['2015',  660,       1120],
 ['2016',  1030,      540]
 ]);
 */
const ent = warrs.filter(
    ( current, index, arr ) => {
        if( current.head.key == weaponKey )
                                return current;
    }
)[ 0 ]

const weapons = warrs.map( ( current, index, arr ) => {

    console.log( 'current', current.head.key );
        return current.head.key;
})

console.log( "weapons: ",  weapons );



 //console.log(  ent )
/**
 * -{
        "head" : -{
        "key" : AWM Карбон,
        "entity_id" : 3863,
        "max_cost" : 121,
        "min_cost" : 115
        },
        "timeline" : -[
        -{
        "cost" : 121,
        "time" : +{ ... },
        "count" : 1218,
        "liquidity" : 0,
        "session_cost" : 121
        },
        +{ ... },
        +{ ... }
 */
var  tl = ent.tl.map(
    ( current, index, arr ) => {
        return [
            `${current.t.hrs}.${current.t.min}.${current.t.sec}`
            , current.c
            //, current.sess
            //, current.lq
            //, current.cnt / 10
        ]

    }
)
tl.unshift( [ "time"
                    , "ccost"
                    //, "session cost"
                   // , "liquidity"
                   // , "count"
                    ]);


google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(init);

function init() {
    hloader();
    drawChart( 42 )
}
//console.log( tl )
function drawChart( minv = 42 ) {
    /*var data = google.visualization.arrayToDataTable([
        ['Year', 'Sales', 'Expenses'],
        ['2013', 1000, 400],
        ['2014', 1170, 460],
        ['2015', 660, 1120],
        ['2016', 1030, 540]
    ]);*/
    let data = google.visualization.arrayToDataTable( tl );

    let options = {
        title: 'WF Marketplace',
        hAxis: {title: "", titleTextStyle: {color: '#333'}},
        vAxis: {minValue: minv }
    };

    let chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(data, options);


    var selectKey = document.getElementById( "wepon_keys" );
    if( !selectKey.options.length )
    {
        let sel = document.createElement( "option");
        weapons.map( ( current, index, arr ) => {

            let sel = document.createElement( "option");
            sel.value = current;
            sel.innerHTML = current;
            selectKey.appendChild( sel )


        })
        sel.value = "weapon";
        sel.innerHTML = "weapon";
        selectKey.appendChild( sel )
        //selectKey.wr
        selectKey.onchange = changeKey;
    }


}

var changeKey = ( e ) =>{
    console.log( "on select key: ",weapons[ e.target.selectedIndex ]);

    let selected = weapons[ e.target.selectedIndex ];

    const ent = warrs.filter(
        ( current, index, arr ) => {
            if( current.head.key == selected )
                return current;
        }
    )[ 0 ]
    console.log( "ent: ",ent);

    tl = ent.tl.map(
        ( current, index, arr ) => {
            return [
                `${current.t.hrs}.${current.t.min}.${current.t.sec}`
                , current.c
                //, current.sess
                , current.lq
                //,100 + ( current.cnt / 100 )
            ]

        }
    )
    tl.unshift( [ "time"
        , "ccost"
        //, "session cost"
         , "liquidity"
         //, "count"
    ]);

    drawChart( ent.head.minc + 42 );

}
//console.log(  tl )