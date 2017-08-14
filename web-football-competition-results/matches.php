<?php
	include "functions.php";
	
	receive_file_to_op(1);
?>

<!DOCTYPE html>
<html>
	<head>
		<title>League</title>
		<meta charset="UTF-8">
	</head>

	<body>		
		<button id="home">Home</button>
		<button id="back">Back</button>
		<button id="save">Save</button>

		<h1></h1>
		
		<div id="calendar"></div>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		<script src="./scripts/common.js"></script>
		<script src="./scripts/matches-script.js"></script>
	</body>
</html> 
