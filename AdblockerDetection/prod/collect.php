<?php
//@see https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
header('Content-Type: image/png');
echo base64_decode('R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs');

if (isset($_GET['tid'])) {
    $tid = $_GET['tid'];
} else {
  die();
}
if (isset($_GET['ec'])) {
    $ec = $_GET['ec'];
} else {
    $ec = 'Blocking';
}
if (isset($_GET['ea'])) {
    $ea = $_GET['ea'];
} else {
    $ea = 'Something';
}
if (isset($_GET['ua'])) {
    $ua = $_GET['ua'];
} else {
    $ea = '';
}
if (isset($_GET['cid'])) {
    $cid = $_GET['cid'];
} else {
    $cid = 'NotWorking';
}
if (isset($_GET['ua'])) {
    $ua = $_GET['ua'];
} else {
    $cid = '';
}
if (isset($_GET['dp'])) {
    $ua = $_GET['dp'];
} else {
    $dp = '';
}

$params = array(
    'v' => 1,
    'tid' => $tid, //Tracking ID
    'cid' => $cid, //Client ID
//'cid' => rand(1000000,9999999),
    't' => 'event', //Type of Interaction
    'ec' => $ec, //Event Tracking
    'ea' => $ea, //Event Action
    'aip' => 1, //Anonymize IP
    'ni' => 1, //Non-Interaction Hit
    'ua' => $ua, //User Agent
    'dp' => $dp, //Document Path
    'z' => rand(1000000, 9999999) //Cache Buster
);

$url = 'https://www.google-analytics.com/collect';
$content = utf8_encode(http_build_query($params));

$user_agent = '';

$ch = curl_init();
curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/x-www-form-urlencoded'));
curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
curl_exec($ch);
curl_close($ch);
?>