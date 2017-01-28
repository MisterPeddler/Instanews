$(function() {

    $('.drop-down-menu').on('change', function() {
        var $category = $(this).val();
        //check to make sure we're not sending 'sections' to the NYT
        if ($category !== 'sections') {
            var url = 'https://api.nytimes.com/svc/topstories/v2/' + $category + '.json';
            url += '?' + $.param({
                'api-key': '06c14a236b5b478d8ee67228dff8fc9f'
            });

            $.ajax({
                url: url,
                method: 'GET',
            }).done(function(data) {
                var $articleList = $('.article-list');
                var articleData = '';
                $articleList.empty();

                var listOfArticles = data.results.filter(function(item) {
                    return item.multimedia.length > 0;
                }).slice(0, 12);

                $.each(listOfArticles, function(key, value) {
                    articleData += '<li class="article-container"'
                    articleData += 'style="background-image: url(' + value.multimedia[4].url + ');">'
                    articleData += '<a href="' + value.url + '" />'
                    articleData += '<div class="article-text">'
                    articleData += value.abstract
                    articleData += '</div></li>'
                });

                //css changes for after data is displayed
                $('.dashboard').css('min-height', 'auto');
                $('footer').css('position', 'relative');

                $articleList.append(articleData);

            }).fail(function(err) {
                throw err;
                //TODO add some user feedback here
            });
        }
    });

    //article click handler.
    //when an 'li' is clicked the url in the a is retrieved and used
    //to open a new tab
    $('.article-list').on('click', 'li', function() {
        window.open($(this).find('a').attr('href'));
    });

});
