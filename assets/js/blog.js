(function(){
    $(document).ready(function(){
        var iframe = $("#J_contentIframe"),
            firstContentSource = $('.J_contentNavItem:first').attr('data-url');
        iframe.attr('src', firstContentSource);

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
