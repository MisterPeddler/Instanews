$(function() {

//TODO fix css for drop down sliding
//TODO sassify
//TODO stretch goals

//DOM varuable declarations
var $loader = $('.loader');
var $errorReport = $('.error-report');
var $dashboard = $('.dashboard');
var $logo = $('.logo');
var $topics = $('.topics');
var $copyr = $('.copyr');

var $articleList = $('.article-list');


//Function Declarations
function showArticleLayout(){
  //reposition elements to article display
  $dashboard.addClass('dashboard-with-articles');
  $logo.addClass('logo-with-articles');
  $topics.addClass('topics-with-articles');
  $copyr.addClass('copyr-with-articles');
}

function showErrorMessage(){
  $errorReport.css('display','inline');
}

function hideErrorMessage(){
  $errorReport.css('display','none');
}

function showLoadingWheel(){
  $loader.css('display','inline');
}

function hideLoadingWheel(){
  $loader.css('display','none');
}

    $('.drop-down-menu').on('change', function() {
      var $category = $(this).val();

      showArticleLayout();
      showLoadingWheel();
      hideErrorMessage();
      $articleList.empty();


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
                var articleData = '';


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

                hideLoadingWheel();

                //load data onto the dom
                $articleList.append(articleData);

            }).fail(function() {
                //hide loading gif and show error report
                hideLoadingWheel();
                showErrorMessage();

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
