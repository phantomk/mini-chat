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
          '<div class="app-shell-modal"></div>',
        chat_extend_time    : 1000,
        chat_retract_time   : 300,
        chat_extend_height  : 450,
        chat_retract_height : 15  
      },
      stateMap = { $container : null },
      jqueryMap = {},
      setJqueryMap, initModule, toggleChat;
      
      setJqueryMap = function () {
          var $container = stateMap.$container;
          jqueryMap = { 
              $container : $container,
              $chat : $container.find( '.app-shell-chat' ) 
          };
      };
      
      toggleChat = function ( do_extrend, callback ) {
          var
            px_chat_ht = jqueryMap.$chat.height(),
            is_open = px_chat_ht === configMap.chat_extend_height,
            is_closed = px_chat_ht === configMap.chat_retract_height,
            is_sliding = ! is_open && ! is_closed;
          
          if ( is_sliding ) {
              return false;
          }
          
          if ( do_extrend ) {
              jqueryMap.$chat.animate(
                  { height : configMap.chat_extend_height },
                  configMap.chat_extend_time,
                  function () {
                      if ( callback ) {
                          callback( jqueryMap.$chat );
                      }
                  }
              );
              return true;
          }
          
          jqueryMap.$chat.animate(
            { height : configMap.chat_retract_height },
            configMap.chat_retract_time,
            function () {
                if ( callback ) {
                    callback( jqueryMap.$chat );
                }
            }  
          );
          
          return true;    
      };
      
      initModule = function ( $container ) {
          stateMap.$container = $container;
          $container.html( configMap.main_html );
          setJqueryMap();
          
          setTimeout( function () {
            toggleChat( true );
          }, 3000 );
          setTimeout( function () {
            toggleChat( false );
          }, 8000 );
      };
      
      return { initModule : initModule };   
} () );