'use strict';

export default  function ( callback ){

    const selectorFiles = document.getElementById('histori_file');



    var _keyName;

    var _dateOn;
    var _dateOff;

    var _selectedOpts = [ 'c' ];


    var _allweapons = [];

    function servant() {};

    selectorFiles.addEventListener("change", handleFiles, false);

    function handleFiles() {
        const fileList = this.files; /* now you can work with the file list */

        const reader = new FileReader;

        reader.onload = ( e ) => {
            parseHData( JSON.parse( e.target.result ) )
        }
        reader.readAsText( fileList[ 0 ] );




    }

     var getTmLine =  ( name, dateOn = 0, dateOff = 0, opts ) => {


        if( opts && opts.length )_selectedOpts = opts;

        if( name ) _keyName = name;

        const ent = _allweapons.filter(
            ( current, index, arr ) => {
                if( current.head.key == _keyName )
                    return current;
            }
        )[ 0 ]



         if( !dateOn && !_dateOn)
         {

             //Object { mn: "03", yr: "2019", min: "14", hrs: "15", sec: "10", d: "01" }
             const fd = ent.tl[ 0 ].t;

             //new Date(year, month[, day[, hour[, minute[, second[, millisecond]]]]]);
             dateOn =  new Date( Number.parseFloat( fd.yr )
                                        , Number.parseFloat(fd.mn )
                                        , Number.parseFloat(fd.d )
                                        , Number.parseFloat(fd.hrs )
                                        , Number.parseFloat(fd.min )
                                        , Number.parseFloat(fd.sec ) );

             _dateOn = dateOn;
         }
         else if( dateOn )
         {
             /// datapicker почему то возвращает предыдущий месяц
             dateOn.setMonth( dateOn.getMonth() + 1 );
             _dateOn = dateOn;
         }
         else
         {
             dateOn = _dateOn;
         }



         if( !dateOff && !_dateOff)
         {
             //Object { mn: "03", yr: "2019", min: "14", hrs: "15", sec: "10", d: "01" }
             const ld = ent.tl[ ent.tl.length - 1 ].t;

             //new Date(year, month[, day[, hour[, minute[, second[, millisecond]]]]]);
             dateOff =  new Date(
                 Number.parseFloat( ld.yr )
                 , Number.parseFloat(ld.mn )
                 , Number.parseFloat(ld.d )
                 , Number.parseFloat(ld.hrs )
                 , Number.parseFloat(ld.min )
                 , Number.parseFloat(ld.sec )
             //dateOff =  new Date( 2019, 3, 3, 11, 37, 10 );
              );

             _dateOff = dateOff;
         }
         else if( dateOff )
         {
             /// datapicker почему то возвращает предыдущий месяц
             dateOff.setMonth( dateOff.getMonth() + 1 );
             _dateOff = dateOff;
         }
         else
         {
             dateOff = _dateOff;
         }

         let ttl = ent.tl.filter( ( current ) => {

             const md = new Date(
                 Number.parseFloat( current.t.yr )
                 ,Number.parseFloat( current.t.mn )
                 ,Number.parseFloat( current.t.d )
                 ,Number.parseFloat( current.t.hrs )
                 ,Number.parseFloat( current.t.min )
                 ,Number.parseFloat( current.t.sec )
             );

             if(
                 dateOn.valueOf() <= Date.parse( md )
                && dateOff.valueOf() >= Date.parse( md )
             )
             {
                 return current;
             }

         });


        let tl = ttl.map(
            ( current ) => {
                let res = [];
                res.push(  `${current.t.hrs}.${current.t.min}.${current.t.sec}` );
                const len = _selectedOpts.length;
                for( var i = 0; i < len; i++ )
                {
                    if( _selectedOpts[ i ] === 'cnt' )res.push(  configCnt( current[ _selectedOpts[ i ]] ) );
                    else res.push( current[ _selectedOpts[ i ]]);
                }


                return res;

            }
        )
            

         
        tl.unshift( ( ['time'].concat( _selectedOpts.slice() ) ) );

        return tl;
    }

    

    const parseHData = ( data ) =>
    {
        servant.getTmLine = getTmLine;
        servant.allweapons  = _allweapons = data;;


        ///FIXME: Не уверен что сортировка здесь нужна, но она точно ломает массив временные метки десортируются
        /*servant.allweapons.sort( ( a, b ) =>{
            if( a.tl[ a.tl.length - 1 ].lq > b.tl[ b.tl.length - 1 ].lq ) return -1;
            else if( a.tl[ a.tl.length - 1 ].lq < b.tl[ b.tl.length - 1 ].lq ) return 1;
            else return 0;
        })*/

        servant.weaponNames = servant.allweapons.map( ( current, index, arr ) => {

            /**
             * {head: {…}, tl: Array(248)}
                 head:
                 id: 3873
                 key: "Жилет снайпера Синдикат"
                 maxc: 239
                 minc: 239
                 __proto__: Object
                 tl: (248) [{…}, ... ]
                 __proto__: Object
             */
           return current.head.key;


        })

        const nams = [];
        for( var nm in servant.allweapons[ 0 ].tl[ 0 ])
            if (!(nm === 't')) nams.push(nm);


        nams.sort();
        _selectedOpts = [ nams[ 0 ] ];

        servant.optNams = nams;


        callback( servant );

    }

    const configCnt = ( cnt ) =>{

        switch ( ( cnt + "" ).length )
        {
            case 5:
                cnt = cnt / 1000;
                break;
            case 4:
                cnt = cnt / 100;
                break;

            case 3:
                cnt = cnt / 10;
                break;
        }

        return cnt;
    }




}