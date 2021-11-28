# Video Element SrcSet JS
Fuentes múltiples para videos HTML5, basadas en puntos de interrupción.

- _For the english README.md, [click here](README.md)_
- _Para o LEIAME.md em português, [clique aqui](LEIAME.md)_
-
Este complemento, basado en puntos de interrupción (_breakpoints_), en permite el uso de múltiples fuentes para videos HTML5 de una manera similar a images `srcset`. De forma predeterminada, usa puntos de interrupción basados ​​en dispositivos como los que usa Bootstrap (xsmall, small, medium, large, xlarge), pero también permite el uso de consultas de medios estándar (es más poderoso, pero más difícil de usar)

Es _especialmente útil para videos de fondo_ y se basa en la técnica de pseudoelementos CSS de [Mike Herchel](https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript) para administrar puntos de interrupción y técnica [Debouncing Events](https://gomakethings.com/debouncing-events-with-requestanimationframe-for-better-performance/) de Chris Ferdinandi

Por motivos de rendimiento, el cambio de URL en el atributo `src` se activa solo cuando la ventana cambia a un tamaño mayor.

**ESTO es un trabajo en progreso en sus primeras etapas, no lo use en producción.** También probablemente encontrará muchos errores y discrepancias. Sea amable al denunciarlos, por favor.

## Empezando

### 1. Incluya el CSS Video Element SrcSet en su sitio

Agregue la hoja de estilo a su sitio. Puede utilizar una hoja de estilo externa o estilos en línea en el documento `<head>`. La carpeta CSS del complemento tiene 4 ejemplos de CSS diferentes (anchos de píxel fijos, anchos relativos, bootstrap 4 y medios estándar), pero puede usar las reglas que desee. Solo asegúrese de comprender la técnica (más sobre esto a continuación).

### 2. Incluya el script Video Element SrcSet en su sitio

Agregue el script en su pie de página. El archivo video-element-srcset.js contiene tanto Video Element SrcSet JS como requestAnimationFrame polyfill de Erik Möller

```html
<script src="video-element-srcset.js" defer></script>
```

### 3. Usa `data-srcset` en tu etiqueta de fuente de video HTML5

agregue un atributo `data-srcset` con una lista de elementos separados por punto y coma a su elemento de video HTML5`<source>`. Cada elemento se compone de una URL y un medio (definición de punto de interrupción) separados por una coma y un espacio. como esto:

`data-srcset="xsmall, https://example/video/example-feature-phone.mp4; small, https://example/video/example-mobile.mp4; medium, https:// example/video/example-desktop.mp4; large, https://example/video/example-large.mp4; xlarge, https://example/video/example-large.mp4;"`

### 4. Inicialice el elemento de video SrcSet JS

En el pie de página de su página después del contenido, o en un script separado, inicialice Video Element SrcSet JS.

```html
<script>
videoElementSrcset.init();
</script>
```

#### 4.1 Pasando opciones en la inicialiación

Puede pasar un objeto de opciones al método `init`

```javascript
var options = {
    serviceWorker: true, // se utilizará en versiones futuras para un mejor almacenamiento en caché
    autoplay: false, // ¿los videos deberían reproducirse automáticamente al cargarse?
    breakpointWeights: {
		'"@media (max-width: 480px)"': 1,
		'"@media (min-width: 481px)"': 2,
		'"@media (min-width: 720px)"': 3,
		'"@media (min-width: 960px)"': 4,
		'"@media (min-width: 960px) and (orientation: landscape)"': 5,
		'"@media (min-width: 1200px)"': 5,
    } // pesos personalizados para sus puntos de interrupción.
    // La carga de video se activa solo cuando se pasa de pantallas más pequeñas a más grandes
};
videoElementSrcset.init (opciones);
```

## Acerca de la técnica de las hojas de estilo y los pseudoelementos CSS

Puede utilizar las reglas CSS en una hoja de estilo externa o estilos en línea en el documento `<head>`.

Sin embargo, es importante asegurarse de comprender la técnica. La esencia general es usar el atributo `content` de um pseudoelemento CSS como `:before` o `:after` para realizar un seguimiento del tamaño de la pantalla cambiando el contenido en `content` en diferentes puntos de interrupción y luego usa javascript para obtener el valor de `content` en el cambio de tamaño de la pantalla.

### Las hojas de estilo

La carpeta CSS del complemento tiene 3 ejemplos de CSS diferentes, pero puede usar las reglas que desee. Como regla general, evite más de 5 puntos de interrupción.

- Hoja de estilo de ancho fijo
- anchos relativos
- bootstrap

#### Hoja de estilo de ancho fijo

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

#### Hoja de estilo de ancho relativo

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

#### Bootstrap 4 ancho fijo

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

#### Consultas de medios (media queries) estándar

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
**Si planea utilizar consultas de medios estándar**, lea la siguiente sección con atención.

### Acerca del rendimiento, los pesos de los puntos de interrupción y los cambios en la fuente de video

Para evitar volver a cargar videos más pequeños cuando cambia el tamaño de la ventana a un tamaño más pequeño, y ya se cargó videos más grandes o mejores, el complemento usa pesos de punto de interrupción. Significa que cada punto de interrupción tiene un número entero como peso y el cambio del valor del atributo `src` se activa solo cuando se cumplen dos condiciones:

1. el ancho del punto de interrupción es menor que el nuevo punto
2. la URL actual del atributo `src` es diferente de la nueva


**Puede establecer sus propios pesos usando un objeto de opciones con el método `init`**, pero si planea usar los puntos de interrupción basados ​​en el dispositivo de los anchos de píxeles fijos, anchos relativos y hojas de estilode Bootstrap 4, se sugiere que mantenga el valor predeterminado de pesos. Es fácil y útil para la mayoría de situaciones.

Por otro lado, **si planeas utilizar consultas de medios estándar** (por ejemplo, @media (min-width: 960px)) y especialmente *consultas de medios más complejas* (por ejemplo, @media (min-width: 960px) and (orientation: landscape)), debe establecer sus propios pesos con el mismo nombre que sus consultas y también usar sus consultas de medios y la regla de contenido para el pseudoelemento CSS `:before`. Es poderoso, pero un poco más difícil.

#### Uso de consultas de medios estándar y pesos de puntos de interrupción personalizados

Digamos que tiene este atributo `data-srcset`:

`"@media (min-width: 720px), /video-element-srcset/videos/serra-de-sao-jose-tiradentes-minas-gerais-brazil-medium.mp4; @media (min-width: 960px), /video-element-srcset/videos/serra-de-sao-jose-tiradentes-minas-gerais-brazil-large.mp4; @media (min-width: 1024px) and (orientation: landscape), /video-element-srcset/videos/serra-de-sao-jose-tiradentes-minas-gerais-brazil.mp4;"`

Y esta hoja de estilo (tenga en cuenta el uso de media query como regla de contenido para el pseudo-elemento `:before`):

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

Debe usar un objeto de opciones con el método init, como este:

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

Con esta configuración se cargarán diferentes videos en estas condiciones:

- al pasar de un tamaño de pantalla de 480px a una pantalla más grande
- al ir a una pantalla de más de 720px
- cuando se usa una pantalla de más de 960 px
- cuando se usa una pantalla de más de 1024px y orientación horizontal

Como tal, un iPad con 768x1024 en orientación horizontal activará la descarga del video más grande, pero no un iPad Pro de 1024x1266 en modo vertical.

## Compatibilidad del navegador

(HACER)

## Cómo contribuir

Revise las [pautas de contribución](CONTRIBUYENDO.md).

## Agradecimientos

Partes de esta utilidad utilizan técnicas, ideas y código de [Chris Ferdinandi](https://bit.ly/2hsrSwm), [Mike Herchel](https://www.lullabot.com/), [Paul Irish](https://paulirish.com/), Erik Möller y Tino Zijdel.

> "Si he visto más lejos es subiéndome a hombros de Gigantes".
>
> [Isaac Newton] (https://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants)

## Licencia

El código está disponible bajo la [Licencia MIT](LICENSE.md).
