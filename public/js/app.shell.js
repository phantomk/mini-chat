app.shell = (function () {
    var 
      configMap = {
        anchor_schema_map : {
            chat : { opened : true, closed : true }
        },
        resize_interval : 200,
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
          '<div class="app-shell-modal"></div>',
      },
      stateMap = {
          $container : undefined, 
          anchor_map : {},
          resize_idto : undefined
      },
      jqueryMap = {},
      setJqueryMap, initModule, copyAnchorMap, changeAnchorPart, onHasChange, onResize, setChatAnchor;
      
      copyAnchorMap = function () {
          return $.extend( true, {}, stateMap.anchor_map );
      };
      
      setJqueryMap = function () {
          var $container = stateMap.$container;
          jqueryMap = { 
              $container : $container
          };
      };
      
      changeAnchorPart = function ( arg_map ) {
          var
            anchor_map_revise = copyAnchorMap(),
            bool_return = true,
            key_name, key_name_dep;
          KEYVAL:
          for ( key_name in arg_map ) {
              if (arg_map.hasOwnProperty( key_name ) ) {
                  if ( key_name.indexOf( '_' ) === 0 ) {
                      continue KEYVAL;
                  }
                  
                  anchor_map_revise[key_name] = arg_map[key_name];
                  key_name_dep = '_' + key_name;
                  
                  if ( arg_map[key_name_dep] ) {
                      anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
                  }
                  else {
                      delete anchor_map_revise[key_name_dep];
                      delete anchor_map_revise['_s' + key_name_dep];
                  }
              }
          }
          
          try {
              $.uriAnchor.setAnchor( anchor_map_revise );
          }
          catch ( error ) {
              $.uriAnchor.setAnchor( stateMap.anchor_map, null, true );
              bool_return = false;
          }
          
          return bool_return;
      };
      
      onHasChange = function ( event ) {
          var
            anchor_map_previous = copyAnchorMap(),
            is_ok = true,
            anchor_map_proposed, _s_chat_previous, _s_chat_proposed, s_chat_proposed;
            
          try {
              anchor_map_proposed = $.uriAnchor.makeAnchorMap();
          }
          catch ( error ) {
              $.uriAnchor.setAnchor( anchor_map_proposed, null, true );
              return false;
          }
          stateMap.anchor_map = anchor_map_proposed;
          
          _s_chat_previous = anchor_map_previous._s_chat;
          _s_chat_proposed = anchor_map_proposed._s_chat;
          
          if ( ! anchor_map_previous || _s_chat_previous !== _s_chat_proposed ) {
              s_chat_proposed = anchor_map_proposed.chat;
              switch ( s_chat_proposed ) {
                  case 'opened' :
                    is_ok = app.chat.setSliderPosition( 'opened' );
                  break;
                  case 'closed' :
                    is_ok = app.chat.setSliderPosition( 'closed' );
                  break;
                  default :
                    app.chat.setSliderPosition( 'closed' );
                    delete anchor_map_proposed.chat;
                    $.uriAnchor.setAnchor( anchor_map_proposed, null, true );
              }
          }
          
          if ( ! is_ok ) {
            if ( anchor_map_previous ) {
                $.uriAnchor.setAnchor( anchor_map_previous, null, true );
                stateMap.anchor_map = anchor_map_previous;
            }
            else {
                delete anchor_map_proposed.chat;
                $.uriAnchor.setAnchor( anchor_map_proposed, null, true );
            }
          }
          
          return false;
      };
      
      onResize = function (){
        if ( stateMap.resize_idto ){ return true; }

        app.chat.handleResize();
        stateMap.resize_idto = setTimeout(
        function (){ stateMap.resize_idto = undefined; },
        configMap.resize_interval
        );

        return true;
    };
      
      setChatAnchor = function ( position_type ) {
          return changeAnchorPart( { chat : position_type } );
      };
      
      initModule = function ( $container ) {
          stateMap.$container = $container;
          $container.html( configMap.main_html );
          setJqueryMap();
      
          $.uriAnchor.configModule({
            schema_map : configMap.anchor_schema_map
          });
          
          app.chat.configModule({
            set_chat_anchor : setChatAnchor,
            chat_model      : app.model.chat,
            people_model    : app.model.people
          });
          app.chat.initModule( jqueryMap.$container );
      
          $(window)
            .bind( 'resize', onResize )
              .bind( 'hashchange', onHasChange )
            .trigger( 'hashchange' );
      };
      
      return { initModule : initModule };   
} () );