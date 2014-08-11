(function(){
    $(document).ready(function(){
        var iframe = $("#J_contentIframe"),
            iframSrc,
            urlhash = location.hash;
        iframSrc = urlhash.match(/page=([^&]*html)/)[1] || $('.J_contentNavItem:first').attr('data-url');
        iframe.attr('src', iframSrc);

        $('.J_contentNavItem').on('click', function(e){
            var iframeSrc = $(e.currentTarget).attr('data-url');
            iframe.attr('src', iframeSrc);
        });
        iframe.on('load', function(){
            var height = $(iframe[0].contentDocument.body).height();
            iframe.css('height', height);
        });
    });

}());
