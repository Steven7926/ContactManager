<?php 
// Database connection info 
$dbDetails = array( 
    'host' => 'localhost', 
    'user' => 'tgreco32_tommy', 
    'pass' => 'COP4331@#4', 
    'db'   => 'tgreco32_ContactManager' 
); 
 
// DB table to use 
$table = 'Contacts'; 
 
// Table's primary key 
$primaryKey = 'ID'; 
 
// Array of database columns which should be read and sent back to DataTables. 
// The `db` parameter represents the column name in the database.  
// The `dt` parameter represents the DataTables column identifier. 
$columns = array( 
    array( 'db' => 'FName',   'dt' => 0 ), 
    array( 'db' => 'LName',   'dt' => 1 ), 
    array( 'db' => 'Email',   'dt' => 2 ), 
    array( 'db' => 'Phone',   'dt' => 3 ), 
    array( 'db' => 'Address', 'dt' => 4 ), 
); 
 
// Include SQL query processing class 
require 'ssp.class.php'; 
 
// Output data as json format 
echo json_encode( 
    SSP::simple( $_GET, $dbDetails, $table, $primaryKey, $columns ) 
);