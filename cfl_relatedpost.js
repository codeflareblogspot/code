function relatedPostsWidget(userConfig){
(function($){

/* =========================
   CONFIG - MUDAH DIEDIT
========================= */
var CONFIG = {
  blogURL: "",

  /* Jumlah artikel tampil */
  maxPosts: 7,

  /* Maksimal label yang dibaca */
  maxTags: 7,

  /* Artikel yang diambil per label */
  maxPostsPerTag: 7,

  /* Acak Related Posts */
  randomPosts: true,

  /* Panjang deskripsi */
  summaryLength: 100,

  /* Ukuran thumbnail */
  thumbnailSize: 200,

  /* Tampilkan tanggal */
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
var totalRequests = 0;
var container = null;
var list = null;


/* =========================
   NORMALIZE URL
========================= */
function normalizeURL(url){

  if(!url) return "";

  try{

    var u = new URL(
      url,
      location.href
    );

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

  return (
    normalizeURL(url) ===
    currentURL
  );

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

  return score > 0
    ? score
    : 1;
}


/* =========================
   SET SCORE
========================= */
function setScore(
  anchor,
  score
){

  anchor.attr(
    "score",
    score
  );

}


/* =========================
   RANDOM / SHUFFLE
========================= */
function shufflePosts(){

  if(!CONFIG.randomPosts){
    return;
  }

  var items =
    list.children("li").get();

  /*
   * Fisher-Yates Shuffle
   */
  for(
    var i = items.length - 1;
    i > 0;
    i--
  ){

    var randomIndex =
      Math.floor(
        Math.random() *
        (i + 1)
      );

    var temp =
      items[i];

    items[i] =
      items[randomIndex];

    items[randomIndex] =
      temp;
  }


  /* Masukkan kembali urutan random */
  $.each(
    items,
    function(){

      list.append(this);

    }
  );

}


/* =========================
   FINALIZE POSTS
========================= */
function finalizePosts(){

  /* Hapus loading */
  $("#related-posts-loadingtext")
    .remove();


  /* =====================
     RANDOM
  ===================== */
  shufflePosts();


  /* =====================
     BATASI JUMLAH POST
  ===================== */
  if(CONFIG.maxPosts > 0){

    list
      .children("li")
      .slice(CONFIG.maxPosts)
      .remove();

  }

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

  /* =====================
     FILTER CURRENT POST
  ===================== */
  if(isCurrentPost(url)){
    return;
  }


  var items =
    list.children("li");


  /* =====================
     FILTER DUPLICATE
  ===================== */
  for(
    var i = 0;
    i < items.length;
    i++
  ){

    var anchor =
      $("a", items.eq(i))
      .first();

    var existingURL =
      anchor.attr("href");


    if(
      existingURL &&
      normalizeURL(existingURL) ===
      normalizeURL(url)
    ){

      var score =
        getScore(anchor);

      setScore(
        anchor,
        ++score
      );

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

          '<a ' +
          'href="' + url + '" ' +
          'title="' +
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


        /* =================
           GET PERMALINK
        ================= */
        $.each(
          entry.link || [],
          function(i, link){

            if(
              link.rel ===
              "alternate"
            ){

              postURL =
                link.href;

              return false;

            }

          }
        );


        /* =================
           CURRENT POST
        ================= */
        if(
          !postURL ||
          isCurrentPost(postURL)
        ){

          return;

        }


        /* =================
           CONTENT
        ================= */
        var content =

          entry.content

          ? entry.content.$t

          : entry.summary

          ? entry.summary.$t

          : "";


        /* Remove script */
        content =
          content.replace(
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            ""
          );


        var temp =
          $("<div></div>")
          .append(content);

        var images =
          temp.find("img");


        /* =================
           THUMBNAIL
        ================= */
        var thumbnail =
          CONFIG.blankThumbnail;


        if(
          entry.media$thumbnail
        ){

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

        }

        else if(
          images.length
        ){

          thumbnail =
            images[0].src;

        }


        /* =================
           SUMMARY
        ================= */
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


        /* =================
           DATE
        ================= */
        var published =
          entry.published.$t
          .substring(
            0,
            10
          );


        var year =
          published.substring(
            0,
            4
          );


        var monthNumber =
          published.substring(
            5,
            7
          );


        var day =
          published.substring(
            8,
            10
          );


        var month =
          CONFIG.monthNames[
            parseInt(
              monthNumber,
              10
            ) - 1
          ];


        /* =================
           ADD POST
        ================= */
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


  /* =====================
     SEMUA FEED SELESAI
  ===================== */
  if(
    requestDone >=
    totalRequests
  ){

    finalizePosts();

  }

}


/* =========================
   INIT
========================= */
function init(){

  container =
    $(CONFIG.containerSelector);


  /* =====================
     GET ARTICLE LABELS
  ===================== */
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

        CONFIG.tags.push(
          tag
        );

      }

    });

  }


  /* =====================
     HEADER
  ===================== */
  if(
    CONFIG.tags.length
  ){

    container.append(

      '<div class="rpTitleH2">' +
        CONFIG.relatedTitle +
      '</div>'

    );

  }

  else{

    container.append(

      '<div class="rpTitleH2">' +
        CONFIG.recentTitle +
      '</div>'

    );

  }


  /* =====================
     LOADING
  ===================== */
  if(
    CONFIG.loadingText
  ){

    container.append(

      '<div id="related-posts-loadingtext">' +
        CONFIG.loadingText +
      '</div>'

    );

  }


  /* =====================
     LIST
  ===================== */
  list =
    $("<ul></ul>")
    .appendTo(
      container
    );


  /* =====================
     BLOG URL
  ===================== */
  var blogURL =

    CONFIG.blogURL ||

    (
      location.protocol +
      "//" +
      location.host
    );


  /* =====================
     RECENT POSTS
  ===================== */
  if(
    !CONFIG.tags.length
  ){

    totalRequests = 1;


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


  /* =====================
     TOTAL REQUEST
  ===================== */
  totalRequests =
    CONFIG.tags.length;


  /* =====================
     RELATED BY LABEL
  ===================== */
  $.each(
    CONFIG.tags,
    function(index, tag){

      $.get(

        blogURL +

        "/feeds/posts/default/-/" +

        encodeURIComponent(
          tag
        ) +

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
   RUN WIDGET
========================= */
jQuery(function(){

  relatedPostsWidget();

});
