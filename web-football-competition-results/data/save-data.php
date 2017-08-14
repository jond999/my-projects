<?php
	$data = $_POST['data'];

	$obj = json_decode($data);
	
	$file = $obj->file_name;
	
	if($file !== "")
	{
		$file = substr($obj->file_name, 7);	
	}
	else
	{
		$file = "data.json";
	}
	
	unset($obj->file_name);
	
	$data = json_encode($obj, 128);

	if(!file_exists($file))
	{
		$mode = 'x+';
		
		$filePointerResource = fopen($file, $mode);
		if(!$filePointerResource)
		{
			print("File pointer resource wasn't binded to the stream.");

			return;
		}
	}	
	
	$mode = 'w';
	
	$filePointerResource = fopen($file, $mode);

	if(!$filePointerResource)
	{
		return;
	}
	
	$fileWritten = fwrite($filePointerResource, $data);

	if(!$fileWritten)
	{
		print("File \"" . $file . "\" wasn't written.<br>");

		return;
	}

	echo $file;
?>