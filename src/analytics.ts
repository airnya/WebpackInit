import * as $ from 'jquery';

function createAnalytics( ): object{
    let counter = 0;
    let isDestroyer = false;

    const listener = ( ): number => counter++
    //document.addEventListener( 'click', listener );
    $(document).on( 'click', listener );
    console.log(typeof (isDestroyer), typeof (counter))

    return{
        destroy( ){
            $(document).off( 'click', listener );
            //document.removeEventListener( 'click', listener );
            isDestroyer = true;
        },

        getClick( ){
            if( isDestroyer ) {
                return `Analytics is destroyed. Total clicks =${counter}`;
            }
            return counter;
        }
    }
}

window['analytics'] = createAnalytics( );