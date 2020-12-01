<?php

function checkToken($token) {

    // **** Check google ReCaptcha ****
    // Url and Secret key for website
    $googleReCaptchaSecretKey = '6LcFkPEZAAAAAJdgxEVHySHbHu1ha15VulPjgQ6N';
    $googleReCaptchaURL = 'https://www.google.com/recaptcha/api/siteverify';

    // Set values for google verify request
    $values = array('secret' => $googleReCaptchaSecretKey, 'response' => $token);

    // Create request header
    $request_googleReCaptcha = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'content' => http_build_query($values),
            'method'  => 'POST'
        )
    );

    // Send request to Google reCAPTCHA api
    $stream_context = stream_context_create($request_googleReCaptcha);
    $result_googleReCaptcha = file_get_contents($googleReCaptchaURL, false, $stream_context);


    $result = json_decode($result_googleReCaptcha, TRUE);

    // return either true or false.
    if ($result === FALSE || $result['score'] < 0.5) {
        return FALSE;
    } else {
        return TRUE;
    }
}
