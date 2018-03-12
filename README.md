# Video Element SrcSet JS
Device-based breakpoints videos sources for HTML5 videos

This utility plugin allows the use of multiple videos sources for different breakpoints on HTML5 videos in a similar way to images srcset. By default, uses device-based breakpoint like the ones used by Bootstrap (xsmall, small, medium, large, xlarge), but it allows the use of standard media queries as well (it's more powerful, but more difficulty to use)

It is * specially useful for background videos* and it relies on [Mike Herchel's ](https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript) CSS pseudo-elements technique for managing breakpoints and Chris Ferdinandi's [Debouncing Events](https://gomakethings.com/debouncing-events-with-requestanimationframe-for-better-performance/) technique

For performance reasons, the changing of src URLs are triggered only when the window is resized to an larger size

** THIS is a work in progress in it's early stages, don't use in production.** Also you will probably find a lot of errors and discrepancies. Be gentle when reporting them, please.

## Getting Started

### 1. Include Video Element SrcSet CSS on your site

Add the stylesheet to you site. You may use an external stylesheet or inline styles in the document `<head>`. The plugin CSS folder has 4different CSS examples (fixed pixel widths, relative widths, bootstrap 4 and standard media) , but you can use any rules you want. Just make sure you understand the technique (more on this below).

### 2. Include Video Element SrcSet JS on your site.

Add the script tag in your footer. The file video-element-srcset.js contains both Video Element SrcSet JS and requestAnimationFrame polyfill by Erik Möller

```html
<script src="video-element-srcset.js"></script>
```

### 3. Use `data-srcset` in you HTML5 video source tag

add a `data-srcset` attribute with a semi-collon separated list of items to you HTML5 video `<source>` element. Each item is comprised of a url and a media (breakpoint definition) separated by a comma and a space. like this:

`data-srcset="xsmall, https://example/video/example-feature-phone.mp4;small, https://example/video/example-mobile.mp4; medium, https://example/video/example-desktop.mp4; large, https://example/video/example-large.mp4; xlarge, https://example/video/example-large.mp4;"`


### 4. Initialize Video Element SrcSet JS.

In the footer of your page after the content, or in separate script, initialize Video Element SrcSet JS.

```html
<script>
	videoElementSrcset.init()
</script>
```

#### 4.1 Passing options on init

You can pass an options object to the init method

```javascript
var options = {
	serviceWorker: true, // will be used in future versions for better caching
	autoplay: false, // should the videos autoplay upon loading?
	breakpointWeights: {
		'"@media (max-width: 480px)"': 1,
		'"@media (min-width: 481px)"': 2,
		'"@media (min-width: 720px)"': 3,
		'"@media (min-width: 960px)"': 4,
		'"@media (min-width: 960px) and (orientation: landscape)"': 5,
		'"@media (min-width: 1200px)"': 5,
	} // custom weights for your breakpoints.
	// The video loading is triggered only when going from smaller to larger screens
};
videoElementSrcset.init( options );
```

## About the Stylesheets and CSS pseudo-elements technique

You may use the CSS rules in an external stylesheet or inline styles in the document `<head>`.

It's important, though, to make sure you understand the technique. You can learn about it here and here, but the general gist is that you use CSS pseudo-element (i.e. :before and :after) content rule to keep track of the screen size by changing the content string at different breakpoints and then use javascript to get the string when window is resizing.

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

#### Standar Media Queries

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
		content: "@media (max-width: 480px)";
		display: none;
		visibility: hidden;
	}

	@media (min-width: 480px) {
		body:before {
			content: "@media (min-width: 481px)";
		}
	}

	@media (min-width: 720px) {
		body:before {
			content: "@media (min-width: 720px)";
		}
	}

	@media (min-width: 960px) {
		body:before {
			content: "@media (min-width: 960px)";
		}
	}

	@media (min-width: 1200px) {
		body:before {
			content: "@media (min-width: 1200px)";
		}
	}
</style>
```
**If you are planning to use standard media queries**, read the next section carefully.

### About Performance, Breakpoint Weights and Triggering Source changes

To avoid reloading smaller videos when you resize the window to an smaller size and you already loaded larger or better videos, the plugin uses breakpoint weights. It means every breakpoint has an integer as weight and the change of the src is triggered only when two conditions are met:

1. the previous breakpoint weight is less than the new breakpoint
2. the active src attribute URL string is different from the new one

(in the future, it may use an string flag as well. e.g. `loaded` or `not-loaded`)

**You can set your own weights using an options object with the init method**, but if you are planning using the device-based breakpoints from the fixed pixel widths, relative widths and Bootstrap 4 sample stylesheets, it's suggested you keep the default weights. It's easy and useful for most situations.

On the other hand, **if you are planning to use standard media queries** (e.g. @media (min-width: 960px) ) and specially more *complex media queries* (e.g. @media (min-width: 960px) and (orientation: landscape) ), you should set your own weights with the same name as your queries and also use you media queries and the content rule for the :before CSS pseudo-element. It's powerful, but a little bit harder.

#### Using standard Media Queries and custom breakpoint weights

Say you have this `data-srcset` attribute:

`"@media (min-width: 720px), /video-element-srcset/videos/serra-de-sao-jose-tiradentes-minas-gerais-brazil-medium.mp4; @media (min-width: 960px), /video-element-srcset/videos/serra-de-sao-jose-tiradentes-minas-gerais-brazil-large.mp4; @media (min-width: 1024px) and (orientation: landscape), /video-element-srcset/videos/serra-de-sao-jose-tiradentes-minas-gerais-brazil.mp4;"`

And this stylesheet (note the use of media query as the content rule for the :before pseudo-element) :

```html
<style id="video-element-srcset-fixed">
	body:before {
		content: "@media (max-width: 480px)";
		display: none;
		visibility: hidden;
	}
	@media (min-width: 720px) {
		body:before {
			content: "@media (min-width: 720px)";
		}
	}
	@media (min-width: 960px) {
		body:before {
			content: "@media (min-width: 960px)";
		}
	}
	@media (min-width: 1024px) and (orientation: landscape)  {
		body:before {
			content: "@media (min-width: 960px) and (orientation: landscape)";
		}
	}
</style>
```

You should use an options object with the init method, like this:

```javascript
var options = {
	breakpointWeights: {
		'"@media (max-width: 480px)"': 1,
		'"@media (min-width: 720px)"': 2,
		'"@media (min-width: 960px)"': 3,
		'"@media (min-width: 1024px) and (orientation: landscape)"': 4
	} // custom weights for your breakpoints.
	// The video loading is triggered only when going from smaller to larger screens
};
videoElementSrcset.init(options);
```

With this setup different videos will be loaded in these conditions:

- when going from a 480px screen size to a larger screen
- when going to a screen larger than 720px
- when using a screen larger than 960px
- when using a screen larger than 1024px and landscape orientation

As such, an iPad with an 768x1024 in landscape orientation will trigger the download of the larger video, but not an 1024x1266 iPad Pro in portrait mode.

## Browser Compatibility

- TO DO

## How to Contribute

Please review the [contributing guidelines](CONTRIBUTING.md).

## Acknowledgements

Parts of this utility use techniques, ideas and code from [Chris Ferdinandi](https://bit.ly/2hsrSwm), [Mike Herchel](https://www.lullabot.com/), [Paul Irish](http://paulirish.com/), Erik Möller and Tino Zijdel.

>"If I have seen further it is by standing on the shoulders of Giants."
>[Isaac Newton]([)https://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants)

This plugin was originally comissioned by and created with financial support from [XPlastic](https://xplastic.com.br) (NSFW).

## License

The code is available under the [MIT License](LICENSE.md).