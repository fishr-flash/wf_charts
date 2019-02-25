'use strict';

export default  ()=>{

    const selectorFiles = document.getElementById('histori_file');


    var weaponNames = [];
    let allweapons;

    selectorFiles.addEventListener("change", handleFiles, false);

    function handleFiles() {
        const fileList = this.files; /* now you can work with the file list */

        const reader = new FileReader;

        reader.onload = ( e ) => {

            console.log(e.target.result)

            parseHData( JSON.parse( e.target.result ) )
        }
        reader.readAsText( fileList[ 0 ] );
        console.log( "reader.result:", reader.result)

    }

    const parseHData = ( data ) =>
    {
        allweapons = data;
        weaponNames = data.map( ( current, index, arr ) => {

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
            //console.log( 'current', current.head.key );
            return current.head.key;
        })

    }



}