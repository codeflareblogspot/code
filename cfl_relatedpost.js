function relatedPostsWidget(userConfig){
(function($){

/* =========================
   CONFIG - MUDAH DIEDIT
========================= */
var CONFIG = {
  blogURL: "",
  maxPosts: 7,
  maxTags: 7,
  maxPostsPerTag: 7,
  summaryLength: 100,
  thumbnailSize: 200,
  showDate: true,

  relatedTitle:
    '<i class="fa fa-fire" aria-hidden="true"></i> Related Posts',

  recentTitle:
    '<i class="fa fa-fire" aria-hidden="true"></i> Recent Posts',

  loadingText: "Loading...",
  readMoreText: " [...]",
  blankThumbnail: "",

  containerSelector: "#related_posts",
  insertBefore: "#comments",

  monthNames: [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ]
};

CONFIG = $.extend({}, CONFIG, userConfig);


/* =========================
   VARIABLE
========================= */
var requestDone = 0;
var container = null;
var list = null;


/* =========================
   NORMALIZE URL
========================= */
function normalizeURL(url){
  if(!url) return "";

  try{
    var u = new URL(url, location.href);

    return (
      u.hostname
        .toLowerCase()
        .replace(/^www\./,"") +

      u.pathname
        .toLowerCase()
        .replace(/\/+/g,"/")
        .replace(/\/$/,"")
    );

  }catch(e){

    return String(url)
      .toLowerCase()
      .replace(/^https?:\/\//,"")
      .replace(/^www\./,"")
      .split("?")[0]
      .split("#")[0]
      .replace(/\/$/,"");
  }
}


/* =========================
   CURRENT ARTICLE
========================= */
var currentURL = normalizeURL(
  $('link[rel="canonical"]').attr("href") ||
  location.href
);

function isCurrentPost(url){
  return normalizeURL(url) === currentURL;
}


/* =========================
   CREATE CONTAINER
========================= */
if(!$(CONFIG.containerSelector).length){
  $(CONFIG.insertBefore).before(
    '<div id="' +
    CONFIG.containerSelector.replace("#","") +
    '"></div>'
  );
}


/* =========================
   GET SCORE
========================= */
function getScore(anchor){
  var score = parseInt(
    anchor.attr("score"),
    10
  );

  return score > 0 ? score : 1;
}


/* =========================
   SET SCORE
========================= */
function setScore(anchor, score){
  anchor.attr("score", score);
}


/* =========================
   ADD POST
========================= */
function addPost(
  url,
  title,
  thumbnail,
  summary,
  year,
  day,
  month
){

  /* Filter artikel yang sedang dibaca */
  if(isCurrentPost(url)){
    return;
  }

  var items = $("li", list);

  /* Filter duplicate */
  for(var i = 0; i < items.length; i++){

    var anchor = $("a", items.eq(i)).first();
    var existingURL = anchor.attr("href");

    if(
      existingURL &&
      normalizeURL(existingURL) === normalizeURL(url)
    ){

      var score = getScore(anchor);

      setScore(anchor, ++score);

      /* Artikel yang lebih relevan naik */
      for(var x = i - 1; x >= 0; x--){

        var prevAnchor =
          $("a", items.eq(x)).first();

        if(getScore(prevAnchor) > score){

          if(i - x > 1){
            items.eq(x).after(
              items.eq(i)
            );
          }

          return;
        }
      }

      if(i > 0){
        items.eq(0).before(
          items.eq(i)
        );
      }

      return;
    }
  }


  /* =====================
     OUTPUT HTML
  ===================== */
  list.append(
    '<li>' +

      '<div class="inner">' +

        '<a class="titleRelatedPost" ' +
        'href="' + url + '">' +

          '<span class="imageRP">' +

            '<img ' +
            'alt="' +
            title.replace(/"/g,"&quot;") +
            '" ' +
            'src="' +
            thumbnail +
            '"/>' +

          '</span>' +

          '<strong>' +
          title +
          '</strong>' +

        '</a>' +

        '<p>' +

          summary +

          '<a href="' +
          url +
          '" title="' +
          title.replace(/"/g,"&quot;") +
          '">' +

            CONFIG.readMoreText +

          '</a>' +

          (
            CONFIG.showDate

            ? '<span class="date">' +

                '<strong>' +
                day +
                '</strong>' +

                '<span>' +
                month +
                '</span>' +

                '<span>' +
                year +
                '</span>' +

              '</span>'

            : ""
          ) +

        '</p>' +

      '</div>' +

    '</li>'
  );
}


/* =========================
   FEED CALLBACK
========================= */
function feedCallback(data){

  requestDone++;

  if(
    data.feed &&
    data.feed.entry
  ){

    $.each(
      data.feed.entry,
      function(index, entry){

        var postURL = "";

        /* Get permalink */
        $.each(
          entry.link || [],
          function(i, link){

            if(link.rel === "alternate"){
              postURL = link.href;
              return false;
            }

          }
        );


        /* Current article filter */
        if(
          !postURL ||
          isCurrentPost(postURL)
        ){
          return;
        }


        /* Get content */
        var content =
          entry.content
          ? entry.content.$t
          : entry.summary
          ? entry.summary.$t
          : "";


        /* Remove script */
        content = content.replace(
          /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
          ""
        );


        var temp =
          $("<div></div>").append(content);

        var images =
          temp.find("img");


        /* Thumbnail */
        var thumbnail =
          CONFIG.blankThumbnail;

        if(entry.media$thumbnail){

          thumbnail =
            entry.media$thumbnail.url
            .replace(
              /=s[0-9]+\-c/g,
              "=s" +
              CONFIG.thumbnailSize
            )
            .replace(
              /\/s[0-9]+\-c/g,
              "/s" +
              CONFIG.thumbnailSize
            );

        }else if(images.length){

          thumbnail =
            images[0].src;
        }


        /* Summary */
        var summary =
          content.replace(
            /<\S[^>]*>/g,
            ""
          );

        if(
          summary.length >
          CONFIG.summaryLength
        ){

          summary =
            summary.substring(
              0,
              CONFIG.summaryLength
            );
        }


        /* Date */
        var published =
          entry.published.$t.substring(
            0,
            10
          );

        var year =
          published.substring(0,4);

        var monthNumber =
          published.substring(5,7);

        var day =
          published.substring(8,10);

        var month =
          CONFIG.monthNames[
            parseInt(
              monthNumber,
              10
            ) - 1
          ];


        addPost(
          postURL,
          entry.title.$t,
          thumbnail,
          summary,
          year,
          day,
          month
        );

      }
    );
  }


  /* Semua feed selesai */
  if(
    requestDone >=
    CONFIG.tags.length
  ){

    $("#related-posts-loadingtext")
      .remove();

    if(CONFIG.maxPosts > 0){

      $("li:gt(" +
        (CONFIG.maxPosts - 1) +
        ")",
        list
      ).remove();
    }
  }
}


/* =========================
   INIT
========================= */
function init(){

  container =
    $(CONFIG.containerSelector);


  /* Get labels */
  if(!CONFIG.tags){

    CONFIG.tags = [];

    $('a[rel="tag"]:lt(' +
      CONFIG.maxTags +
      ')'
    ).each(function(){

      var tag =
        $.trim(
          $(this)
          .text()
          .replace(/\n/g,"")
        );

      if(
        tag &&
        $.inArray(
          tag,
          CONFIG.tags
        ) === -1
      ){

        CONFIG.tags.push(tag);
      }

    });
  }


  /* Header */
  if(CONFIG.tags.length){

    container.append(
      '<div class="rpTitleH2">' +
      CONFIG.relatedTitle +
      '</div>'
    );

  }else{

    container.append(
      '<div class="rpTitleH2">' +
      CONFIG.recentTitle +
      '</div>'
    );
  }


  /* Loading */
  if(CONFIG.loadingText){

    container.append(
      '<div id="related-posts-loadingtext">' +
      CONFIG.loadingText +
      '</div>'
    );
  }


  /* List */
  list =
    $("<ul></ul>")
    .appendTo(container);


  var blogURL =
    CONFIG.blogURL ||
    (
      location.protocol +
      "//" +
      location.host
    );


  /* Recent posts */
  if(!CONFIG.tags.length){

    CONFIG.tags = [
      "__recent__"
    ];

    $.get(
      blogURL +
      "/feeds/posts/default" +
      "?max-results=" +
      (CONFIG.maxPostsPerTag + 1) +
      "&orderby=published" +
      "&alt=json-in-script",

      feedCallback,
      "jsonp"
    );

    return;
  }


  /* Related by labels */
  $.each(
    CONFIG.tags,
    function(index, tag){

      $.get(
        blogURL +
        "/feeds/posts/default/-/" +
        encodeURIComponent(tag) +

        "?max-results=" +
        (CONFIG.maxPostsPerTag + 1) +

        "&orderby=published" +
        "&alt=json-in-script",

        feedCallback,
        "jsonp"
      );

    }
  );
}


/* =========================
   START
========================= */
init();

})(jQuery);
}


/* =========================
   RUN
========================= */
jQuery(function(){

  relatedPostsWidget();

});
