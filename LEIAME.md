# Video Element SrcSet JS
Fontes múltiplas para vídeos HTML5, baseado em pontos de interrupção (breakpoints).

- _For the english README.md, [click here](README.md)_
- _Para el LEYAME.md en español, haga [clic aqui](LEYAME.md)_

Este plugin utilitário, baseado em pontos de interrupção (_breakpoints_) permite o uso de várias fontes para vídeos HTML5 de forma semelhante ao `srcset` de imagens. Por padrão, usa ponto de interrupção baseado em dispositivo como os usados ​​pelo Bootstrap (xsmall, small, medium, large, xlarge), mas também permite o uso de consultas de mídia padrão (é mais poderoso, mas é mais difícil de usar)

É _especialmente útil para vídeos de fundo_ e depende da técnica de pseudoelementos CSS de [Mike Herchel](https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript) para gerenciar pontos de interrupção e a técnica [Debouncing Events](https://gomakethings.com/debouncing-events-with-requestanimationframe-for-better-performance/) de Chris Ferdinandi

Por motivos de desempenho, a alteração de URLs do atributo `src` é acionada apenas quando a janela é redimensionada de um tamanho meno para um tamanho maior.

**ESTE é um trabalho em progresso e nos estágios iniciais, não use em produção.** Além disso, você provavelmente encontrará muitos erros e discrepâncias. Seja gentil ao relatá-los, por favor.

## Começando

### 1. Inclua Video Element SrcSet CSS em seu site

Adicione a folha de estilo ao seu site. Você pode usar uma folha de estilo externa ou estilos inline no documento `<head>`. A pasta CSS do plugin tem 4 exemplos diferentes de CSS (larguras fixas em pixels, larguras relativas, bootstrap 4 e mídia padrão), mas você pode usar as regras que desejar. Apenas certifique-se de entender a técnica (mais sobre isso abaixo).

### 2. Inclua Video Element SrcSet JS em seu site.

Adicione a tag de script em seu rodapé. O arquivo video-element-srcset.js contém o Video Element SrcSet JS e o polyfill de requestAnimationFrame de Erik Möller

```html
<script src="video-element-srcset.js"></script>
```

### 3. Use `data-srcset` em sua tag de fonte de vídeo HTML5

adicione um atributo `data-srcset` com uma lista de itens separados por ponto-e-vírgula no elemento HTML5 `<source>`. Cada item é composto por um url e uma mídia (definição de ponto de interrupção) separados por uma vírgula e um espaço. Exemplo:

`data-srcset=" xsmall, https://example/video/example-feature-phone.mp4; pequeno, https://example/video/example-mobile.mp4; médio, https:// example/video/example-desktop.mp4; grande, https://example/video/example-large.mp4; xlarge, https://example/video/example-large.mp4;"`


### 4. Inicialize o script Video Element SrcSet

No rodapé de sua página após o conteúdo, ou em um script separado, inicialize o script Video Element SrcSet.

```html
<script>
    videoElementSrcset.init ()
</script>
```

#### 4.1 Passando opções para o método `init`

Você pode passar um objeto de opções para o método de `init`

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

## Sobre as folhas de estilo e técnica de pseudo-elementos CSS

Você pode usar as regras CSS em uma folha de estilo externa ou estilos inline no documento `<head>`.

É importante, porém, certificar-se de que você entende a técnica. A ideia geral é usar o atributo `content` de um pseudoelemento CSS (ou seja, `:before` e `:after`) para controlar o tamanho da tela, alterando o conteúdo do atributo `content` em diferentes pontos de interrupção e, em seguida, usar javascript para obter o conteúdo quando a janela for redimensionada.

### As folhas de estilo

A pasta CSS do plugin possui 3 exemplos diferentes de CSS, mas você pode usar as regras que desejar. Como regra geral, evite mais de 5 pontos de interrupção

- larguras fixas em pixels
- larguras relativas
- bootstrap

#### Folha de estilo de largura fixa

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

#### Folha de estilo de largura relativa

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

#### Bootstrap 4 de largura fixa

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

#### Consultas de mídia (media queries) padrão

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

**Se você está planejando usar consultas de mídia padrão**, leia a próxima seção com atenção.

### Sobre desempenho, pontos de interrupção e acionando mudanças de fontes de vídeo

Para evitar recarregar vídeos menores quando você redimensiona a janela para um tamanho menor, e já carregou vídeos maiores ou melhores, o plugin usa pesos de ponto de interrupção. Isso significa que cada ponto de interrupção tem um número inteiro como peso e a mudança do src é acionada apenas quando duas condições são atendidas:

1. o peso do ponto de interrupção anterior é menor que o do novo ponto
2. o texto da URL do atributo src ativo é diferente da nova

(no futuro, ele também pode usar um sinalizador de string. por exemplo, `carregado` ou` não carregado`)

**Você pode definir seus próprios pesos usando um objeto de opções com o método init**, mas se você está planejando usar os pontos de interrupção baseados em dispositivo de larguras de pixel fixas, larguras relativas e folhas de estilo de amostra do Bootstrap 4, é sugerido que você mantenha os pesos padrões. É fácil e útil para a maioria das situações.

Por outro lado, **se você está planejando usar consultas de mídia padrão** (por exemplo, `@media (min-width: 960px)`) e especialmente *consultas de mídia mais complexas* (por exemplo, `@media (min-width: 960px) and (orientaton: landscape`)), você deve definir seus próprios pesos com o mesmo nome de suas consultas e também usar suas consultas de mídia e a regra de conteúdo para o pseudoelemento CSS `:before`. É poderoso, mas um pouco mais difícil.

#### Usando consultas de mídia padrão e pesos de ponto de interrupção personalizados

Digamos que você tenha este atributo `data-srcset`:

`"@media (min-width: 720px), /video-element-srcset/videos/serra-de-sao-jose-tiradentes-minas-gerais-brazil-medium.mp4; @media (min-width: 960px), /video-element-srcset/videos/serra-de-sao-jose-tiradentes-minas-gerais-brazil-large.mp4; @media (min-width: 1024px) and (orientation: landscape), /video-element-srcset/videos/serra-de-sao-jose-tiradentes-minas-gerais-brazil.mp4;"`

E esta folha de estilo (observe o uso da consulta de mídia como regra de conteúdo para o  pseudo-elemento `:before`):

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

Você deve usar um objeto de opções com o método init, como este exemplo:

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

Com esta configuração, vídeos diferente serão carregados seguindo estas condições:

- ao passar de uma tela de 480px para uma tela maior
- ao acessar uma tela maior que 720px
- ao usar uma tela maior que 960px
- ao usar uma tela maior que 1024px e orientação paisagem

Dessa forma, um iPad com 768x1024 na orientação paisagem acionará o download do vídeo maior, mas não um iPad Pro 1024x1266 no modo retrato.

## Compatibilidade do navegador

(PENDÊNCIA)

## Como contribuir

Reveja as [diretrizes para contribuição](CONTRIBUINDO.md).

## Reconhecimentos

Partes deste utilitário usam técnicas, ideias e código de [Chris Ferdinandi](https://bit.ly/2hsrSwm), [Mike Herchel](https://www.lullabot.com/), [Paul Irish](https://paulirish.com/), Erik Möller e Tino Zijdel.

> "Se eu vi mais longe, é por estar nos ombros de gigantes."
>
> [Isaac Newton] (https://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants)

## Licença

O código está disponível sob a [Licença MIT] (LICENSE.md).
