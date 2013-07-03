/**
 * @file
 * Simple responsification of menus.
 */
(function ($) {

  Drupal.responsive_menus = Drupal.responsive_menus || {};
  Drupal.behaviors.responsive_menus = {
    attach: function (context, settings) {
      settings.responsive_menus = settings.responsive_menus || {};
      if (!settings.responsive_menus.css_selectors.length) return;
      if (!settings.responsive_menus.media_size.length) {
        settings.responsive_menus.media_size = 768;
      }
      // Iterate through our selectors.
      $.each(settings.responsive_menus.css_selectors, function(index, value) {
        var toggler_class = 'responsive-menus-' + index;
        $(value).addClass("responsive-menus-simple").wrap('<div class="responsive-menus ' + toggler_class + '" />');
        $('.' + toggler_class).prepend('<span class="toggler">&#9776;</span>');
      });
      // Adjustable width instead of @media queries.
      if (window.innerWidth < settings.responsive_menus.media_size) {
        $('.responsive-menus').addClass('responsified');
      }
      // Handle clicks & toggling.
      $('.responsive-menus .toggler').click(function() {
        $(this).parent().toggleClass('responsive-toggled');
      });
      // Handle window resizing.
      $(window).resize(function() {
        if(window.innerWidth > settings.responsive_menus.media_size) {
          $('.responsive-menus').removeClass('responsified');
          $('.responsive-menus-simple').removeClass('responsive-toggled');
        }
        if (window.innerWidth < settings.responsive_menus.media_size) {
          $('.responsive-menus').addClass('responsified');
        }
      });
    }
  };

}(jQuery));

