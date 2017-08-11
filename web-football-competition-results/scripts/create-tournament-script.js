$(document).ready(function() {	
	$("#home").click(function()  {
		document.location.href = './index.html';
	});

	var data = $("<div id='data'></div>");
	
	data.load("./data/data.json", function(responseTxt, statusTxt, xhr) {
		if(statusTxt == "success")
		{
			var competition;
			var format;
			var num_teams;
			var num_rounds;
			var num_fixtures;

			var obj = JSON.parse(responseTxt);

			$("input[name='num-teams']").change(function() {
				num_teams = $("input[name='num-teams']").val();
				num_teams = Number(num_teams);

				obj["num_teams"] = num_teams;

				num_rounds = 2;
				$("input[name='num-rounds']").val(num_rounds);
				
				num_fixtures = (num_teams - 1) * num_rounds;
				$("#num-fixtures").html("Number of fixtures: " + num_fixtures);	
			});

			$("input[name='num-rounds']").change(function() {
				num_rounds = $("input[name='num-rounds']").val();
				num_rounds = Number(num_rounds);

				obj["num_rounds"] = num_rounds;

				num_fixtures = (num_teams - 1) * num_rounds;
				$("#num-fixtures").html("Number of fixtures: " + num_fixtures);	

				obj["num_fixtures"] = num_fixtures;
			});			
			
			$("#save").click(function()  {				
				var conditions_fulfilled = 0
				
				// competition name
				competition = $("input[name='competition-name']").val();

				if(competition.trim() === "")
				{
					alert("You didn't give any name to the competition.");
				}
				else
				{
					conditions_fulfilled++;

					obj["competition"] = competition;
				}

				// competition's format
				format = $("input[name='format']:checked").val();
				format = Number(format); 

				switch(format)
				{
					case 1: 	console.log("competition format: league"); break;
					case 2: 	console.log("competition format: elimination stage"); break;
					case 3: 	console.log("competition format: group stage + elimination stage"); break;
					
					default: 	console.log("something went wrong!");
				}

				conditions_fulfilled++;

				// number of teams
				num_teams = $("input[name='num-teams']").val();
				
				if(num_teams === "")
				{
					alert("You didn't choose any number of teams for the competition.");
				}
				else if(Number(num_teams) <= 1 || Number(num_teams) > __NUM_TEAMS_MAX__)
				{
					alert("Number of teams must be in interval [2, " + __NUM_TEAMS_MAX__ + "].");
				}
				else
				{
					conditions_fulfilled++;		
				}

				if(conditions_fulfilled === 3)
				{
					$("#save").attr("disabled", true);
					
					num_teams = Number(num_teams);
/*
					console.log("num_rounds: " + (typeof num_rounds));
					console.log("num_rounds: " + num_rounds);
					console.log("num_fixtures: " + (typeof num_fixtures));
					console.log("num_fixtures: " + num_fixtures);
					console.log("num_teams: " + (typeof num_teams));
					console.log("num_teams: " + num_teams);
*/

					obj["num_teams"] = num_teams;
					
					obj["num_rounds"] = num_rounds;
					
					obj["num_fixtures"] = num_fixtures;

					// save({}); // DANGER!!! DON'T TOUCH! ERASE DATA.JSON!
					save(obj);
					
					$("#next").attr("disabled", false);

					$("h1").hide();
					$("#competition").hide();
					$("#format").hide();
					$("#num-teams").hide();
					$("#num-rounds").hide();
					$("#num-fixtures").hide();
					
					$("h3").text("Competition created successfully!");

					$("#next").click(function()  {
						document.location.href = './choose-teams.html';
					});
				}
			});
		}

		if(statusTxt == "error")
		{
			console.log("ERROR!!!");
		}
	});
});
