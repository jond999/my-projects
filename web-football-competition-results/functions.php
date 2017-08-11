<?php
	function files_are_equal($file1, $file2) {
		if(filesize($file1) !== filesize($file2))
		{
			return false;		
		}
	
		$read1 = fopen($file1, "rb");
		$read2 = fopen($file2, "rb");
		
		$equal = true;
		
		while(!feof($read1))
		{
			if(fread($read1, 8192) != fread($read2, 8192))
			{
				$equal = false;
				
				break;
			}
		}

		fclose($read1);
		fclose($read2);

		return $equal;
	}

	function load($file) {
		$thefile = './data/data.json';
		
		if(!files_are_equal($file, $thefile))
		{
			if(!copy($file, $thefile))
			{
				echo "loading " . substr($file, 13) . "' failed...<br><br>";

				return;
			}			
		}
	}

	function choose_file_to_load($operation) {
		$dir = './data/saved/';
		$files = scandir($dir);

		array_shift($files); // remove '.'
		array_shift($files); // remove '..'

		if($operation === "simulate")
		{
			$link = "./matches.php";
		}

		if($operation === "edit")
		{
			$link = "./edit-tournament.php";
		}		
		
		print("<form id=\"load\" action=\"" . $link . "\" method=\"post\">");

		foreach($files as $name)
		{
			print("<input type=\"radio\" name=\"file\" value=\"". $name . "\">" . $name . "<br>");
		}
		
		print("<br>");
		print("<input type=\"submit\" value=\"Load\">");
		print("</form>");			
	}

	function receive_file_to_load()
	{
		if(isset($_POST['file'])) 
		{
			$dir = './data/saved/';

			$file = $dir . $_POST['file'];

			load($file);
		}
	}
?>