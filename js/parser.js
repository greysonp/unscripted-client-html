this.Parser = this.Parser || {};

(function(module) {

    module.getRevisionList = function(json) {
        if (!$.isPlainObject(json)) {
            json = $.parseJSON(json);
        }
        return Object.keys(json);
    }

    module.getHtmlForRevision = function(json, revision) {
        if (!$.isPlainObject(json)) {
            json = $.parseJSON(json);
        }

        var rev = json[revision];
        var output = '';
        for (var i = 0; i < rev.length; i++) {
            var node = rev[i];
            if (node.type === 'text') {
                output += parseTextNode(node);
            } else if (node.type === 'option') {
                output += parseOptionNode(node);
            } else {
                console.warn('Encountered node with unknown type: ' + node.type);
            }
        }
        return output;
    }

    /**
     * 
     * @param  {String} json The raw unscripted json
     * @return {Object}      A mapping between revisions and the html representation of them. 
     *                       e.g. { "revision1": <html>, ..., "revisionN": <html>}
     */
    module.getHtmlForAllRevisions = function(json) {
        if (!$.isPlainObject(json)) {
            json = $.parseJSON(json);
        }
        var revisions = getRevisionList(json);
        var output = {};
        for (var i = 0; i < revisions.length; i++) {
            output[revisions[i]] = module.getHtmlForRevision(json, revisions[i]);
        }
        return output;
    }


    function parseTextNode(node) {
        return '<span>' + node.text + '</span>';
    }

    function parseOptionNode(node) {
        var output = '<select>';
        for (var i = 0; i < node.options.length; i++) {
            var option = node.options[i];
            output += '<option value="' + option.link + '">' + option.text + '</option>';
        }
        output += '</select>';
        return output;
    }

})(this.Parser);