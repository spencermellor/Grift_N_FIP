<?php

class Database {
    private $host = 'localhost';
    private $db_name = 'db_portfolio';
    private $username = 'root';
    private $password = 'root';

    public $conn;

    public function getConnection() {
        $this->conn = null;

        $db_dsn = array(
            'host'=>$this->host,
            'dbname'=>$this->db_name,
            'charset'=>'utf8'
        );

        try {
            $dsn = 'mysql:'.http_build_query($db_dsn, '', ';');
            $this->conn = new PDO($dsn, $this->username, $this->password);
        } catch (PDOException $exception) {
            echo json_encode(
                array(
                    'error'=>'Database couldnt connect',
                    'message'=>$exception->getMessage()
                )
            );
            exit;
        }

        return $this->conn;
    }
}