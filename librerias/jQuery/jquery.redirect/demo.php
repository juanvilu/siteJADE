<html>
<head>
<title>jQuery redirect/POST plugin demo</title>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="jquery.redirect.min.js"></script>
<script type="text/javascript">


$(document).ready(function() {

	//show description
	$('.example').mouseover(function() {
		$('#description').text($(this).attr('rel'));
	});
	
	//hide description
	$('.example').mouseout(function() {
		$('#description').text('');
	});
	
	//examples
	$('.example').click(function(event) {
	
		var id = $(this).attr('id');
		
		if (id == 'ex1')
			$().redirect('demo.php', {'first': 'value1', 'second': 'value2'});
		else if (id == 'ex2')
			$().redirect('demo.php', {'first': 'value1', 'second': 'value2'}, 'GET');
		else if (id == 'ex3')
			$().redirect($(this).attr('href'));
		else if (id == 'ex4')
			$().redirect($(this).attr('href'), false, 'GET');
	
		//don't follow link
		event.preventDefault();
		return false;
	});
	
});

</script>

<style type="text/css">

#container {
	margin-left: 10%;
	margin-right: 10%;
}

#text
{
	width: 90%;
	border: 1px dashed #000;
	padding: 5px 5px 5px 5px;;
	font-family: Verdana, Helvetica, Arial;
	font-size: 12px;
	margin-bottom: 10px;
}

#examples
{
	width: 90%;
	border: 1px dashed #000;
	padding: 5px 5px 25px 5px;;
	font-family: Verdana, Helvetica, Arial;
	font-size: 12px;
}

h3
{
	font-family: Verdana, Helvetica, Arial;
	font-size: 18px;
	text-transform: uppercase;
}

#links {
	width: 100%;
}

#description {
	width: 100%;
	float: left;
	font-size: smaller;
	margin-top: 10px;
}

pre {
	width: 99%;
	border: 1px dashed #000;
	background-color: #ccc;
	padding: 5px;
}

pre#output{
	width: 90% !important;
}
</style>

</head>

<body>
<div id="container">

<div id="text">
<h3>Introduction</h3>
<p>This is simple jQuery plugin which can redirect user to another URL supplying POST parameters to the target location. Similar to what a browser does when users submit a form on your web site. Actually, this plugin makes hidden form and submits it to accomplish this.</p>
<p>This plugin comes with one simple function:</p>
<pre> $().redirect( target [, values[, method]] )</pre>
<p>Function arguments:</p>
<ul>
	<li><b>target</b> - <i>string</i> URL of a page to which we're POSTing data.</li>
	<li>
		<b>values</b> - <i>object</i> Hashmap of data to post to a page.
		<ul>
			<li>If this is omitted or set to <b>false</b> plugin will try to parse <b>target</b> for a list of arguments.</li>
		</ul>
	</li>
	<li>
		<b>method</b> - <i>string</i> What method to use to post data: POST or GET.
		<ul>
			<li>If this is omitted <b>POST</b> will be used.</li>
		</ul>
	</li>
</ul>

<h3>Usage</h3>
<p>First, you need to include plugin in your page after jQuery!</p>
<pre>&lt;script type="text/javascript" src="jquery.js"&gt; &lt;/script&gt;
&lt;script type="text/javascript" src="jquery.redirect.min.js"&gt; &lt;/script&gt;</pre>
<p>After that, call plugin's function whenever you want to redirect with a POST:</p>
<pre>//this will POST arg1=value1&arg2=value2 to demo.php
$().redirect('demo.php', {'arg1': 'value1', 'arg2': 'value2'});

//this will GET arg1=value1&arg2=value2 to demo.php
$().redirect('demo.php', {'arg1': 'value1', 'arg2': 'value2'}, 'GET');

//this will POST arg1=value1&arg2=value2 to demo.php
$().redirect('demo.php?arg1=value1&arg2=value2');

//this will GET arg1=value1&arg2=value2 to demo.php; also, it doesn't make any sense at all to use it like this
$().redirect('demo.php?arg1=value1&arg2=value2', false, 'GET');</pre>
<p>Use links below to test demos.</p>
</div>

<div id="examples">
	<div id="links">
		<a id="ex1" href="javascript:;" class="example" rel="POST some parameters to a page.">Basic example</a> |
		<a id="ex2" href="javascript:;" class="example" rel="Parameters can be posted via GET also.">GET method</a> |
		<a id="ex3" href="demo.php?first=value1&second=value2" class="example" rel="If you omit values object, plugin will try to parse target link for parameters.">GET as POST</a> |
		<a id="ex4" href="demo.php?first=value1&second=value2" class="example" rel="This example makes no sense at all.">GET as GET</a>
	</div>
	<div id="description"></div>
</div>
<pre id="output">POST: <?php var_dump($_POST); ?>

GET: <?php var_dump($_GET); ?></pre>

</div>

</body>
</html>