QUnit.module("obj2indent");


QUnit.test("should be unparsed.", function(assert){
  var result = obj2indent([
    {
      test: "test",
      value: "value"
    }
  ]);

  var expected = "";

  assert.strictEqual(result, expected);
});


QUnit.test("should be parsed.", function(assert){
  var result1 = obj2indent([
    {
      name: ".",
      children: [
        {
          name: "depth1",
          children: [
            {
              name: "depth2",
              children: []
            },
            {
              name: "depth2",
              children: [
                {
                  name: "depth3",
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: "depth1",
          children: []
        },
        {
          name: "depth1",
          children: [
            {
              name: "depth2",
              children: [
                {
                  name: "depth3",
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ]);

  var result2 = obj2indent([
    {
      name: ".",
      children: [
        {
          name: "depth1",
          children: [
            {
              name: "depth2"
            },
            {
              name: "depth2",
              children: [
                {
                  name: "depth3"
                }
              ]
            }
          ]
        },
        {
          name: "depth1"
        },
        {
          name: "depth1",
          children: [
            {
              name: "depth2",
              children: [
                {
                  name: "depth3"
                }
              ]
            }
          ]
        }
      ]
    }
  ]);

  var expected = [
    ".",
    "  depth1",
    "    depth2",
    "    depth2",
    "      depth3",
    "  depth1",
    "  depth1",
    "    depth2",
    "      depth3"
  ].join("\n");

  assert.strictEqual(result1, expected, "have `children`.");
  assert.strictEqual(result2, expected, "not have `children`.");
});


QUnit.test("should be interconvertible. with indent2obj.js", function(assert){
  var expected = [
    ".",
    "  depth1",
    "    depth2",
    "    depth2",
    "      depth3",
    "  depth1",
    "  depth1",
    "    depth2",
    "      depth3"
  ].join("\n");

  var list = indent2obj(expected);
  var result = obj2indent(list);

  assert.strictEqual(result, expected);
});


QUnit.test("should be used tab instead of a space.", function(assert){
  var result = obj2indent([
    {
      name: "depth1",
      children: [
        {
          name: "depth2",
          children: [
            {
              name: "depth3",
              children: []
            }
          ]
        }
      ]
    }
  ], "\t");

  var expected = [
    "depth1",
    "\tdepth2",
    "\t\tdepth3"
  ].join("\n");

  assert.strictEqual(result, expected);
});


QUnit.test("should be object key name is changed.", function(assert){

  var defaults = {
    name: obj2indent.keys.name,
    children: obj2indent.keys.children
  };

  obj2indent.keys = {
    name: "key",
    children: "contents"
  };

  var result = obj2indent([
    {
      key: "depth1",
      contents: [
        {
          key: "depth2",
          contents: []
        }
      ]
    }
  ]);

  var expected = [
    "depth1",
    "  depth2"
  ].join("\n");

  obj2indent.keys.name = defaults.name;
  obj2indent.keys.children = defaults.children;

  assert.strictEqual(result, expected);
});