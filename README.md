# Sass variable loader module for webpack

### Installation

`npm install sassvar-loader --save-dev`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

### Example config

#### query string variables
``` javascript
var webpackConfig = {
    module: {
        loaders:[
            {test: /.scss$/, loader: "style!css!sass!sassvar?base_fontsize=16px"}
        ]
    },
}

```
**Output SCSS**
``` scss
$base_fontsize: 16px;
```

#### variables from a json file
``` javascript
var sassVars = 'path/to/your/vars.json';
var webpackConfig = {
    module: {
        loaders:[
            {test: /.scss$/, loader: "style!css!sass!sassvar?path="+ sassVars}
        ]
    },
}

```

**Input [YourVars.json file]**
``` json
{
"breakpoints":{
    "portraitS": "320px",
    "portraitM": "360px",
    "portraitL": "414px",
  },
  "localNavHeight":"50px",
}
```

**Output SCSS**
``` scss
$breakpoints:(portraitS:320px,portraitM:360px,portraitL:414px);
$localNavHeight:50px;
```

Forked from: [jsontosass-loader](https://github.com/EdwardIrby/jsontosass-loader)

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
