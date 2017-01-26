$(function() {


  //   console.log( $(this).val() );
  //  });

    $('.drop-down-menu').on('change', function() {
      var category = $(this).val();

      //check to make sure we're not sending 'sections' to the NYT
      if(category !== 'sections'){
        var url = 'https://api.nytimes.com/svc/topstories/v2/' + category + '.json';
        url += '?' + $.param({'api-key': '06c14a236b5b478d8ee67228dff8fc9f'});

        $.ajax({
          url: url,
          method: 'GET',
        }).done(function(data) {

          var articleData = '';
          $('.article-list').empty();

          $.each(data.results, function(key, value) {

            //required since not all articles have an image
                if(value.multimedia.length > 0){

                  articleData += '<li '
                  articleData += 'style="'
                  articleData += 'background: url(' + value.multimedia[4].url + ');'
                  articleData += 'background-size: auto 420px;'
                  articleData += 'background-repeat: no-repeat;'
                  articleData += 'background-position: center;'
                  articleData += '"class="article-container">'
                  articleData += '<div class="article-text">'
                  articleData += value.abstract
                  articleData += '</div></li>'
                  //console.log(value.abstract);
                  //to get the title ^^^^
                  //console.log(value.multimedia[4].url);
                  //to get the image ^^^^^
                  console.log(articleData);
                  }

                  //breaks out of the loop after 12 iterations
                  if(key === 12) {
                      return false;
                      }
              });


              //css changes for after data is displayed
              $('.dashboard').css('min-height','auto');
              $('footer').css('position', 'relative');

              $('.article-list').append(articleData);

      }).fail(function(err) {
        throw err;
      });
}
    });

});
