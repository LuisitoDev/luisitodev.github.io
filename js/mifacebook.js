window.fbAsyncInit = function() {
  FB.init({
    appId      : '671858500587815',
    xfbml      : true,
    version    : 'v2.9'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk')); 


export function shareScore(score, difficult){
  FB.ui({
      method: 'share',
      href: 'http://localhost/graficas-web/',
      hashtag: "#TanquecitosAlAtaque",
      quote: "Obtuve una puntuación de: " + score + " al jugar \"Tanquecitos al Ataque\""
  }, function (response){});
}

