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
                var articleCount = 0;
                var articleData = '';
                $articleList.empty();

                $.each(data.results, function(key, value) {

                    //required since not all articles have an image
                    if (value.multimedia.length > 0) {
                        articleData += '<li class="article-container"'
                        articleData += 'style="'
                        articleData += 'background-image: url(' + value.multimedia[4].url + ');'
                        articleData += '">'
                        articleData += '<div class="article-text">'
                        articleData += value.abstract
                        articleData += '</div></li>'

                        articleCount++;
                    }
                    //breaks out of the loop after 12 iterations
                    if (articleCount === 12) {
                        return false;
                    }
                });
                //css changes for after data is displayed
                $('.dashboard').css('min-height', 'auto');
                $('footer').css('position', 'relative');

                $articleList.append(articleData);

            }).fail(function(err) {
                throw err;
            });
        }
    });

});
