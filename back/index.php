<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

include './db.php';

function formatData($data)
{
    htmlspecialchars($data);
    trim($data);
    return $data;
}

$db = new Database();
$conn = $db->getConnection();

try {
    if (isset($_REQUEST['action'])) {
        $action = $_REQUEST['action'];

        if ($action === 'search') {
            if (isset($_REQUEST['model'])) {
                $model = formatData($_REQUEST['model']);

                $sql = "SELECT * FROM assets WHERE model LIKE :model";
                $stmt = $conn->prepare($sql);
                $stmt->execute([
                    ':model' => "%$model%"
                ]);

                header('Content-Type: application/json');

                $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
                die(json_encode($response));
            }

            if (isset($_REQUEST['category'])) {
                $category = formatData($_REQUEST['category']);

                $sql = "SELECT * FROM assets WHERE category LIKE :category";
                $stmt = $conn->prepare($sql);
                $stmt->execute([
                    ':category' => "%$category%"
                ]);

                header('Content-Type: application/json');

                $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
                die(json_encode($response));
            }

            $sql = "SELECT * FROM assets";
            $stmt = $conn->prepare($sql);
            $stmt->execute();

            header('Content-Type: application/json');

            $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
            die(json_encode($response));
        }

        if ($action === 'register') {
            $json = file_get_contents('php://input'); //    Ler a requisição em JSON
            $data = json_decode($json, true);   //  Transforma o JSON em um Array Associativo
            
            $model = formatData($data['model']);
            $manufacturer = formatData($data['manufacturer']);
            $category = formatData($data['category']);
            $note = formatData($data['note']);

            $sql = "INSERT INTO assets(model, manufacturer, category, note) VALUES(:model, :manufacturer, :category, :note)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([
                ':model' => $model,
                ':manufacturer' => $manufacturer,
                ':category' => $category,
                ':note' => $note
            ]);

            die(json_encode([
                'model' => $model,
                'manufacturer' => $manufacturer,
                'category' => $category,
                'note' => $note
            ]));
        }

        if ($action === 'update/:id') {
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);
            
            $id = formatData($data['id']);
            $model = formatData($data['model']);
            $manufacturer = formatData($data['manufacturer']);
            $category = formatData($data['category']);
            $note = formatData($data['note']);

            $sql = "UPDATE assets SET model = :model, manufacturer = :manufacturer, category = :category, note = :note WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->execute([
                ':id' => $id,
                ':model' => $model,
                ':manufacturer' => $manufacturer,
                ':category' => $category,
                ':note' => $note
            ]);

            die(json_encode(['success' => true]));
        }

        if ($action === 'delete/:id') {
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);
            
            $id = $data['id'];
            
            $sql = "DELETE FROM assets WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->execute([
                ':id' => $id,
            ]);

            die(json_encode(['success' => true]));
        }
    }
} catch (PDOException $error) {
    echo "Erro: " . $error->getMessage();
}
