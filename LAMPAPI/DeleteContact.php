<?php
    $inData = getRequestInfo();
	
	$firstname = $inData["firstname"];
	$lastname = $inData["lastname"];
	$email = $inData["email"];
	$phone = $inData["phone"];
   	$address = $inData["address"];
    $userId = $inData["userId"];

     $conn = new mysqli("localhost", "tgreco32_tommy", "COP4331@#4", "tgreco32_ContactManager");
	
	if ($conn->connect_error)
	{
	    returnWithError( $conn->connect_error );
	}
	
	
//	DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';
	
	
	else{
	// sql to delete a record
     $sql = "DELETE FROM Contacts WHERE (FName, LName, Email, Phone, Address, UserID) =( '$firstname',   '$lastname', '$email',  '$phone', '$address', $userId)";
        
        if ($result = $conn->query($sql) != TRUE) {
          echo "Record deleted successfully";
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
    }
    

?>