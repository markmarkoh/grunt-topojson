'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.topojson = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(6);

    var actualSimple = JSON.parse(grunt.file.read('tmp/simple.topo.json'));
    var actualWorld = JSON.parse(grunt.file.read('tmp/world.topo.json'));

    test.equal(actualSimple.type, 'Topology');
    test.ok(typeof actualSimple.objects.world !== 'undefined');

    test.equal(actualWorld.type, 'Topology');
    test.ok(typeof actualWorld.objects.world !== 'undefined');

    test.equal(actualWorld.objects.world.geometries[0].properties.name, 'Afghanistan');

    test.ok(actualWorld.objects.world.geometries.length > 100);

    test.done();
  },
  custom_options: function(test) {
    test.expect(3);
    var actualWorld = JSON.parse(grunt.file.read('tmp/world.topo.custom.json'));

    test.ok(typeof actualWorld.objects.custom !== 'undefined');
    test.ok(actualWorld.objects.custom.geometries.length > 100);
    test.notEqual(actualWorld.objects.custom.geometries[0].properties.name, 'Afghanistan');

    test.done();
  },
};
