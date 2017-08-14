$(document).ready(function() {	
	var save_file_name = $("h6").html();
	$("h6").hide();

	$("#home").click(function()  {
		document.location.href = './index.php';
	});

	$("div.overview").hide();

	$("button.overview").click(function()  {				
		$("div.overview").toggle();
	});

	$("#done").click(function()  {				
		$("button.edit").attr("disabled", false);	
		$("#done").attr("disabled", true);
		$("#save").attr("disabled", true);
		$("#next").attr("disabled", true);
	});	

	var data = $("<div id='data'></div>");
	
	data.load("./data/data.json", function(responseTxt, statusTxt, xhr) {
		if(statusTxt == "success")
		{
			var obj = JSON.parse(responseTxt);

			var num_teams = obj["num_teams"];
			var num_rounds = obj["num_rounds"];
			var num_fixtures = obj["num_fixtures"];
			var saved_fixtures = obj["calendar"].length;

			$("#competition").html("<b>Competition:</b> " + obj["competition"]);
			$("#num-teams").html("<b>Nº of teams:</b> " + num_teams);

			var arrTeams = obj["teams"];
			
			var string = "";	
			string += "<b>Teams</b>";
			string += "<ol>";
			for(var i = 0; i < arrTeams.length; i++)
			{
				string += ("<li>" + arrTeams[i]["name"] + "</li>");
			}
			string += "</ol>";
			
			$("#teams-overview").html(string);
			$("#num-rounds").html("<b>Nº of rounds:</b> " + num_rounds);
			$("#num-fixtures").html("<b>Nº of fixtures:</b> " + num_fixtures);
			
			var arrFixtures = obj["calendar"];
			string = "";	
			
			for(var i = 0; i < arrFixtures.length; i++)
			{
				string += ("<h2>round: " + arrFixtures[i]["round"] + "</h2>");
				string += ("<h4>fixture: " + arrFixtures[i]["fixture"] + "</h4>");
	
				var arrMatches = arrFixtures[i]["matches"];

				for(var j = 0; j < arrMatches.length; j++)
				{
					string += ("id: " + arrMatches[j]["id"] + "<br>");
					string += ("home: " + arrMatches[j]["home"] + "<br>");
					string += ("goals home: " + arrMatches[j]["goals_home"] + "<br>");
					string += ("goals away: " + arrMatches[j]["goals_away"] + "<br>");
					string += ("away: " + arrMatches[j]["away"] + "<br>");
					string += ("date: " + arrMatches[j]["date"] + "<br>");
					string += ("time: " + arrMatches[j]["time"] + "<br><br>");
				}

				string += "<br><hr><br>";
			}

			$("#calendar").html(string);

			var arr;
			var fixture;
			var round;
			var clicks;

			$("button.edit").click(function()  {		
				$("button.edit").attr("disabled", true);	
				$("#done").attr("disabled", false);
				$("#save").attr("disabled", false);

				var teams = [];

				for(var i = 0; i < num_teams; i++)
				{
					teams.push(obj["teams"][i]["name"]);
				}

				var buttons = "";

				for(var i = 0; i < num_teams; i++)
				{
					buttons += "<button class=\"team\">" + teams[i] + "</button>";
				}

				$("#teams-edit").html(buttons);

				$(".team").css("width", "150px");
		
				fixture = obj["calendar"].length + 1;				
				$("#fixture").html("<h3>Fixture " + fixture + "</h3>");
				
				round = Math.ceil(fixture / (num_fixtures / num_rounds));
				$("#round").html("<h2>Round " + round + "</h2>");

				var matches = "";
				
				$("#matches").html(matchesTemplate(matches, num_teams));

				arr = []; 

				clicks = 0;

				$(".team").click(function() {
					clicks++;

					$(this).attr("disabled", true);

					arr.push($(this).text());

					if(clicks % 2 == 1)
					{
						$(".home")[Math.floor(clicks / 2)].append(arr[clicks - 1]);	
					}
					else
					{
						$(".away")[Math.floor(clicks / 2) - 1].append(arr[clicks - 1]);	
					}

					if(clicks == num_teams)
					{
						$("#save").attr("disabled", false);
					}	
				});

				$("div.edit").show();
			});

			$("#save").click(function() {
				var object = {};

				obj["calendar"].push(object);

				var len = obj["calendar"].length;

				obj["calendar"][len - 1]["round"] = round;
				obj["calendar"][len - 1]["fixture"] = fixture;
				obj["calendar"][len - 1]["matches"] = [];
				
				for(var i = 0; i < num_teams / 2; i++)
				{	
					var match = {};
					
					match["id"] = i + 1;
					match["home"] = arr[2 * i];
					match["away"] = arr[2 * i + 1];
					
					var goals_home = $(".goals-home>input[type=\"text\"]")[i]["value"];
					goals_home = Number(goals_home);
					match["goals_home"] = goals_home;

					var goals_away = $(".goals-away>input[type=\"text\"]")[i]["value"];
					goals_away = Number(goals_away);
					match["goals_away"] = goals_away;					

					var date = $(".date>input[type=\"text\"]")[i]["value"];
					match["date"] = date;

					var time = $(".time>input[type=\"text\"]")[i]["value"];
					match["time"] = time;
					
					obj["calendar"][len - 1]["matches"].push(match);
				}
					
				save(obj, "");
				save(obj, save_file_name);

				saved_fixtures++;

				$("#save").attr("disabled", true);
				$("#next").attr("disabled", false);
	
				arrFixtures = obj["calendar"];
				string = "";	
				
				for(var i = 0; i < arrFixtures.length; i++)
				{
					string += ("<h2>round: " + arrFixtures[i]["round"] + "</h2>");
					string += ("<h4>fixture: " + arrFixtures[i]["fixture"] + "</h4>");
		
					var arrMatches = arrFixtures[i]["matches"];

					for(var j = 0; j < arrMatches.length; j++)
					{
						string += ("id: " + arrMatches[j]["id"] + "<br>");
						string += ("home: " + arrMatches[j]["home"] + "<br>");
						string += ("away: " + arrMatches[j]["away"] + "<br>");
						string += ("date: " + arrMatches[j]["date"] + "<br>");
						string += ("time: " + arrMatches[j]["time"] + "<br><br>");
					}

					string += "<br><hr><br>";
				}

				$("#calendar").html(string);						
			});			

			$("#next").click(function() {
				arr = [];

				clicks = 0;

				$(".team").attr("disabled", false);

				if((fixture % (num_teams - 1)) == 0)
				{	
					round++;
				}

				fixture++;	
	
				$("#round").html("<h2>Round " + round + "</h2>");
				$("#fixture").html("<h3>Fixture " + fixture + "</h3>");					
				
				var matches = "";

				$("#matches").html(matchesTemplate(matches, num_teams));

				$("#save").attr("disabled", false);
				$("#next").attr("disabled", true);	

				if(saved_fixtures == num_fixtures)
				{
					$("#status").html("Calendar fully implemented! (" + saved_fixtures + " of " + num_fixtures + " # " + "100%)");
					$("#status").css("color", "#00FF00");
					$("#next").hide();
					$("#save").hide();
					$("h1").hide();
					$("button.edit").hide();
					$("#done").hide();
					$("div.edit").hide();
				}
				else
				{
					$("#status").html("Calendar not fully implemented! (" + saved_fixtures + " of " + num_fixtures + " # " + Math.round((saved_fixtures / num_fixtures) * 100) + "%)");
					$("#status").css("color", "#FF0000");
				}
			});						

			if(saved_fixtures == num_fixtures)
			{
				$("#status").html("Calendar fully implemented! (" + saved_fixtures + " of " + num_fixtures + " # " + "100%)");
				$("#status").css("color", "#00FF00");
				$("#next").hide();
				$("#save").hide();
				$("h1").hide();
				$("button.edit").hide();
				$("#done").hide();
				$("div.edit").hide();
			}
			else
			{
				$("#status").html("Calendar not fully implemented! (" + saved_fixtures + " of " + num_fixtures + " # " + Math.round((saved_fixtures / num_fixtures) * 100) + "%)");
				$("#status").css("color", "#FF0000");
			}
		}

		if(statusTxt == "error")
		{
			console.log("ERROR!!!");
		}
	});
});
