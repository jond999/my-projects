<?php
	include "functions.php";

	receive_file_to_load();
?>

<!DOCTYPE html>
<html>
	<head>
		<title>Edit Championship</title>
		<meta charset="UTF-8">
	</head>

	<body>		
		<button id="home">Home</button> 
		<button id="save" disabled>Save</button>
		<button id="next" disabled>Next</button>

		<h1>Edit competition</h1>
		<h3 id="status"></h3>
		
		<button class="edit">Edit</button>
		<button id="done" disabled>Done</button>
		<div class="edit">
			<br>
			<div id="teams-edit"></div>
			<div id="round"></div>
			<div id="fixture"></div>
		<div id="matches"></div>
		</div><br><br>
		
		<button class="overview">Overview</button>
		<div class="overview">
			<br>
			<div id="competition"></div><br>
			<div id="num-teams"></div><br>
			<div id="teams-overview"></div><br>
			<div id="num-rounds"></div><br>
			<div id="num-fixtures"></div><br>
			<div id="calendar"></div>
		</div>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		<script src="./scripts/common.js"></script>
		<script src="./scripts/edit-tournament-script.js"></script>
	</body>
</html> 
