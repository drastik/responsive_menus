/**
 * @file
 * Simple responsification of menus.
 */
(function ($) {
  /**
   * Handle clicks & toggling the menu.
   */
  var toggler_click = function() {
    $(this).parent().toggleClass('responsive-toggled');
  };
  /**
   * Unbind other mouse events on the menu items.
   */
  function remove_mouse_events(menuElement) {
    // Determine jQuery version and what disable options we have.
    var jqVersion = $.fn.jquery;
    if (jqVersion < 1.7) {
      $(menuElement).die('mouseover mouseout mouseenter mouseleave');
      $(menuElement + ' li').die('mouseover mouseout mouseenter mouseleave');
      $(menuElement + ' li a').die('mouseover mouseout mouseenter mouseleave');
    }
    else {
      $(menuElement).off('hover');
      $(menuElement + ' li').off('hover');
      $(menuElement + ' li a').off('hover');
    }
    $(menuElement).unbind('mouseover mouseout mouseenter mouseleave');
    $(menuElement + ' li').unbind('mouseover mouseout mouseenter mouseleave');
    $(menuElement + ' li a').unbind('mouseover mouseout mouseenter mouseleave');
  }
  // Iterate through selectors, check window sizes, add some classes.
  Drupal.behaviors.responsive_menus = {
    attach: function (context, settings) {
      settings.responsive_menus = settings.responsive_menus || {};
      // Window width with legacy browsers.
      var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      $('body').once('responsive-menus-load', function(){
        $.each(settings.responsive_menus, function(ind, iteration) {
          if (iteration.responsive_menus_style != 'responsive_menus_simple') {
            return true;
          }
          if (!iteration.selectors.length) {
            return true;
          }
          if (!iteration.media_size.length) {
            iteration.media_size = 768;
          }
          // Handle clicks & toggling.
          var toggler_class = '';
          var toggler_text = iteration.toggler_text;
          // Iterate through our selectors.
          $.each(iteration.selectors, function(index, value) {
            if ($(value).length > 1) {
              // Handle nested menus.  Make sure we get the first, but not children.
              $(value).each(function(val_index) {
                if (!$(this).parents('ul').length) {
                  if (!$(this).hasClass('responsive-menus-simple')) {
                    toggler_class = 'responsive-menus-' + ind + '-' + index + '-' + val_index;
                    // Remove attributes setting.
                    if (iteration.remove_attributes) {
                      $(this).data('removeattr', true);
                      $(this).data('rmids', $(this).attr('id'));
                      $(this).data('rmclasses', $(this).attr('class'));
                    }
                    $(this).addClass('responsive-menus-simple').wrap('<div data-mediasize="' + iteration.media_size + '" class="responsive-menus ' + toggler_class + '" />');
                    $('.' + toggler_class).prepend('<span class="toggler">' + toggler_text + '</span>');
                    $('.' + toggler_class + ' .toggler').bind('click', toggler_click);
                    // Unbind other mouse events.
                    if (iteration.disable_mouse_events) {
                      //$(this).data('disablemouse', true);
                      remove_mouse_events($(this));
                    }
                    // Use absolute positioning.
                    if (iteration.absolute) {
                      $('.' + toggler_class).addClass('absolute');
                    }
                    // Handle first size check.
                    if (windowWidth < iteration.media_size) {
                      // Remove attributes setting.
                      if (iteration.remove_attributes) {
                        var tempElement = $(this);
                        $(tempElement).attr('class', 'responsive-menus-simple').attr('id', 'rm-removed');
                      }
                      $('.' + toggler_class).addClass('responsified');
                    }
                  }
                }
              });
            }
            else {
              // Single level menus.
              if (!$(value).hasClass('responsive-menus-simple')) {
                toggler_class = 'responsive-menus-' + ind + '-' + index;
                // Remove attributes setting.
                if (iteration.remove_attributes) {
                  $(value).data('removeattr', true);
                  $(value).data('rmids', $(value).attr('id'));
                  $(value).data('rmclasses', $(value).attr('class'));
                }
                $(value).addClass('responsive-menus-simple').wrap('<div data-mediasize="' + iteration.media_size + '" class="responsive-menus ' + toggler_class + '" />');
                $('.' + toggler_class).prepend('<span class="toggler">' + toggler_text + '</span>');
                $('.' + toggler_class + ' .toggler').bind('click', toggler_click);
                // Unbind other mouse events.
                if (iteration.disable_mouse_events) {
                  // @todo For rebinding mouse events.
                  /*if ($(value + ' li a').data('events')) {
                    $(value).data('tmpevents', $(value + ' li a').data('events'));
                  }*/
                  remove_mouse_events(value);
                }
                // Use absolute positioning.
                if (iteration.absolute) {
                  $('.' + toggler_class).addClass('absolute');
                }
                // Handle first size check.
                if (windowWidth < iteration.media_size) {
                  // Remove attributes setting.
                  if (iteration.remove_attributes) {
                    var tempElement = $(value);
                    $(tempElement).attr('class', 'responsive-menus-simple').attr('id', 'rm-removed');
                  }
                  $('.' + toggler_class).addClass('responsified');
                }
              }
            }
          });
       });
        // Handle window resizing.
        $(window).resize(function() {
          // Window width with legacy browsers.
          windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
          $('.responsive-menus').each(function(menuIndex, menuValue){
            mediasize = $(this).data('mediasize') || 768;
            var menuElement = $(this).find('.responsive-menus-simple');
            if (windowWidth > mediasize) {
              if ($(menuElement).data('removeattr')) {
                $(menuElement).addClass($(menuElement).data('rmclasses'));
                $(menuElement).attr('id', $(menuElement).data('rmids'));
              }
              $(this).removeClass('responsified');
            }
            if (windowWidth < mediasize) {
              if ($(menuElement).data('removeattr')) {
                $(menuElement).attr('class', 'responsive-menus-simple').attr('id', 'rm-removed');
              }
              $(this).addClass('responsified');
            }
          });
        });
      });
    }
  };

}(jQuery));
