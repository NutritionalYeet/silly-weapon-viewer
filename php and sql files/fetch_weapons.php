<?php
/*
*Audrey Victor
*/
$conn = new mysqli('localhost', 'root', '', 'DesEngine');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT * FROM weapons ORDER BY name LIMIT 100");
$weapons = [];
while ($row = $result->fetch_assoc()) {
    $weapons[] = $row;
}
echo json_encode(["weapons" => $weapons]);
$conn->close();
?>
