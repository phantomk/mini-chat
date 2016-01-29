app.shell = (function () {
    var 
      configMap = {
        main_html : String() +
         '<div class="app-shell-head">' + 
            '<div class="app-shell-head-logo"></div>' +
            '<div class="app-shell-head-account"></div>' +
            '<div class="app-shell-head-search"></div>' +
         '</div>' +
         '<div class="app-shell-main">' +
            '<div class="app-shell-main-nav"></div>' +
            '<div class="app-shell-main-content"></div>' +
         '</div>' +
         '<div class="app-shell-footer"></div>' +
         '<div class="app-shell-chat"></div>' +
         '<div class="app-shell-modal"></div>' 
      },
      stateMap = { $container : null },
      jqueryMap = {},
      setJqueryMap, initModule;
      
      setJqueryMap = function () {
          var $container = stateMap.$container;
          jqueryMap = { $container : $container };
      };
      
      initModule = function ( $container ) {
          stateMap.$container = $container;
          $container.html( configMap.main_html );
          setJqueryMap();
      };
      
      return { initModule : initModule };   
} () );