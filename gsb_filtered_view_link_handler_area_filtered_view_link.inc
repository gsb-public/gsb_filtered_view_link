<?php

/**
 * @file
 * Contains gsb_filtered_view_link_handler_area_add_link.
 */

/**
 * Provides a link to get the direct url to the currently filtered view.
 */
class gsb_filtered_view_link_handler_area_add_link extends views_handler_area {

  /**
   * {@inheritdoc}
   */
  public function access() {
    global $user;
    return $user->uid == 1 || array_intersect(array('section manager', 'marketing_admin', 'administrator'), array_values($user->roles));
  }

  /**
   * {@inheritdoc}
   */
  public function render($empty = FALSE) {
    drupal_add_js(drupal_get_path('module', 'gsb_filtered_view_link') . '/js/gsb_filtered_view_link.js');
  }
}
