<?php

class Database
{
    private $host = 'sqlite';
    private $file = 'assets.db';
    private $username = '';
    private $password = '';
    private $conn;

    public function getConnection()
    {
        $this->conn = null;

        try {
            $this->conn = new PDO("$this->host:$this->file", $this->username, $this->password);

            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $error) {
            echo "Erro de conexão: " . $error->getMessage();
        }

        return $this->conn;
    }
}
