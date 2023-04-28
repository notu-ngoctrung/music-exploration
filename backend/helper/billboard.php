<?php

require_once('cmd.php');

function get_top_100() {
    simple_cmd_execute('rm ../workspace/billboard.html');
    list($cmd_output, $return_code) = simple_cmd_execute(
        'wget -O ../workspace/billboard.html https://www.billboard.com/charts/hot-100/'
    );

    if ($return_code != 0) {
        return null;
    }

    // Load the webpage into a DOM document
    libxml_use_internal_errors(true);
    $url = "../workspace/billboard.html";
    $doc = new DOMDocument();
    $doc->loadHTMLFile($url);

    // Create an XPath object to navigate the document
    $xpath = new DOMXPath($doc);

    // Find all the song rows on the page
    $divs = $xpath->query('//div[@class="o-chart-results-list-row-container"]');

    // Loop through the rows and extract the song titles and artists

    $result = array();
    foreach ($divs as $row) {
        $title = trim($xpath->query('.//h3', $row)->item(0)->nodeValue, " \t\n\r\0\x0B");
        $artist = trim($xpath->query('./ul/li/ul/li/span', $row)->item(0)->nodeValue);
        array_push($result, array(
            'title' => $title,
            'singers' => $artist,
        ));
    }
    libxml_use_internal_errors(false);

    return $result;
}

?>