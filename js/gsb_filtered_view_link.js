(function ($) {
  Drupal.behaviors.gsb_filtered_view_link = {
    attach: function (context, settings) {
      $('.gsb-direct-link').remove();
      $link = $('<a class="gsb-direct-link" href="#">' + Drupal.t('Show the direct url to this filter') + '</a>');
      $('.views-exposed-form').prepend($link);

      $link.click(function(e) {
        e.preventDefault();
        url = location.protocol + "//" + location.hostname + location.pathname + "?";
        $('.view-filters input[type="checkbox"]:checked').each(function() {
          name = jQuery(this).attr('name');
          tid = jQuery(this).attr('value');
          url += name + '=' + tid + '&';
        });
        $('.view-filters input[type="text"]').each(function() {
          if ($(this).val()) {
            url += $(this).attr('name') + "=" + $(this).val() + '&';
          }
        });
        url = url.substring(0, url.length - 1);

        alert(Drupal.t("You can copy this link") + ": \n\n" + url);
      });
    }
  }
})(jQuery);
