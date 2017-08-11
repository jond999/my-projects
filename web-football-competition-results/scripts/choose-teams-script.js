
$(document).ready(function() {	
	$("#back").click(function() {
		document.location.href = './create-tournament.php';
	});

	$("#home").click(function() {
		document.location.href = './index.php';
	});	
		
	var data = $("<div id='data'></div>");
	
	data.load("./data/data.json", function(responseTxt, statusTxt, xhr) {
		if(statusTxt == "success")
		{		
			var obj = JSON.parse(responseTxt);

			var num_teams = obj["num_teams"];

			$(".possibilities").after("<td class=\"selected\"></td>");

			var arr = [];
			
			var clicks = 0;			

			$("#info").text("You must select " + num_teams + " teams. (" + clicks + "/" +  num_teams + ")");

			$(".possibilities").click(function() {
				clicks++;
		
				$("#info").text("You must select " + num_teams + " teams. (" + clicks + "/" +  num_teams + ")");

				var button = $(this).find("button");
					
				button.attr("disabled", true);

				arr.push(button.text());

				$(".selected")[clicks - 1].append(arr[clicks - 1]);	

				if(clicks == num_teams)
				{
					$(".possibilities").hide();

					$("#save").attr("disabled", false);
				}					
			});	

			$("#save").click(function() {
				$("#save").attr("disabled", true);
				
				obj["teams"] = [];

				for(var i = 0; i < num_teams; i++)
				{
					obj["teams"][i] = {};
					obj["teams"][i]["id"] = i + 1;
					obj["teams"][i]["name"] = arr[i];	
				}
				
				save(obj);

				$("#next").attr("disabled", false);
				
				$("h1").hide();
				
				$("#info").text("Teams selected sucessfully!");

				$("#next").click(function() {
					document.location.href = './define-matches.php';	
				});				
			});
		}

		if(statusTxt == "error")
		{
			console.log("ERROR!!!");
		}
	});
});
