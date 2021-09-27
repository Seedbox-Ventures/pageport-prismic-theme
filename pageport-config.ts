export default {
  breakpoints: {
    Phone: 0,
    Tablet: 640,
    Laptop: 1024,
    Desktop: 1280,
  },
  theme: {
    defaultData: {
      'colors': [
        {
          'color_type': 'Primary',
          'value': '#7a39db',
        },
        {
          'color_type': 'Accent',
          'value': '#c97c1e',
        },
        {
          'color_type': 'Info',
          'value': '#1e8dc9',
        },
        {
          'color_type': 'Success',
          'value': '#82c91e',
        },
        {
          'color_type': 'Warn',
          'value': '#eab327',
        },
        {
          'color_type': 'Danger',
          'value': '#c9321e',
        },
        {
          'color_type': 'Dark Text',
          'value': '#41494f',
        },
        {
          'color_type': 'Light Text',
          'value': '#ffffff',
        },
        {
          'color_type': 'Background Default',
          'value': '#ffffff',
        },
        {
          'color_type': 'Background Alternative',
          'value': '#f4f8fb',
        },
        {
          'color_type': 'Background Emphasize',
          'value': '#7a39db',
        },
      ],
      'content_padding': '2rem,3rem',
      'content_max_width': '1140px',
      'primary_font_import_link': {
        'url': 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap',
      },
      'primary_font_family': 'Roboto,"Open Sans","Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      'secondary_font_family': 'Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol',
      'type_definitions': [
        {
          'font_family': 'Primary',
          'font_size': '16px',
          'letter_spacing': 'normal',
          'line_height': '1.5em',
          'text_type': 'Standard Text',
        }, {
          'font_family': 'Primary',
          'font_size': '24px',
          'letter_spacing': 'normal',
          'line_height': '1.5em',
          'text_type': 'Header',
        },
      ],
      'button_padding': '.75em 1.5em',
      'button_border_radius': '99999px',
      'button_border_width': '.125em',
      'button_box_shadow': 'none',
      'buttons': [
        {
          'button_type': 'Default',
          'color': 'Dark Text',
          'fill_background': true,
          'hover_effect': 'None',
        },
        {
          'button_type': 'Primary',
          'color': 'Primary',
          'fill_background': true,
          'hover_effect': 'None',
        },
        {
          'button_type': 'Secondary',
          'color': 'Accent',
          'fill_background': true,
          'hover_effect': 'None',
        },
        {
          'button_type': 'Submit',
          'color': 'Success',
          'fill_background': true,
          'hover_effect': 'None',
        },
        {
          'button_type': 'Success',
          'color': 'Success',
          'fill_background': true,
          'hover_effect': 'None',
        },
        {
          'button_type': 'Danger',
          'color': 'Danger',
          'fill_background': true,
          'hover_effect': 'None',
        },
        {
          'button_type': 'Cancel',
          'color': 'Danger',
          'fill_background': true,
          'hover_effect': 'None',
        },
      ],
    },
  },
  pageDynamic: {
    defaultData: {},
  },
  header: {
    defaultData: {
      'background_color': 'Primary',
      'burger_menu_breakpoint': 'Never',
      'icon_as_logo_breakpoint': 'Never',
      'logo_position': false,
      'logo_width': '120px',
      'isSticky': false,
      'padding_bottom': '1rem',
      'padding_top': '1rem',
    },
  },
}
