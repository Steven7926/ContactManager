<?php

    $inData = getRequestInfo();
    $ip = "198.12.250.186";
    $searchResults = "";
    $searchCount = 0;

    $conn = new mysqli("localhost", "tgreco32_meme", "OmegaLul@#", "tgreco32_ContactManager");
    if ($conn->connect_error)
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
        $sql = "SELECT * FROM Contacts WHERE ('UserID' = '.$inData["userID"].') AND (('FName' LIKE '%".$inData["search"]."%') OR ('LName' LIKE '%".$inData["search"]."%'))";
        $result = $conn->query( $sql );
        if ($result->num_rows > 0)
        {
            while ($row = $result->fetch_assoc())
            {
                if( $searchCount > 0 )
                {
                    $searchResults .= ",";
                }
                $searchCount++;
                $searchResults .= '"' . $row["FName"] . '"' . $row["LName"] . '"';
            }
        }
        else
        {
            //returnWithError( $sql );
            returnWithError( "No Records Found" );
        }
        $conn->close();
    }

    returnWithInfo( $searchResults );

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

	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
