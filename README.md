# grunt-topojson

> Convert GeoJSON to TopoJSON

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-topojson --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-topojson');
```

## The "topojson" task

### Overview
In your project's Gruntfile, add a section named `topojson` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  topojson: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.idProperty
Type: `String`
Default value: `null`

The key from `geography.properties` that should be used as `id`. Defaults to the `geography.id`.

#### options.copyProperties
Type: `Array`
Default value: `null`

An array of properties to be copied. Use an empty array to not copy any properties. Keep `null` to copy all properties.

#### options.collectionName
Type: `String`
Default value: `null`

A property to be used to name the collection. Defaults to task name.
For example, if your config looks like this:
```js
topojson: {
  world: {
    files: []
  }
}
```

The collectionName will default to `world`. This can be overridden by specifying a `collectionName`.
```js
topojson: {
  world: {
    files: []
  },
  options: {
    collectionName: 'custom-data-world'
  }
}
```

All other [options can be found on the TopoJSON API documentation page](https://github.com/mbostock/topojson/wiki/API-Reference#server-api)

### Usage Examples

#### Default Options
With all default options, `src/world.json` will be converted into topoJSON and placed in `dest/world.topo.json`.
The results will look something like:

```json
{"type":"Topology","objects":{"world":{"type":"GeometryCollection","geometries":[{"type":"Polygo...
```

```js
grunt.initConfig({
  topojson: {
    world: {
      options: {},
      files: {
        'dest/world.topo.json': ['src/world.json'],
      }
    }
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```json
{"type":"Topology","objects":{"custom-world":{"type":"GeometryCollection","geometries":[{"type":"Polygo...
```

```js
grunt.initConfig({
  topojson: {
    world: {
      options: {
        collectionName: 'custom-world',
        quantization: 1e7
      },
      files: {
        'dest/world.topo.json': ['src/world.json'],
      }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
