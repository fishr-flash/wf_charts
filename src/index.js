'use strict'

import jsnhist from './data/rawhist_24022019_1402-24022019_1955';
import histServant from './data/history_loader';


//const weaponKey = 'ПП-2000 Карбон';
//const weaponKey = 'AT308 Синдикат';
const weaponKey = 'H&K MP5A5 Custom Синдикат';
const warrs = jsnhist();
var servant;
var selectKey;
var titleKey;
var divChartOpts;
var setOpts;

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
 ]);
 */
const ent = warrs.filter(
    ( current, index, arr ) => {
        if( current.head.key == weaponKey )
                                return current;
    }
)[ 0 ]

const weapons = warrs.map( ( current, index, arr ) => {


        return current.head.key;
})






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
                    , "cost"
                    //, "session cost"
                   // , "liquidity"
                   // , "count"
                    ]);


google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(init);

function init() {
    histServant( updateChart );

    const datetimes = document.getElementsByName( 'datetimes' );


    //constructOpts( "count")

    connFunct = changePeriod;
    document.getElementsByName( 'hiddenSt').onchange = changePeriod;
    document.getElementsByName( 'hiddenEnd').onchange = changePeriod;

}

function drawChart( minv = 42, timeline, nameTitle ) {
    /*var data = google.visualization.arrayToDataTable([
        ['Year', 'Sales', 'Expenses'],
        ['2013', 1000, 400],
        ['2014', 1170, 460],
        ['2015', 660, 1120],
        ['2016', 1030, 540]
    ]);*/
    let data = google.visualization.arrayToDataTable( timeline );

    let options = {
        title: nameTitle,
        hAxis: {title: "time", titleTextStyle: {color: '#333'}},
        vAxis: {minValue: minv }
    };

    let chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(data, options);






}

var changePeriod  = ( timeOn, timeOff ) => {

    /**
     * timeOn, timeOff - object Date
     */


    const tl = servant.getTmLine( servant.weaponNames[ selectKey.selectedIndex ], timeOn._d, timeOff._d  )


    drawChart(  42, tl );

}

var changeKey = ( e ) =>{
    let selected = servant.weaponNames[ e.target.selectedIndex ];
    drawChart( ent.head.minc + 42, servant.getTmLine( selected ), selected  );
    const t = document.createTextNode( selected );
    titleKey.removeChild( titleKey.firstChild );
    titleKey.appendChild( t );

}

function  updateChart ( srv ) {


    if( !servant )
            servant = srv;





    /**
     *   0: "c"
         1: "cnt"
         2: "lq"
         3: "sess"
         length: 4
     */
    if( !setOpts || !setOpts.length )
    {
        setOpts = [ servant.optNams[ 0 ] ];
        constructOpts( servant.optNams );
    }


    const selected = prepareCmbBox();

    drawChart( ent.head.minc + 42, servant.getTmLine( selected  ), selected );


}

const constructOpts = ( arrNms )=>
{
    divChartOpts = document.getElementById( 'chart_opts');


    arrNms.forEach( ( label, index, array ) =>{


        const pp = document.createElement( "p" );

        const lbl = document.createElement( 'label' );
        const t = document.createTextNode( label );


        const chb = document.createElement( 'input' );
        chb.type = 'checkbox';
        chb.title = label;
        if( index == 0 ) chb.checked = true;
        chb.onclick = changeOpts;
        lbl.appendChild( chb )
        lbl.appendChild( t );
        pp.appendChild( lbl );
        divChartOpts.appendChild( pp )
    } )

}

const prepareCmbBox = ()=>{
    selectKey = document.getElementById( "wepon_keys" );
    titleKey = document.getElementById( "selected_title" );

    while (selectKey.firstChild) {
        selectKey.removeChild(selectKey.firstChild);
    }

    let sel = document.createElement("option");
    servant.weaponNames.map((current, index, arr) => {

        let sel = document.createElement("option");
        sel.value = current;
        sel.innerHTML = current;
        selectKey.appendChild(sel)


    })
    sel.value = "weapon";
    sel.innerHTML = "weapon";
    selectKey.appendChild(sel)
    //selectKey.wr
    selectKey.onchange = changeKey;

    let selected = servant.weaponNames[ selectKey.selectedIndex ];

    const t = document.createTextNode( selected );
    titleKey.removeChild( titleKey.firstChild );
    titleKey.appendChild( t );

    return selected;
}


const changeOpts = ( e )=>{


    if( e.target.checked )
        setOpts.push( e.target.title );
    else
        setOpts.splice( setOpts.indexOf( e.target.title), 1 );

    const tl = servant.getTmLine( servant.weaponNames[ selectKey.selectedIndex ], 0, 0, setOpts.slice()  )


    drawChart(  42, tl, servant.weaponNames[ selectKey.selectedIndex ]);
    //drawChart( ent.head.minc + 42, servant.getTmLine( selected  ), selected );


}

