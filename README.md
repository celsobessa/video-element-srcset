# Video Element SrcSet JS
Device-based breakpoints videos sources for HTML5 videos

This utility plugin allows the use of multiple videos sources for different breakpoints on HTML5 videos in a similar way to images srcset, using device-based breakpoint like the ones used by Bootstrap (xsmall, small, medium, large, xlarge).

It relies on [Mike Herchel's ](https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript) CSS pseudoelements technique for managing breakpoints and Chris Ferdinandi's [Debouncing Events](https://gomakethings.com/debouncing-events-with-requestanimationframe-for-better-performance/) technique

For performance reasons, the changing of src URLs are triggered only when the window is resized to an larger size

** THIS is a work in progress in it's early stages, don't use in production.** Also you will probably find a lot of errors and discrepancies. Be gentle when reporting them, please.

## Getting Started

### 1. Include Video Element SrcSet CSS on your site

Add the stylesheet to you site. You may use an external stylesheet or inline styles in the document `<head>`. The plugin CSS folder has 3 different CSS examples (fixed pixel widths, relative widths and bootstrap 4) , but you can use any rules you want. Just make sure you understand the technique (more on this below).

### 2. Include Video Element SrcSet JS on your site.

Add the script tag in your footer. The file video-element-srcset.js contains both Video Element SrcSet JS and requestAnimationFrame polyfill by Erik Möller

```html
<script src="video-element-srcset.js"></script>
```

### 3. Use `data-srcset` in you HTML5 video source tag

add a `data-srcset` attribute with a semi-collon separated list of items to you HTML5 video `<source>` element. Each item is comprised of a url and a media (breakpoint definition) separated by a comma and a space. like this:

`data-srcset="xmall https://example/video/example-feature-phone.mp4;small https://example/video/example-mobile.mp4; medium https://example/video/example-desktop.mp4; large https://example/video/example-large.mp4; xlarge https://example/video/example-large.mp4;"`


### 4. Initialize Video Element SrcSet JS.

In the footer of your page after the content, or in separate script, initialize Video Element SrcSet JS.

```html
<script>
	videoElementSrcset.init()
</script>
```
## About the Stylesheets and CSS pseudoelements technique

You may use the CSS rules in an external stylesheet or inline styles in the document `<head>`.

It's important, though, to make sure you understand the technique. You can learn about it here and here, but the general gist is that you use CSS pseudoelement (i.e. :before and :after) content rule to keep track of the screen size by changing the content string at different breakpoints and then use javascript to get the string when window is resizing.

### The Stylesheets

The plugin CSS folder has 3 different CSS examples, but you can use any rules you want. But as a general rule, avoide more than 5 breakpoints

- fixed pixel widths
- relative widths
- bootstrap

#### Fixed width stylesheet

```html
<style id="video-element-srcset">
	/**
	 * @section Breakpoints
	 * These values will not show up in content, but can be queried by JavaScript to know which breakpoint is active. Add or remove as many breakpoints as you like.
	 * @author Mike Herchel, Chris Ferdinandi
	 *
	 * @link https://gomakethings.com/the-easy-way-to-manage-css-breakpoints-in-javascript/
	 * @link https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript
	 */

	body:before {
		content: "xsmall";
		display: none;
		visibility: hidden;
	}

	@media (min-width: 480px) {
		body:before {
			content: "small";
		}
	}

	@media (min-width: 720px) {
		body:before {
			content: "medium";
		}
	}

	@media (min-width: 1024px) {
		body:before {
			content: "large";
		}
	}

	@media (min-width: 1280px) {
		body:before {
			content: "xlarge";
		}
	}

	@media (min-width: 1600px) {
		body:before {
			content: "itshuuuge-trustme-iknowhuge";
		}
	}
</style>
```

#### Relative Width Stylesheet

```html
<style id="video-element-srcset">
	/**
	 * @section Breakpoints
	 * These values will not show up in content, but can be queried by JavaScript to know which breakpoint is active. Add or remove as many breakpoints as you like.
	 * @author Mike Herchel, Chris Ferdinandi
	 *
	 * @link https://gomakethings.com/the-easy-way-to-manage-css-breakpoints-in-javascript/
	 * @link https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript
	 */

	body:before {
		content: "xsmall";
		display: none;
		visibility: hidden;
	}

	@media (min-width: 20em) {
		body:before {
			content: "small";
		}
	}

	@media (min-width: 40em) {
		body:before {
			content: "medium";
		}
	}

	@media (min-width: 60em) {
		body:before {
			content: "large";
		}
	}

	@media (min-width: 80em) {
		body:before {
			content: "xlarge";
		}
	}
</style>
```

#### Bootstrap 4 fixed width

```html
<style id="video-element-srcset">
	/**
	 * @section Breakpoints
	 * These values will not show up in content, but can be queried by JavaScript to know which breakpoint is active. Add or remove as many breakpoints as you like.
	 * @author Mike Herchel, Chris Ferdinandi
	 *
	 * @link https://gomakethings.com/the-easy-way-to-manage-css-breakpoints-in-javascript/
	 * @link https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript
	 */

	body:before {
		content: "xsmall";
		display: none;
		visibility: hidden;
	}

	@media (min-width: 576px) {
		body:before {
			content: "small";
		}
	}

	@media (min-width: 768px) {
		body:before {
			content: "medium";
		}
	}

	@media (min-width: 992px) {
		body:before {
			content: "large";
		}
	}

	@media (min-width: 1200px) {
		body:before {
			content: "xlarge";
		}
	}
</style>
```

### About Performance, Breakpoint Weights and Triggering Source changes

- TO DO

## Browser Compatibility

- TO DO

## How to Contribute

Please review the [contributing guidelines](CONTRIBUTING.md).

## Acknowledgements

Parts of this utility use techniques, ideas and code from [Chris Ferdinandi](https://bit.ly/2hsrSwm), [Mike Herchel](https://www.lullabot.com/), [Paul Irish](http://paulirish.com/), Erik Möller and Tino Zijdel.

>"If I have seen further it is by standing on the shoulders of Giants."
>[Isaac Newton]([)https://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants)

This plugin was created with financial support from [XPlastic](https://xplastic.com.br) (NSFW).

## License

The code is available under the [MIT License](LICENSE.md).