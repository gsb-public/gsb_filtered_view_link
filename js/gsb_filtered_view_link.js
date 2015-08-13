(function ($) {
  Drupal.behaviors.gsb_filtered_view_link = {
    attach: function (context, settings) {


      if (typeof Drupal.settings.gsb_filtered_view_link == 'undefined') {
        Drupal.settings.gsb_filtered_view_link = {};
      }

      if (typeof Drupal.settings.gsb_filtered_view_link.open == 'undefined') {
        Drupal.settings.gsb_filtered_view_link.open == false;
      }

      if (Drupal.settings.gsb_filtered_view_link.open) {
        link_text = Drupal.t('Hide the direct url field');
      }
      else {
        link_text = Drupal.t('Show the direct url to this filter');
      }

      $('.gsb-direct-link').remove();
      $wrapper = $('<div class=""gsb-direct-link"></div>');
      $link = $('<a href="#">' + link_text + '</a>');
      $wrapper.prepend($link);
      $wrapper.append('<br />');
      $input = $('<input class="ctools-auto-submit-exclude link-box" style="width: 550px; margin: 10px;" type="text" value="" />');
      $wrapper.append($input);
      $('.views-exposed-form').prepend($wrapper);

      if (!Drupal.settings.gsb_filtered_view_link.open) {
        $input.hide();
      }

      Drupal.gsb_filtered_view_link.buildURL($input);

      $link.click(function(e) {
        e.preventDefault();
        if (Drupal.settings.gsb_filtered_view_link.open) {
          $input.hide();
          $link.text(Drupal.t('Show the direct url to this filter'));
          Drupal.settings.gsb_filtered_view_link.open = false;
        }
        else {
          $input.show();
          $link.text(Drupal.t('Hide the direct url field'));
          Drupal.settings.gsb_filtered_view_link.open = true;
        }
      });

      $('.view-filters input[type="checkbox"]:checked, .view-filters input[type="text"]:not(".link-box")').change(function() {
        Drupal.gsb_filtered_view_link.buildURL($input);
      });
    }
  }

  Drupal.gsb_filtered_view_link = Drupal.gsb_filtered_view_link || {};

  Drupal.gsb_filtered_view_link.buildURL = function($input) {
    url = location.protocol + "//" + location.hostname + location.pathname + "?";
    $('.view-filters input[type="checkbox"]:checked').each(function() {
      name = $(this).attr('name');
      tid = $(this).attr('value');
      url += name + '=' + tid + '&';
    });
    $('.view-filters input[type="text"]:not(".link-box")').each(function() {
      if ($(this).val()) {
        url += $(this).attr('name') + "=" + $(this).val() + '&';
      }
    });
    url = url.substring(0, url.length - 1);

    $input.val(url);
  }
})(jQuery);
