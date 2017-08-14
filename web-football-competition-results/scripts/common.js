const __NUM_TEAMS_MAX__ = 38;

function save(obj, file)
{
	obj["file_name"] = file;

	var data = JSON.stringify(obj, null, "\t");	

	$.ajax( {
		type: 'POST',
		
		url: './data/save-data.php',
				
		data: {'data': data},
		
		error: function() {
			console.log("error!");
		},

		success: function() {
			console.log("success!");
		},

		complete: function() {
			console.log("complete!");
		}
	});
}

function matchesTemplate(matches, num_teams)
{
	matches += "<table>";
	matches += "<tr><th>HOME</th><th></th><th></th><th>AWAY</th><th>DATE</th><th>TIME</th></tr>";
	
	for(var i = 0; i < num_teams / 2; i++)
	{
		matches += "<tr>";
		matches += "<td class=\"home\"></td>";
		matches += "<td class=\"goals-home\"><input type=\"text\" name=\"goals-home\" value=\"0\" size=\"1\" style=\"text-align: center\"></td>";
		matches += "<td class=\"goals-away\"><input type=\"text\" name=\"goals-away\" value=\"0\" size=\"1\" style=\"text-align: center\"></td>";
		matches += "<td class=\"away\"></td>";
		matches += "<td class=\"date\"><input type=\"text\" name=\"date\" value=\"--/--/--\" size=\"3\" style=\"text-align: center\"></td>";
		matches += "<td class=\"time\"><input type=\"text\" name=\"hour\" value=\"--:--\" size=\"1\" style=\"text-align: center\"></td>";
		matches += "</tr>";
	}
				
	matches += "</table>";

	return matches;
}

function matchesCalendar(num_teams)
{
	var string = "";
	
	string += "<table>";
	string += "<tr><th>HOME</th><th></th><th></th><th>AWAY</th><th>DATE</th><th>TIME</th></tr>";
	
	for(var i = 0; i < num_teams / 2; i++)
	{
		string += "<tr>";
		string += "<td class=\"home\"></td>";
		string += "<td class=\"goals-home\"><input type=\"text\" name=\"goals-home\" size=\"1\" style=\"text-align: center\"></td>";
		string += "<td class=\"goals-away\"><input type=\"text\" name=\"goals-away\" size=\"1\" style=\"text-align: center\"></td>";
		string += "<td class=\"away\"></td>";
		string += "<td class=\"date\"></td>";
		string += "<td class=\"time\"></td>";
		string += "</tr>";
	}
				
	string += "</table>";
	
	return string;
}
