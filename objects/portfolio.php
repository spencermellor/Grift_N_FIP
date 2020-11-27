<?php

class Portfolio {
    private $conn;

    public $portfolio_items = 'tbl_portfolio_items';
    public $categories = 'tbl_categories';
    public $portfolio_category_linking  = 'tbl_portfolio_categories';

    public function __construct($db_connector) {
        $this->conn = $db_connector;
    }

    public function getPieces() {

        $query = 'SELECT portfolio_id, image_1, title, subtitle, description, link, link_title';
        $query .= ' FROM '.$this->portfolio_items;
        
        return $this->runQuery($query);
    }

    public function getPiecesByCategory($category) {

        $query = 'SELECT p.*, cat.category';
        $query .= ' FROM tbl_portfolio_items p';
        $query .= ' LEFT JOIN tbl_portfolio_categories link ON link.portfolio_id = p.portfolio_id';
        $query .= ' LEFT JOIN tbl_categories cat ON cat.category_id = link.category_id';
        $query .= ' WHERE cat.category LIKE "%'.$category.'%"';
        
        return $this->runQuery($query);

    }

    public function getList($list) {

        $query = 'SELECT * FROM '.$list;
        
        return $this->runQuery($query);

    }

    public function getPieceByID($id) {

        $query = 'SELECT port.*, cat.category';
        $query .= ' FROM '.$this->portfolio_items.' port';
        $query .= ' LEFT JOIN '.$this->portfolio_category_linking.' link ON link.portfolio_id = port.portfolio_id';
        $query .= ' LEFT JOIN '.$this->categories.' cat ON cat.category_id = link.category_id';
        $query .= ' WHERE port.portfolio_id = '.$id;
        $query .= ' GROUP BY cat.category';

        return $this->runQuery($query);

    }

    // Private function that runs query to database and returns the results
    private function runQuery($query_request) {

        $stmt = $this->conn->prepare($query_request);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
