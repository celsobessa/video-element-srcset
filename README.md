# Video Element SrcSet JS
Breakpoint based multiple videos sources for html5 videos

Allows the use of multiple videos sources for different breakpoints on HTML5 videos in a similar way to images srcset

** THIS is a work in progress in it's early stages, don't use in production.** Also you will probably find a lot of errors and discrepancies. Be gentle when reporting them, please.

## Getting Started


### 1. Include Validate.js on your site.

Add the script tag to you footer

```html
<script src="video-element-srcset/validate.js"></script>
```

### 2. Use `data-srcset` in you HTML5 video source tag

add a `data-srcset` attribute with a semi-collon separated list of items. Each item is comprised of a url and a media (breakpoint definition) separated by a comma and a space. like this:

`data-srcset="https://example/video/example-feature-phone.mp4, (max-width: 480px); https://example/video/example-mobile.mp4, (min-width: 481px); https://example/video/example-desktop.mp4, (min-width: 1024px); https://example/video/example-larg.mp4, (min-width: 1300px)"`


### 3. Initialize Video Element SrcSet JS.

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

## License

The code is available under the [MIT License](LICENSE.md).