function relatedPostsWidget(userConfig){
(function($){
"use strict";

/* CONFIG */
var CONFIG={
  blogURL:"",
  maxPosts:7,
  maxTags:7,
  maxPostsPerTag:7,
  randomPosts:true,
  summaryLength:100,
  thumbnailSize:200,
  showDate:true,
  relatedTitle:'<i class="fa fa-fire" aria-hidden="true"></i> Related Posts',
  recentTitle:'<i class="fa fa-fire" aria-hidden="true"></i> Recent Posts',
  loadingText:"Loading...",
  readMoreText:" [...]",
  blankThumbnail:"",
  containerSelector:"#related_posts",
  insertBefore:"#comments",
  monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
};

CONFIG=$.extend({},CONFIG,userConfig);

var requestDone=0,totalRequests=0;
var container=null,list=null;
var posts=[],randomizedPosts=[];
var postMap=Object.create(null);
var fallbackRecent=false,mode="related";
var displayPosts=1,resizeTimer=null;

/* NORMALIZE URL */
function normalizeURL(url){
  if(!url)return "";
  try{
    var u=new URL(url,location.href);
    return u.hostname.toLowerCase().replace(/^www\./,"")+
      u.pathname.toLowerCase().replace(/\/+/g,"/").replace(/\/$/,"");
  }catch(e){
    return String(url).toLowerCase()
      .replace(/^https?:\/\//,"")
      .replace(/^www\./,"")
      .split("?")[0].split("#")[0]
      .replace(/\/$/,"");
  }
}

/* CURRENT ARTICLE */
var currentURL=normalizeURL(
  $('link[rel="canonical"]').attr("href")||location.href
);

function isCurrentPost(url){
  return normalizeURL(url)===currentURL;
}

/* CREATE CONTAINER */
if(!$(CONFIG.containerSelector).length){
  $(CONFIG.insertBefore).before(
    '<div id="'+CONFIG.containerSelector.replace("#","")+'"></div>'
  );
}

/* ESCAPE HTML */
function escapeHTML(str){
  return $("<div>").text(str==null?"":String(str)).html();
}

/* RESET DATA */
function resetPosts(){
  posts=[];
  randomizedPosts=[];
  postMap=Object.create(null);
}

/* RANDOM */
function shuffleArray(arr){
  if(!CONFIG.randomPosts)return arr;

  for(var i=arr.length-1;i>0;i--){
    var j=Math.floor(Math.random()*(i+1));
    var temp=arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
  }

  return arr;
}

/* RESPONSIVE POST COUNT */
function getResponsivePostCount(){
  var width=container&&container.length?container.innerWidth():0;
  var size=parseInt(CONFIG.thumbnailSize,10)||200;

  if(!width)width=$(window).width();

  /*
   * thumbnailSize = ukuran ideal.
   * Math.round membuat jumlah artikel tidak
   * langsung turun hanya karena selisih sedikit.
   */
  var count=Math.round(width/size);

  count=Math.max(1,count);

  if(CONFIG.maxPosts>0){
    count=Math.min(count,CONFIG.maxPosts);
  }

  return count;
}

/* ADD POST */
function addPost(url,title,thumbnail,summary,year,day,month){
  if(!url||isCurrentPost(url))return;

  var key=normalizeURL(url);
  if(!key)return;

  /* FILTER DUPLICATE */
  if(postMap[key]){
    postMap[key].score++;
    return;
  }

  var post={
    url:url,
    title:title||"",
    thumbnail:thumbnail||"",
    summary:summary||"",
    year:year||"",
    day:day||"",
    month:month||"",
    score:1
  };

  postMap[key]=post;
  posts.push(post);
}

/* POST HTML */
function createPostHTML(post){
  var title=escapeHTML(post.title);
  var url=escapeHTML(post.url);
  var summary=escapeHTML(post.summary);
  var image="";

  if(post.thumbnail){
    image='<img alt="'+title+'" src="'+escapeHTML(post.thumbnail)+'"/>';
  }

  return '<li>'+
    '<div class="inner">'+
      '<a class="titleRelatedPost" href="'+url+'" score="'+post.score+'">'+
        '<span class="imageRP">'+image+'</span>'+
        '<strong>'+title+'</strong>'+
      '</a>'+
      '<p>'+
        summary+
        '<a href="'+url+'" title="'+title+'">'+CONFIG.readMoreText+'</a>'+
        (CONFIG.showDate?
          '<span class="date">'+
            '<strong>'+escapeHTML(post.day)+'</strong>'+
            '<span>'+escapeHTML(post.month)+'</span>'+
            '<span>'+escapeHTML(post.year)+'</span>'+
          '</span>'
        :"")+
      '</p>'+
    '</div>'+
  '</li>';
}

/* RENDER */
function renderPosts(keepOrder){
  $("#related-posts-loadingtext").remove();

  if(!posts.length){
    if(mode==="related"&&!fallbackRecent){
      fallbackRecent=true;
      loadRecentPosts();
      return;
    }

    container.empty();
    return;
  }

  /* RANDOM HANYA SAAT DATA BARU */
  if(!keepOrder||!randomizedPosts.length){
    randomizedPosts=posts.slice();

    if(CONFIG.randomPosts){
      shuffleArray(randomizedPosts);
    }
  }

  displayPosts=getResponsivePostCount();

  var output=randomizedPosts.slice(0,displayPosts);
  var html="";

  for(var i=0;i<output.length;i++){
    html+=createPostHTML(output[i]);
  }

  list.html(html);
}

/* GET POST URL */
function getPostURL(entry){
  var links=entry.link||[];

  for(var i=0;i<links.length;i++){
    if(links[i].rel==="alternate"){
      return links[i].href||"";
    }
  }

  return "";
}

/* GET THUMBNAIL */
function getThumbnail(entry,content){
  var thumbnail=CONFIG.blankThumbnail||"";

  if(entry.media$thumbnail&&entry.media$thumbnail.url){
    thumbnail=entry.media$thumbnail.url
      .replace(/=s\d+(?:-c)?/i,"=s"+CONFIG.thumbnailSize)
      .replace(/\/s\d+(?:-c)?/i,"/s"+CONFIG.thumbnailSize);

  }else if(content){
    var temp=$("<div>").html(content);
    var img=temp.find("img").first();

    if(img.length){
      thumbnail=img.attr("src")||thumbnail;
    }
  }

  return thumbnail;
}

/* GET SUMMARY */
function getSummary(content){
  if(!content)return "";

  var temp=$("<div>").html(content);

  temp.find("script,style,noscript").remove();

  var summary=$.trim(
    temp.text().replace(/\s+/g," ")
  );

  if(CONFIG.summaryLength>0&&summary.length>CONFIG.summaryLength){
    summary=summary.substring(0,CONFIG.summaryLength).trim();
  }

  return summary;
}

/* PROCESS FEED */
function feedCallback(data){
  if(!data||!data.feed||!data.feed.entry)return;

  $.each(data.feed.entry,function(_,entry){
    var postURL=getPostURL(entry);

    /* FILTER CURRENT ARTICLE */
    if(!postURL||isCurrentPost(postURL))return;

    var content="";

    if(entry.content&&entry.content.$t){
      content=entry.content.$t;
    }else if(entry.summary&&entry.summary.$t){
      content=entry.summary.$t;
    }

    var published=
      entry.published&&entry.published.$t
        ?entry.published.$t.substring(0,10)
        :"";

    var year="",month="",day="";

    if(published.length>=10){
      year=published.substring(0,4);

      var monthNumber=parseInt(
        published.substring(5,7),10
      );

      day=published.substring(8,10);
      month=CONFIG.monthNames[monthNumber-1]||"";
    }

    addPost(
      postURL,
      entry.title&&entry.title.$t?entry.title.$t:"",
      getThumbnail(entry,content),
      getSummary(content),
      year,
      day,
      month
    );
  });
}

/* REQUEST FEED */
function requestFeed(url){
  totalRequests++;

  $.ajax({
    url:url,
    dataType:"jsonp",
    cache:true,

    success:function(data){
      feedCallback(data);
    },

    complete:function(){
      requestDone++;

      if(requestDone>=totalRequests){
        renderPosts(false);
      }
    }
  });
}

/* RESET REQUEST */
function prepareRequest(){
  requestDone=0;
  totalRequests=0;
}

/* RECENT POSTS FALLBACK */
function loadRecentPosts(){
  mode="recent";

  resetPosts();
  prepareRequest();

  container.find(".rpTitleH2").html(CONFIG.recentTitle);

  if(!$("#related-posts-loadingtext").length&&CONFIG.loadingText){
    container.find(".rpTitleH2").after(
      '<div id="related-posts-loadingtext">'+
        CONFIG.loadingText+
      '</div>'
    );
  }

  list.empty();

  var blogURL=
    CONFIG.blogURL||
    (location.protocol+"//"+location.host);

  var feedLimit=Math.max(
    CONFIG.maxPosts+2,
    CONFIG.maxPostsPerTag+2
  );

  requestFeed(
    blogURL+
    "/feeds/posts/default"+
    "?max-results="+feedLimit+
    "&orderby=published"+
    "&alt=json-in-script"
  );
}

/* INIT */
function init(){
  container=$(CONFIG.containerSelector);

  /* GET ARTICLE LABELS */
  if(!CONFIG.tags){
    CONFIG.tags=[];

    $('a[rel="tag"]')
      .slice(0,CONFIG.maxTags)
      .each(function(){

        var tag=$.trim(
          $(this).text().replace(/\s+/g," ")
        );

        if(tag&&$.inArray(tag,CONFIG.tags)===-1){
          CONFIG.tags.push(tag);
        }
      });
  }

  var hasTags=
    CONFIG.tags&&
    CONFIG.tags.length>0;

  mode=hasTags?"related":"recent";

  /* HEADER */
  container.empty().append(
    '<div class="rpTitleH2">'+
      (hasTags
        ?CONFIG.relatedTitle
        :CONFIG.recentTitle)+
    '</div>'
  );

  /* LOADING */
  if(CONFIG.loadingText){
    container.append(
      '<div id="related-posts-loadingtext">'+
        CONFIG.loadingText+
      '</div>'
    );
  }

  /* LIST */
  list=$("<ul></ul>").appendTo(container);

  var blogURL=
    CONFIG.blogURL||
    (location.protocol+"//"+location.host);

  resetPosts();
  prepareRequest();

  /* NO LABEL = RECENT POSTS */
  if(!hasTags){
    var recentLimit=Math.max(
      CONFIG.maxPosts+2,
      CONFIG.maxPostsPerTag+2
    );

    requestFeed(
      blogURL+
      "/feeds/posts/default"+
      "?max-results="+recentLimit+
      "&orderby=published"+
      "&alt=json-in-script"
    );

    return;
  }

  /* RELATED POSTS BY LABEL */
  $.each(CONFIG.tags,function(_,tag){
    requestFeed(
      blogURL+
      "/feeds/posts/default/-/"+
      encodeURIComponent(tag)+
      "?max-results="+
      (CONFIG.maxPostsPerTag+1)+
      "&orderby=published"+
      "&alt=json-in-script"
    );
  });
}

/* START */
init();

/* RESPONSIVE */
$(window)
  .off("resize.relatedPostsWidget")
  .on("resize.relatedPostsWidget",function(){

    clearTimeout(resizeTimer);

    resizeTimer=setTimeout(function(){

      if(!container||!container.length||!posts.length){
        return;
      }

      var newCount=getResponsivePostCount();

      if(newCount!==displayPosts){
        renderPosts(true);
      }

    },150);
  });

})(jQuery);
}

/* RUN WIDGET */
jQuery(function(){
  relatedPostsWidget();
});
