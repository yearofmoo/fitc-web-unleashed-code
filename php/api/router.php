<?php

$_SERVER["REQUEST_URI"]
$url = $_SERVER['REQUEST_METHOD'] . '-' . $_SERVER["REQUEST_URI"];
switch($url) {
  case 'get-/books':
    include __DIR__ . '/all.php';
  break;
  case 'post-books':
    include __DIR__ . '/create.php';
  break;
  case 'put-books':
    include __DIR__ . '/update.php';
  break;
}

?>
