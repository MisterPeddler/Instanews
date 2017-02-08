$(function() {
    //jQuery variable declarations
    const $loader = $('.loader');
    const $errorReport = $('.error-report');
    const $dashboard = $('.dashboard');
    const $logo = $('.logo');
    const $topics = $('.topics');
    const $copyr = $('.copyr');
    const $articleList = $('.article-list');


    //Function Declarations
    function showArticleLayout() {
        //reposition elements for article display
        $dashboard.addClass('dashboard-with-articles');
        $logo.addClass('logo-with-articles');
        $topics.addClass('topics-with-articles');
        $copyr.addClass('copyr-with-articles');
    }

    function showErrorMessage() {
        $errorReport.css('display', 'inline');
    }

    function hideErrorMessage() {
        $errorReport.css('display', 'none');
    }

    function showLoadingWheel() {
        $loader.css('display', 'inline');
    }

    function hideLoadingWheel() {
        $loader.css('display', 'none');
    }

    //initialize selectric
    $('.drop-down-menu').selectric();

    //Select on-change handler
    $('.drop-down-menu').on('change', () => {

        const $category = $('.drop-down-menu').val();

        //check to make sure we're not sending 'sections' to the NYT
        if ($category !== 'sections') {

          showArticleLayout();
          showLoadingWheel();
          hideErrorMessage();

          $articleList.empty();

            let url = `https://api.nytimes.com/svc/topstories/v2/${$category}.json`;
            url += '?' + $.param({
                'api-key': '06c14a236b5b478d8ee67228dff8fc9f'
            });

            $.ajax({
                url: url,
                method: 'GET',
            }).done( data => {

                let articleData = '';

                //filter returned json object to only include 12 items with photos
                let listOfArticles = data.results.filter( item => {
                    return item.multimedia.length > 0;
                }).slice(0, 12);

                $.each(listOfArticles, (key, value) => {
                    articleData +=
                    `<li class="article-container"
                     style="background-image: url( ${value.multimedia[4].url});">
                     <a href="${value.url}" />
                     <div class="article-text">
                     ${value.abstract}
                     </div></li>`;
                });

                //hide the loading wheel and load data onto the dom
                hideLoadingWheel();

                $articleList.append(articleData);

                 $('.anim-spacer').show().slideUp('slow');

            }).fail( () => {
                //hide loading gif and show error report
                hideLoadingWheel();
                showErrorMessage();

            });
        }
    });

    //article click handler.
    //when an <li> is clicked the url in the <a> is retrieved and used
    //to open a new tab
    $('.article-list').on('click', 'li', () => {
        window.open($(this).find('a').attr('href'));
    });

});
