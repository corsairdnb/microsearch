// plugin for finding phrases on page

(function(){

    if (!window.$) return;

    // global object
    window.Microsearch = {
        pluginCount: 0,
        instance: [],
        fn: function (instance, options) {

            // prepare
            var microsearch = this, $microsearch = $(instance);
            microsearch.construction = {
                label: $microsearch.find(".microsearch-label"),
                input: $microsearch.find(".microsearch-input"),
                submit: $microsearch.find(".microsearch-submit")
            };
            microsearch.options = $.extend({
                plugin: microsearch,
                area: $("body"),
                highlight: true,
                onFound: null,
                onFault: null
            }, options);

            // events
            $microsearch.on("keypress",function(e){
                e.stopPropagation();
                if (e.which==13) microsearch.submit();
            });
            microsearch.construction.submit.on("click",function(){
                microsearch.submit();
            });
            /*microsearch.construction.input.on("input paste propertychange",function(){
                microsearch.search();
            });*/

            // methods
            microsearch.submit = function () {
                microsearch.search();
            };
            microsearch.search = function () {
                microsearch.query();
                var query = microsearch.state.query;
                if (query == "") {
                    microsearch.state.found = false;
                    microsearch.clear();
                    return false;
                }
                microsearch.options.area.each(function(i,e){
                    var node = $(e),
                        text = node.text(),
                        re = new RegExp(query, 'i');
                    // if found
                    if (re.test(text)) {
                        if (node.children().length>0) {
                            // ???????????
                        }
                        else {
                            microsearch.clear();
                            node.wrapInner("<mark/>");
                        }
                        microsearch.state.last = node;
                        microsearch.state.found = true;
                        if (typeof microsearch.options.onFound == "function") microsearch.options.onFound();
                        // TODO: scroll to node & show spoiler content
                        return false;
                    }
                    microsearch.state.found = false;
                });
                if (!microsearch.state.found) microsearch.clear();
                return false;
            };
            microsearch.query = function () {
                microsearch.state.query = $.trim(microsearch.construction.input.val());
            };
            microsearch.clear = function () {
                if (microsearch.state.last) microsearch.state.last.html(microsearch.state.last.text());
            };

            // init
            microsearch.state = {
                init: false,
                query: "",
                last: null,
                found: false
            };
            microsearch.init = function() {
                var i;
                for (i in window.Microsearch.instance) {
                    if (window.Microsearch.instance[i].get(0) === $microsearch.get(0)) return;
                }
                microsearch.state.init = true;
                window.Microsearch.pluginCount++;
                window.Microsearch.instance.push($microsearch);
                console.log(microsearch);
            };
            if (!microsearch.state.init) microsearch.init();
        }
    };

    // plugin class
    var Microsearch = window.Microsearch.fn;

    // activate
    $.fn.microsearch = function(options){
        return this.each(function(i,e) {
            new Microsearch (this, options);
        });
    };

}());