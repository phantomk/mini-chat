chat.shell = (function () {
    var 
      configMap = {
        main_html : String() +
         '<div class="chat-shell-head">' + 
            '<div class="chat-shell-head-logo"></div>' +
            '<div class="chat-shell-head-account"></div>' +
            '<div class="chat-shell-head-search"></div>' +
         '</div>' +
         '<div class="chat-shell-main">' +
            '<div class="chat-shell-main-nav"></div>' +
            '<div class="chat-shell-main-content"></div>' +
         '</div>' +
         '<div class="chat-shell-footer"></div>' +
         '<div class="chat-shell-chat"></div>' +
         '<div class="chat-shell-modal"></div>' 
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