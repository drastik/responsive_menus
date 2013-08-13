<?php

/**
 * @file
 * Hooks provided by the Responsive Menus module.
 */

/**
 * @addtogroup hooks
 * @{
 */

/**
 * To add a new style to Responsive Menus, you are most likely creating at least
 * 3 functions:
 * hook_responsive_menus_style_info().
 * A form name callback to add form elements to Responsive Menu's admin form.
 * A js_settings() callback to pass extra variables to javascript.
 *
 * Explained below.
 */

/**
 * Example implementation of hook_responsive_menus_style_info().
 *
 * You can use js/css_folder to load a whole directory's files, or
 * js/css_files to load individual files.
 *
 * The parameters 'form' & 'js_settings' are callbacks to functions.
 *
 * Params when declaring hook_responsive_menus_style_info():
 * name        :string: Name displayed when choosing style.
 * form        :string: Drupal FAPI callback for admin form.
 * js_folder   :string: Folder to recursively include .js files from.
 * css_folder  :string: Folder to recursively include .css files from.
 * js_files    :array:  Individual JS files to include.
 * css_files   :array:  Individual CSS files to include.
 * js_settings :string: Function to generate settings to pass to JS.
 */
function hook_responsive_menus_style_info() {
  $path = drupal_get_path('module', 'responsive_menus');
  $styles = array(
    'example_style' => array(
      'name' => t('Example Responsive Menus style'),
      'form' => 'example_style_settings',
      'js_folder' => drupal_get_path('module', 'responsive_menus') . '/js',
      'css_folder' => drupal_get_path('module', 'responsive_menus') . '/css',
      'js_files' => array(
        $path . '/js/example1.js',
        $path . '/js/example2.js',
      ),
      'css_files' => array($path . '/css/example.css'),
      'js_settings' => 'example_style_js_settings',
    ),
  );

  return $styles;
}

/**
 * Additional style settings for the Responsive Menus admin form.
 *
 * You aren't returning an entire form, just some additional options that go
 * within the style settings fieldset of the Responsive Menus admin form.
 *
 * You are in charge of your own #default_values.
 *
 * @return array
 *   Drupal FAPI formatted array.
 */
function example_style_settings() {
  $form['responsive_menus_css_selectors'] = array(
    '#type' => 'textarea',
    '#title' => t('CSS selectors for which menus to responsify'),
    '#default_value' => variable_get('responsive_menus_css_selectors', '.main-menu'),
    '#description' => 'Enter CSS selectors of menus to responsify.  Comma separated or 1 per line',
  );
  $form['responsive_menus_simple_text'] = array(
    '#type' => 'textfield',
    '#title' => t('Text to display for menu toggle button'),
    '#default_value' => variable_get('responsive_menus_simple_text', '☰ Menu'),
  );
  $form['responsive_menus_media_size'] = array(
    '#type' => 'textfield',
    '#title' => t('Screen width to respond to'),
    '#size' => 10,
    '#default_value' => variable_get('responsive_menus_media_size', 768),
    '#description' => 'Width in pixels when we swap out responsive menu e.g. 768',
  );

  return $form;
}

/**
 * Callback to generate settings to pass to javascript.
 *
 * @return array
 *   Array of settings to pass to javascript, identified by their key.
 *   They can be accessed in javascript by: settings.responsive_menus.your_key.
 */
function example_style_js_settings() {
  $js_settings = array();
  $js_settings['selectors'] = responsive_menus_build_selectors();
  $js_settings['toggler_text'] = variable_get('responsive_menus_simple_text', '☰ Menu');
  $js_settings['media_size'] = variable_get('responsive_menus_media_size', 768);

  return $js_settings;
}
