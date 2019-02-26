'use strict';

export default  function ( callback ){

    const selectorFiles = document.getElementById('histori_file');


    var _weaponNames = [];
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

     var getTmLine =  name => {
        


        const ent = _allweapons.filter(
            ( current, index, arr ) => {
                if( current.head.key == name )
                    return current;
            }
        )[ 0 ]


        let tl = ent.tl.map(
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

        return tl;
    }

    const parseHData = ( data ) =>
    {
        servant.getTmLine = getTmLine;
        servant.allweapons  = _allweapons = data;;

        servant.weaponNames = data.map( ( current, index, arr ) => {

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

        callback( servant );

    }




}