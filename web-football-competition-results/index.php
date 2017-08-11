<?php
	include "functions.php";
?>

<!DOCTYPE html>
<html>
	<head>
		<title>Home Page</title>
		<meta charset="UTF-8">
	</head>

	<body>		
		<button id="create">Create Tournament</button>

		<br><br>

		<button id="edit">Edit Tournament</button>

		<div id="edit-load">
			<br>
			
			<?php choose_file_to_load("edit") ?>
		</div>

		<br><br>

		<button id="simulate">Simulate Tournament</button>

		<div id="simulate-load">
			<br>
			
			<?php choose_file_to_load("simulate") ?>
		</div>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		<script src="./scripts/common.js"></script>
		<script type="text/javascript">
			$(document).ready(function() {	
				$("#edit-load").hide();
				$("#simulate-load").hide();
				
				$("#create").click(function() {
					document.location.href = './create-tournament.php';
				});

				$("#edit").click(function() {
					$("#edit-load").toggle();
					$("#simulate-load").hide();
				});	

				$("#simulate").click(function() {
					$("#simulate-load").toggle();
					$("#edit-load").hide();
				});				
			});			
		</script>
	</body>
</html> 
