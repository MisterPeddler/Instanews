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
            }).always(function() {
                //show loading gif and hide error report
                $('.loader').css('display', 'inline');
                $('.error-report').css('display', 'none');
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
                $('.dashboard').addClass('dashboard-with-articles');
                $('.logo').addClass('logo-with-articles');
                $('.topics').addClass('topics-with-articles');
                $('.copyr').addClass('copyr-with-articles');

                //hide loader gif
                $('.loader').css('display', 'none');

                //load data onto the dom
                $articleList.append(articleData);

            }).fail(function(err) {
                //hide loading gif and show error report
                $('.loader').css('display', 'none');
                $('.eror-report').css('display', 'inline');

            });
        }
    })

    //article click handler.
    //when an <li> is clicked the url in the <a> is retrieved and used
    //to open a new tab
    $('.article-list').on('click', 'li', function() {
        window.open($(this).find('a').attr('href'));
    });



});
