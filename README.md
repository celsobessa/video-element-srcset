# Video Element SrcSet JS
Breakpoint based multiple videos sources for html5 videos

Allows the use of multiple videos sources for different breakpoints on HTML5 videos in a similar way to images srcset

** THIS is a work in progress in it's early stages, don't use in production.** Also you will probably find a lot of errors and discrepancies. Be gentle when reporting them, please.

## Getting Started


### 1. Include Video Element SrcSet CSS on your site

Add the stylesheet to you site. Inline styles in the document `<head>` is better

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

		@media (min-width: 960px) {
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


### 2. Include Video Element SrcSet JS on your site.

Add the script tag to you footer

```html
<script src="video-element-srcset.js"></script>
```

### 3. Use `data-srcset` in you HTML5 video source tag

add a `data-srcset` attribute with a semi-collon separated list of items. Each item is comprised of a url and a media (breakpoint definition) separated by a comma and a space. like this:

`data-srcset="https://example/video/example-feature-phone.mp4, (max-width: 480px); https://example/video/example-mobile.mp4, (min-width: 481px); https://example/video/example-desktop.mp4, (min-width: 1024px); https://example/video/example-larg.mp4, (min-width: 1300px)"`


### 4. Initialize Video Element SrcSet JS.

In the footer of your page after the content, or in separate script, initialize Video Element SrcSet JS.

```html
<script>
	videoElementSrcset.init()
</script>
```
```
## Browser Compatibility

Work in Progress

## How to Contribute

Please review the [contributing guidelines](CONTRIBUTING.md).

## Acknowledgements

Parts of this utility use techniques, ideas and code from [Chris Ferdinandi](https://bit.ly/2hsrSwm), [Mike Herchel](https://www.lullabot.com/), [Paul Irish](http://paulirish.com/), Erik Möller and Tino Zijdel.

>"If I have seen further it is by standing on the shoulders of Giants."
>[Isaac Newton]([)https://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants)

## License

The code is available under the [MIT License](LICENSE.md).