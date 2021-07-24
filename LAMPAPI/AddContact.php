<?php
	$inData = getRequestInfo();
	
	$firstname = $inData["firstname"];
	$lastname = $inData["lastname"];
	$email = $inData["email"];
	$phone = $inData["phone"];
    $address = $inData["address"];
    $userId = $inData["userId"];

	$conn = new mysqli("localhost", "root", "", "contactmanager");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "insert into contacts (FName, LName, Email, Phone, Address, UserID) VALUES ( '$firstname',   '$lastname', '$email',  '$phone', '$address', $userId)";
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