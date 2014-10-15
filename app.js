var express = require("express"),
app = express(),
bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

var articles = [];
var count = 1;

app.get('/', function(req, res){
  res.render('index');
});

// app.get('/articles', function(){
//   res.render();
// }

// app.get('/articles/new', function(){
//   res.render();
// }

app.post('/articles', function(req,res){
  console.log("THIS IS THE REQ OBJECT");
  console.log(req);
  console.log("THIS IS MY REQ.QUERY OBJECT");
  console.log(req.query);
  console.log("THIS IS MY REQ.BODY OBJECT");
  console.log(req.body);
  var article = {};
  article.id = count;
  article.title = req.body.article.title;
  article.author = req.body.article.author;
  article.text = req.body.article.text;
  articles.push(article);
  count++;
  // console.log(users);
  res.render('articles', {allMyArticles:articles});
});


app.get('/article/:id', function(req,res){
  var articleId = Number(req.params.id);
  var foundArticle;
  articles.forEach(function(article){
    if(article.id === articleId){
      foundArticle = article;
    }
  });
  res.render('article', {article:foundArticle});
});

app.get('/articles', function(req,res){
  res.render('articles', {allMyArticles:articles});
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/contact', function(req, res){
  res.render('contact');
});

app.get('*', function(req,res){
  res.render('404');
}

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});