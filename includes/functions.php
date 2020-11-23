<?php


    include("connect.php"); 

    $query = "SELECT * FROM tbl_portfolio_items";

    $runQuery = $pdo->query($query);

    $result = array();

    while($row = $runQuery->fetchAll(PDO::FETCH_ASSOC)) {
        $result[] = $row;
    }

    //return $result;
    echo(json_encode($result));
    