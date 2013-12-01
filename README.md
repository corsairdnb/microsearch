microsearch
===========

Plugin for searching text nodes in the page, like native browser search

Using Example

HTML:
```html
<div class="microsearch">
    <label class="microsearch-label" for="microsearch-input">
        <span>Search</span>
    </label>
    <input type="text" class="microsearch-input" id="microsearch-input">
    <button class="microsearch-submit">Search</button>
</div>
```

JS:
```javascript
$(".microsearch").microsearch({
    area: $(".spoiler-title > span, .price-item"), // where to search
    highlight: true, // highlight text found
    onFound: function () { // callback when there is some results
        var $this = this.plugin, // access to plugin parameters and search results
            foundNode;
        if ($this.state.found) {
            foundNode = $this.state.last; // last element found
            $.scrollTo(foundNode, 1000, { offset:-100 });
            // do something ...
        }
    },
    onFault: null // callback when there is no results
});
```
