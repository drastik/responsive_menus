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

  // Iterate through selectors, check window sizes, add some classes.
  Drupal.behaviors.responsive_menus = {
    attach: function (context, settings) {
      settings.responsive_menus = settings.responsive_menus || {};
      if (!settings.responsive_menus.css_selectors.length) {
        return;
      }
      if (!settings.responsive_menus.media_size.length) {
        settings.responsive_menus.media_size = 768;
      }
      // Handle clicks & toggling.
      var toggler_class = '';
      $('.responsive-menus .toggler').unbind('click');
      // Iterate through our selectors.
      $.each(settings.responsive_menus.css_selectors, function(index, value) {
        if ($(value).length > 1) {
          // Handle nested menus.  Make sure we get the first, but not children.
          $(value).each(function(val_index) {
            if (!$(this).parents('ul').length) {
              if (!$(this).hasClass('responsive-menus-simple')) {
                toggler_class = 'responsive-menus-' + index + '-' + val_index;
                $(this).addClass('responsive-menus-simple').wrap('<div class="responsive-menus ' + toggler_class + '" />');
                $('.' + toggler_class).prepend('<span class="toggler">&#9776;</span>');
              }
            }
          });
        }
        else {
          // Single level menus.
          if (!$(value).hasClass('responsive-menus-simple')) {
            toggler_class = 'responsive-menus-' + index;
            $(value).addClass('responsive-menus-simple').wrap('<div class="responsive-menus ' + toggler_class + '" />');
            $('.' + toggler_class).prepend('<span class="toggler">&#9776;</span>');
          }
        }
      });
      // Re-bind click function.  This handles ajax events.
      $('.responsive-menus .toggler').bind('click', toggler_click);
      // Adjustable width instead of @media queries.
      if (window.innerWidth < settings.responsive_menus.media_size) {
        $('.responsive-menus').addClass('responsified');
      }
      // Handle window resizing.
      $(window).resize(function() {
        if(window.innerWidth > settings.responsive_menus.media_size) {
          $('.responsive-menus').removeClass('responsified');
        }
        if (window.innerWidth < settings.responsive_menus.media_size) {
          $('.responsive-menus').addClass('responsified');
        }
      });
    }
  };

}(jQuery));
