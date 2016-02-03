app.chat = ( function () {
    var
        configMap = {
            main_html : String() +
                '<div class="app-chat">' +
                    '<div class="app-chat-head">' +
                        '<div class="app-chat-head-toggle">+</div>' +
                        '<div class="app-chat-head-title">chat</div>' +
                    '</div>' +
                    '<div class="app-chat-closer">x</div>' +
                    '<div class="app-chat-sizer">' +
                        '<div class="app-chat-msgs"></div>' +
                        '<div class="app-chat-box">' +
                            '<input type="text" />' +
                            '<div>send</div>' +
                        '</div>' +
                    '</div>' +
                '</div>',
                settable_map : {}
        },
        stateMap = { $container : null },
        jqueryMap = {},
        setJqueryMap, configModule, initModule;
        
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = { $container : $container };
    };
    
    configModule = function ( input_map ) {
        app.util.setConfigMap( {
            input_map : input_map,
            settable_map : configMap.settable_map,
            configMap : configMap
        } );
        return true;
    };
    
    initModule = function ( $container ) { 
        $container.html( configMap.main_html );
        stateMap.$container = $container;
        setJqueryMap();
        return true;
    };
    
    return {
        configModule : configModule,
        initModule : initModule
    };
} () );