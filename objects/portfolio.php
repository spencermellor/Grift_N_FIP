<?php

class Portfolio {
    private $conn;

    public $portfolio_items = 'tbl_portfolio_items';
    public $categories = 'tbl_categories';
    public $portfolio_category_linking  = 'tbl_portfolio_categories';

    public function __construct($db_connector) {
        $this->$conn = $db_connector;
    }

    public function getMovies() {

    }

    public function getMovieByCategory($category) {

    }

    public function getMovieByID($id) {
        
    }
}
