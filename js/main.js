(function() {
    $(document).ready(init);

    var _json;

    function init() {
        $.getJSON('./unscripted-sample.json', function(json) {
            _json = json;
            applyRevision('greyson-bangor');
        });
    }

    function applyRevision(revision) {
        var html = Parser.getHtmlForRevision(_json, revision);
        $('#js-container').fadeOut(250, function() {
            console.log('done');
            $('#js-container').html(html).fadeIn(250);
            initListeners();
        });
    }

    function initListeners() {
        $('select').change(function(e) {
            $(this).css('font-weight', 'bold');
            applyRevision($(this).val());
        });
    }
})();