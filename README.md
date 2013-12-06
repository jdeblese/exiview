Exiview
=======

Offline EXIF viewer app for Chrome.

This is little more than a wrapper around exif-js, using nm-grid to
display the tags. Written because all the exif viewers in the Chrome web
store were online apps.

Comments and feature requests welcome.

Dependencies
============

exif-js
AngularJS
jQuery
nm-grid

* Note that nm-grid does not seem to work with jQuery 2.x versions. It
  has been tested to work with 1.8.0, and AngularJS 1.0.2.

Building
========

* Make links to or copy angular.js and jquery.js to the src/ directory,
  exif.js and binaryajax.js to src/exif/, and ng-grid.{js,css} to
  src/ng-grid/.

* Generate an RSA key in PEM format

* run "crxmake.sh src key.pem"
