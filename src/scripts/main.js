import $ from 'jquery';

import '../styles/main.scss';
import './awakeness';

$(document).ready(function() {
  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      event.preventDefault();
      var windowHeight = $(window).height();
      var targetOffset = target.offset().top;
      var scrollTo =
        targetOffset -
        (windowHeight - Math.min(windowHeight, target.outerHeight())) / 4;
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: scrollTo,
          },
          1000
        );
    }
  });
});

$(document).ready(function() {
  // Get all h2 and h3 headings and their corresponding menu items
  var headings = $('h2, h3, section');
  var menuItems = $('.sidebar-menu a');

  // Set up scroll listener to update the menu item highlighting
  $(window).on('scroll', function() {
    // Get the current scroll position and viewport dimensions
    var currentPosition = $(this).scrollTop();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    var viewportMiddle = viewportTop + $(window).height() / 3;

    // Loop through the headings to find the one currently in view
    headings.each(function() {
      var headingTop = $(this).offset().top;
      var headingBottom = headingTop + $(this).outerHeight();

      // Check if the heading is fully visible above the middle of the viewport
      if (headingTop < viewportMiddle && headingBottom > viewportTop) {
        // Get the ID of the current heading and highlight its corresponding menu item
        var currentHeadingId = $(this).attr('id');
        menuItems.removeClass('active');
        $('a[href="#' + currentHeadingId + '"]').addClass('active');
      } else {
        // If the heading is not in the viewport, remove its corresponding menu item's active class
        var currentHeadingId = $(this).attr('id');
        $('a[href="#' + currentHeadingId + '"]').removeClass('active');
      }
    });
  });
});
