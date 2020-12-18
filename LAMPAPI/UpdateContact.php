<?php
	$inData = getRequestInfo();

	$firstname = $inData["firstnameo"];
	$lastname = $inData["lastnameo"];
	$email = $inData["emailo"];
	$phone = $inData["phoneo"];
    $address = $inData["addresso"];
	$userId = $inData["userId"];
	$firstnamee = $inData["firstnamee"];
	$lastnamee = $inData["lastnamee"];
	$emaile = $inData["emaile"];
	$phonee = $inData["phonenume"];
    $addresse = $inData["addresse"];


	$conn = new mysqli("localhost", "tgreco32_tommy", "COP4331@#4", "tgreco32_ContactManager");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "UPDATE Contacts SET  FName = '$firstnamee',
									 LName = '$lastnamee',
									 Email = '$emaile',
									 Phone = '$phonee',
									 Address = '$addresse' 
				WHERE FName = '$firstname' and
				   	  LName = '$lastname' and
					  Email = '$email' and
					  Phone = '$phone' and
					  Address = '$address' and
					  UserID = $userId";
					
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
			echo "Record updated successfully";
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

	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>
