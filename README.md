# toselect.js
ToSelect is a jQuery plugin which converts a &#60;select&#62; containing one or more &#60;optgroup&#62; into two chained &#60;select&#62;. 

## Examples
The `samples/` folder contains some examples that can be used to testing. You can access more demos on the [ToSelect](http://toselect.csharpchina.com) website.

**Simple Example**: 
[http://toselect.csharpchina.com/demos/simple](http://toselect.csharpchina.com/demos/simple). 

**Advanced Example**: 
[http://toselect.csharpchina.com/demos/advanced](http://toselect.csharpchina.com/demos/advanced). 

## Installation
```HTML
npm i toselect
```

## How to use
Here is the example on how to use ToSelect on your own page.
### Step 1: Include the ToSelect script
ToSelect require jQuery, Place the following `script` near the end of your pages, right before the closing `</body>` tag. JQuery must come first, then our JavaScript plugin.
```HTML
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="/scripts/jquery.toselect.min.js"></script>
```
### Step 2: Configuration data source for ToSelect
The following example is a basic ToSelect configuration. We need to specify `data-parent="<#ParentId>"` and `data-child="<#ChildId>"` data attributes on the `<select>` element.
```HTML
<!-- ToSelect Data Source -->
<select data-parent="#parent" data-child="#child">
    <optgroup label="Computers & Tablets">
        <option value="1">Notebooks</option>
        <option value="2">Desktops</option>
        <option value="3">Tablets</option>
        <option value="4">Servers</option>
    </optgroup>
    <optgroup label="Computer Components">
        <option value="5">CPU</option>
        <option value="6">Motherboard</option>
        <option value="7" selected="selected">Video Card</option>
        <option value="8">Memory</option>
        <option value="9">Hard Drive</option>
        <option value="10">Solid State Drive (SSD)</option>
    </optgroup>
    <optgroup label="Monitor, Printers & Peripherals">
        <option value="11">Monitors</option>
        <option value="12">Printers</option>
        <option value="13">Ink & Toner</option>
        <option value="14">Scanners</option>
    </optgroup>
</select>

<!-- ToSelect Parent Select -->
<select id="parent" name="parent"></select>

<!-- ToSelect Child Select -->
<select id="child" name="child"></select>
```
### Step 3: Bind data source to ToSelect
There are two ways to specify initialization for ToSelect:
#### VIA Javascript
```JavaScript
<script>
    $(function () {
        $('#myToSelect').toSelect();
    })
</script>
```
#### VIA data attributes
You can specify `data-role="toselect"` on the `<select>` element that contains the data source without writing any JavaScript.
```HTML
<!-- ToSelect Data Source -->
<select data-role="toselect" data-parent="#parent" data-child="#child">...</select>
```

## Events
### toselect.init
Occurs when the ToSelect is initialized, which is the first step in its lifecycle.
```JavaScript
$('#myToSelect').on('toselect.init', function (e) {
  // do something...
})
```
### toselect.parent.changed
Occurs when the Parent `<select>` option has changed.
```JavaScript
$('#myToSelect').on('toselect.child.changed', function (e) {
  // do something...
})
```
### toselect.child.updated
Occurs when the Child `<select>` option collection has changed.
```JavaScript
$('#myToSelect').on('toselect.child.updated', function (e) {
  // do something...
})
```
### toselect.child.changed
Occurs when the Child `<select>` option has changed.
```JavaScript
$('#myToSelect').on('toselect.child.changed', function (e) {
  // do something...
})
```

## Road map and release notes
See the [CHANGELOG](CHANGELOG.md) for road map and release notes.

## CodeInBox
ToSelect is a [WuBoStudio](http://www.csharpchina.com) project.

## License
ToSelect is licensed under the [MIT](LICENSE) license.
