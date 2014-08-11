(function(){
    $(document).ready(function(){
        $('.panel-iframe').on('click', function(e){
            var cur = $(e.currentTarget);

            location.href = '/blog.html#page=' + cur.attr("src");
        });
    });

}());
