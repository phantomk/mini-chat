var app = (function () {
    var initModule = function ( $container ) {
        app.shell.initModule( $container );
    };
    
    return {initModule: initModule};
} ());