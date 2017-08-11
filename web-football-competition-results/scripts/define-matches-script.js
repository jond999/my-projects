$(document).ready(function() {		
	$("#back").click(function() {
		document.location.href = './choose-teams.html';
	});

	$("#home").click(function() {
		document.location.href = './index.html';
	});	

	var data = $("<div id='data'></div>");
	
	data.load("./data/data.json", function(responseTxt, statusTxt, xhr) {
		if(statusTxt == "success")
		{		
			var obj = JSON.parse(responseTxt);

			var num_teams = obj["num_teams"];
			var num_rounds = obj["num_rounds"];
			var num_fixtures = obj["num_fixtures"];

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

			$("#teams").html(buttons);

			$(".team").css("width", "150px");

			var round = 1;
			$("#round").html("<h2>Round " + round + "</h2>");
			
			var fixture = 1;
			$("#fixture").html("<h3>Fixture " + fixture + "</h3>");
			
			var matches = "";
			
			$("#matches").html(matchesTemplate(matches, num_teams));

			var arr = []; 

			var clicks = 0;

			obj["calendar"] = [];

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
					
				save(obj);

				$("#save").attr("disabled", true);
				$("#next").attr("disabled", false);
	
				if(fixture == num_fixtures)
				{
					$("#next").attr("disabled", true);

					$("h1").hide();
					$("#teams").hide();
					$("#round").hide();
					$("#matches").hide();

					$("h3").text("matches created sucessfully!");					
				}
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
			});					
		}

		if(statusTxt == "error")
		{
			console.log("ERROR!!!");
		}
	});	
});
