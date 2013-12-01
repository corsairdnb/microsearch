microsearch
===========

Plugin for searching text nodes in the page, like native browser search

Using Example

<div class="highlight highlight-js">

<pre>

$(".microsearch").microsearch({
    area: $(".spoiler-title > span, .price-item"), // where to search
    highlight: true, // highlight text found
    onFound: function () { // callback when there is some results
        var $this = this.plugin, foundNode, spoiler = $(".spoiler");
        if ($this.state.found) {
            foundNode = $this.state.last;
            spoiler.addClass("close");
            foundNode.parents(spoiler).removeClass("close");
            $.scrollTo(foundNode, 1000, { offset:-100 });
        }
    },
    onFault: null // callback when there is no results
});

</pre>

</div>
