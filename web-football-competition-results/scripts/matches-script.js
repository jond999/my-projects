
$(document).ready(function() {		
	var save_file_name = $("h6").html();
	$("h6").hide();
	
	$("#back").click(function() {
		document.location.href = './index.php';
	});

	$("#home").click(function() {
		document.location.href = './index.php';
	});	

	var data = $("<div id='data'></div>");
	
	data.load("./data/data.json", function(responseTxt, statusTxt, xhr) {
		var updates = 0;
		var map = [];
		
		if(statusTxt == "success")
		{		
			var obj = JSON.parse(responseTxt);
			var num_fixtures_allowed = obj["calendar"].length;
			var competition = obj["competition"];
			var count_fixtures = 0;

			$("h1").text(competition);

			var calendar = obj["calendar"];
			var num_teams = obj["num_teams"];
			var num_fixtures = obj["num_fixtures"];
			var num_rounds = obj["num_rounds"];
			
			var calendar_string = "";

		    for(var i = 0; i < num_rounds; i++)
		    {
				calendar_string += "<h2>Round " + (i + 1) + "</h2>";

		    	for(var j = 0; j < num_teams - 1; j++)
		    	{
					calendar_string += "<h3>Fixture " + (i * (num_teams - 1) + j + 1) + "</h2>";

					calendar_string += matchesCalendar(num_teams);	

					count_fixtures++;

					if(count_fixtures == num_fixtures_allowed)
					{
						i = num_rounds;

						break;
					}							
		  		}
		    }

		    $("#calendar").html(calendar_string);

		    for(var i = 0; i < ((num_teams / 2) * num_fixtures_allowed); i++)
		    {
		    	var fixture = Math.floor(i / (num_teams / 2));
		    	var match = Math.floor(i % (num_teams / 2));

		    	var selected = obj["calendar"][fixture]["matches"][match];

		    	var home = selected["home"];
		    	var away = selected["away"];
		    	var date = selected["date"];
		    	var time = selected["time"];
		    	var goals_home = selected["goals_home"];
		    	var goals_away = selected["goals_away"];
		    	
		    	$(".home")[i].append(home);
		    	$(".away")[i].append(away);
		    	$(".date")[i].append(date);
		    	$(".time")[i].append(time);
		    	$($(".goals-home>input")[i]).attr("value", goals_home);
		    	$($(".goals-away>input")[i]).attr("value", goals_away);
		    }

			$(".goals-home>input").change(function() {
				updates++;
				
				var index = [];
				var selected_fixture_string = $(this).parent().parent().parent().parent().prev().html();
				var selected_fixture_string_length = selected_fixture_string.length;
				var selected_fixture = Number(selected_fixture_string.substring(selected_fixture_string_length - 1, selected_fixture_string_length)) - 1;
				var selected_match = $(this).parent().parent().index() - 1;
				
				index.push(selected_fixture);
				index.push(selected_match);
				index.push(0);

				map.push(index);
			});

			$(".goals-away>input").change(function() {
				updates++;

				var index = [];
				var selected_fixture_string = $(this).parent().parent().parent().parent().prev().html();
				var selected_fixture_string_length = selected_fixture_string.length;
				var selected_fixture = Number(selected_fixture_string.substring(selected_fixture_string_length - 1, selected_fixture_string_length)) - 1;
				var selected_match = $(this).parent().parent().index() - 1;
				
				index.push(selected_fixture);
				index.push(selected_match);
				index.push(1);

				map.push(index);
			});			

			$("#save").click(function() {
				while(map.length != 0)
				{
					var match = map.shift();

					match[0] = match[0] + 1;
					match[1] = match[1] + 1;
					
					var index = (match[1] + (match[0] - 1) * (num_teams / 2)) - 1;

					if(match[2] == 0)
					{	
 						obj["calendar"][match[0] - 1]["matches"][match[1] - 1]["goals_home"] = Number($($(".goals-home>input")[index]).val());	
					}
					else if(match[2] == 1)
					{
						obj["calendar"][match[0] - 1]["matches"][match[1] - 1]["goals_away"] = Number($($(".goals-away>input")[index]).val());
					}
				}

				save(obj, ""); // save into default file
				save(obj, save_file_name); // save into specific file inside saved directory
			});		    
		}

		if(statusTxt == "error")
		{
			console.log("ERROR!!!");
		}
	});
});
