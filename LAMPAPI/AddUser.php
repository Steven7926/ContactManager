<?php
	$inData = getRequestInfo();
	
	$firstname = $inData["firstname"];
	$lastname = $inData["lastname"];
	$login = $inData["login"];
	$password = $inData["password"];

	$conn = new mysqli("localhost", "tgreco32_tommy", "COP4331@#4", "tgreco32_ContactManager");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$hashpass = md5($password, FALSE);
		$sql = "insert into Users (FirstName, LastName, Login, Password) VALUES ( '$firstname',   '$lastname', '$login',  '$hashpass' )";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );


		}
		$conn->close();
	}
	
	
	returnWithError("");
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>