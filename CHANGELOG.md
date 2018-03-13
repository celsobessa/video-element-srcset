# Changelog
Theme Name: Video Element SrcSet JS
Description: Breakpoint based multiple videos sources for html5 videos
Version: 0.3.0

All notable changes to this project will be documented in this file following [Keep a Changelog](http://keepachangelog.com/) conventions and rules.
This project adheres to [Semantic Versioning](http://semver.org/)

## Unreleased

Suggested Roadmap:

- move srcset to video element
- make sure it supports multiple instances of video tags
- allow video without <source> elements
- Improve documentation
- improve performance: avoid unnecessary file downloads (maybe conditionally avoid video.load() method )
- improve performance: service worker and cache API
- enforce security
- improve logic for consistency and performance
- use src/dist and build processes
- legacy/ES5 modes
	- module support
	- loadJS

## [0.3.0] - 2018-03-12

### Added
- Allow the use of standard and complex media queries
- default settings and user options
- standard media queries sample stylesheet

### Changed
- Improved README.md
- added an `itshuuuge-trustme-iknowhuge` breakpoint for huge screens
- Minor tweaks to demo page (index.html)

### Removed
- Parameters from plugin main function

## [0.2.0] - 2018-03-10

### Changed
- uses device-based breakpoint names based on CSS pseudo-elements to manage breakpoints instead of match.media() (see https://gomakethings.com/the-easy-way-to-manage-css-breakpoints-in-javascript/ )
- Improved README.md

### Added
- requestAnimationFrame polyfill

## [0.1.0] - 2018-03-09

### Added
- Changelog
- Readme
- Contributing Guidelines
- Initial functional code for basic use-case



