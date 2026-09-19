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
  thumbnailSizes:[128,256,320,640,800],
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

/* ADAPTIVE THUMBNAIL */
function getThumbSize(width){
  var sizes=CONFIG.thumbnailSizes&&CONFIG.thumbnailSizes.length?CONFIG.thumbnailSizes:[128,256,320,640,800];
  var target=Math.max(1,Math.ceil(parseFloat(width)||parseInt(CONFIG.thumbnailSize,10)||200));
  for(var i=0;i<sizes.length;i++)if(target<=sizes[i])return sizes[i];
  return sizes[sizes.length-1]||800;
}

function isGitHubImage(url){
  if(!url)return false;
  try{
    var host=(new URL(String(url).replace(/&amp;/g,"&"),location.href)).hostname.toLowerCase();
    return host==="github.com"||host==="raw.githubusercontent.com"||host==="user-images.githubusercontent.com"||host==="private-user-images.githubusercontent.com"||/(^|\.)githubusercontent\.com$/.test(host)||/(^|\.)github\.io$/.test(host);
  }catch(e){return /(?:github\.com|githubusercontent\.com|github\.io)/i.test(String(url));}
}

function normalizeGitHubImage(url){
  if(!url)return "";
  url=String(url).trim().replace(/&amp;/g,"&");
  try{
    var u=new URL(url,location.href),host=u.hostname.toLowerCase();
    if(host==="github.com"){
      var parts=u.pathname.split("/").filter(Boolean);
      /* github.com/user/repo/blob/branch/path/file.ext */
      if(parts.length>=5&&parts[2]==="blob"){
        return "https://raw.githubusercontent.com/"+parts[0]+"/"+parts[1]+"/"+parts[3]+"/"+parts.slice(4).join("/");
      }
      /* github.com/user/repo/raw/branch/path/file.ext */
      if(parts.length>=5&&parts[2]==="raw"){
        return "https://raw.githubusercontent.com/"+parts[0]+"/"+parts[1]+"/"+parts[3]+"/"+parts.slice(4).join("/");
      }
    }
  }catch(e){}
  return url;
}

function resizeBloggerImage(url,size){
  if(!url)return "";
  return url
    .replace(/=s\d+(?:-[a-z0-9-]+)?(?=($|[?&#]))/i,"=s"+size)
    .replace(/\/s\d+(?:-[a-z0-9-]+)?(?=\/)/i,"/s"+size);
}

function resizeGitHubVariant(url,size){
  if(!url)return "";
  /*
   * GitHub tidak menyediakan resize dinamis. Jadi URL hanya diganti jika
   * source memang sudah memakai pola varian s128/s256/s320/s640/s800.
   * Jika varian tujuan tidak ada, onerror akan kembali ke URL GitHub asli.
   */
  if(/\/s(?:128|256|320|640|800)(?=\/)/i.test(url))
    return url.replace(/\/s(?:128|256|320|640|800)(?=\/)/i,"/s"+size);
  if(/([._-])s(?:128|256|320|640|800)(?=\.[a-z0-9]+(?:$|[?#]))/i.test(url))
    return url.replace(/([._-])s(?:128|256|320|640|800)(?=\.[a-z0-9]+(?:$|[?#]))/i,"$1s"+size);
  return url;
}

function getSizedThumbnail(url,width){
  if(!url)return CONFIG.blankThumbnail||"";
  var size=getThumbSize(width),normalized=normalizeGitHubImage(url);
  if(isGitHubImage(normalized))return resizeGitHubVariant(normalized,size);
  return resizeBloggerImage(normalized,size);
}

function updateRenderedThumbnails(){
  if(!list||!list.length)return;
  list.find(".imageRP img[data-thumb]").each(function(){
    var img=$(this),box=img.closest(".imageRP");
    var width=box.innerWidth()||img.width()||CONFIG.thumbnailSize;
    var source=img.attr("data-thumb")||"",sized=getSizedThumbnail(source,width);
    if(sized&&img.attr("src")!==sized){
      img.attr("data-fallback",normalizeGitHubImage(source));
      img.attr("src",sized);
    }
  });
}

function getImageAttr(img){
  var attrs=["data-original","data-src","data-lazy-src","data-url","src"];
  for(var i=0;i<attrs.length;i++){
    var v=img.attr(attrs[i]);
    if(v&&v.indexOf("data:image/")!==0)return v;
  }
  var srcset=img.attr("srcset")||img.attr("data-srcset")||"";
  if(srcset){
    var first=$.trim(srcset.split(",")[0]||"").split(/\s+/)[0];
    if(first)return first;
  }
  return "";
}

function findGitHubImage(content){
  if(!content)return "";
  var temp=$("<div>").html(content),found="";
  temp.find("img").each(function(){
    if(found)return false;
    var img=$(this),attrs=["data-original","data-src","data-lazy-src","data-url","src","srcset","data-srcset"];
    for(var i=0;i<attrs.length;i++){
      var v=img.attr(attrs[i])||"";
      if(attrs[i].indexOf("srcset")!==-1&&v)v=$.trim(v.split(",")[0]||"").split(/\s+/)[0];
      if(v&&isGitHubImage(v)){found=normalizeGitHubImage(v);return false;}
    }
  });
  if(found)return found;
  temp.find("a[href]").each(function(){
    var href=$(this).attr("href")||"";
    if(isGitHubImage(href)&&(/\.(?:avif|webp|jpe?g|png|gif)(?:[?#].*)?$/i.test(href)||/github\.com\/user-attachments\/assets\//i.test(href))){
      found=normalizeGitHubImage(href);return false;
    }
  });
  return found;
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
    var original=normalizeGitHubImage(post.thumbnail);
    var thumb=escapeHTML(original);
    var firstSrc=escapeHTML(getSizedThumbnail(original,CONFIG.thumbnailSize));
    image='<img alt="'+title+'" data-thumb="'+thumb+'" data-fallback="'+thumb+'" src="'+firstSrc+'" onerror="var f=this.getAttribute(\'data-fallback\');if(f&&this.src!==f){this.onerror=null;this.src=f;}"/>';
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
  updateRenderedThumbnails();
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

  /* External GitHub image in article content gets first priority. */
  var githubImage=findGitHubImage(content);
  if(githubImage)return githubImage;

  /* Keep existing Blogger media thumbnail behavior for normal posts. */
  if(entry.media$thumbnail&&entry.media$thumbnail.url){
    thumbnail=entry.media$thumbnail.url;
  }else if(content){
    var temp=$("<div>").html(content),img=temp.find("img").first();
    if(img.length)thumbnail=getImageAttr(img)||thumbnail;
  }

  return normalizeGitHubImage(thumbnail);
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
      }else{
        updateRenderedThumbnails();
      }

    },150);
  });

})(jQuery);
}

/* RUN WIDGET */
jQuery(function(){
  relatedPostsWidget();
});
