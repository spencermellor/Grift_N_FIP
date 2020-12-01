<?php
// Created by Nate Grift

// // Include reCAPTCHA checkToken functionality
include('recaptcha.php');

// // Check reCAPTCHA token if not valid DO NOT PROCEED
if (!isset($_POST['token']) || !checkToken($_POST['token'])) {
    $results = ['Invalid reCAPTCHA response.  Please try again later'];
    $results['message'];
    echo json_encode($results);

} else {

    // Assign right headers for response
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json; charset=UTF-8');

    // Define oringinal variables
    // What will be returned to user
    $results = [];

    // Validated Visitor Info
    $visitor_name = '';
    $visitor_email = '';
    $visitor_message = '';

    // Invalid input array to add invalid inputs to
    $invalid_inputs = [];

    // Define email location - send to?
    $email_recipient = 'nategrift@gmail.com';

    // Assign validated inputs or
    if (isset($_POST['name']) && $_POST['name'] !== '') {
        $visitor_name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    } else {
        array_push($invalid_inputs, 'name');
    }

    if (isset($_POST['email']) && $_POST['email'] !== '') {
        $visitor_email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    } else {
        array_push($invalid_inputs, 'email');
    }
    if (isset($_POST['message']) && $_POST['message'] !== '') {
        $visitor_message = filter_var(htmlspecialchars($_POST['message']), FILTER_SANITIZE_STRING);
    } else {
        array_push($invalid_inputs, 'message');
    }

    // Define email variables
    // Subject comes from topic selection drop down
    $email_subject = sprintf('Portfolio Website - %s', $visitor_name);

    // Email message template
    $email_message_template = "
Email from:
%s

Reply to:
%s

Message:
%s
";

    // Put values into email template
    $email_message = sprintf($email_message_template, $visitor_name, $visitor_email, $visitor_message);


    // Email headers attributes

    // **** FOR PRODUCTION PURPOSES ****
    $email_headers_production = array(
    'From'=>'noreply@nategrift.com',
    'Reply-To'=>$visitor_email,
);

    // **** ONLY FOR DEVELOPMENT ****
    $email_headers_development = array(
        'From'=>$visitor_email
);


    // Send email if successful
    if (empty($invalid_inputs)) {

        $email_result = mail($email_recipient, $email_subject, $email_message, $email_headers_production);


        // If email sent, then respond with message
        if ($email_result) {
            $results['sentStatus'] = true;
            $results['message'] = sprintf('Thank you for contacting us, %s.  You will get a reply within 48 hours.', $visitor_name);
        } else {
            $results['sentStatus'] = false;
            $results['message'] = 'Error sending message. Please try again later.';
        }

    } else {
        // Invalid input respond with invalid inputs
        $results['sentStatus'] = false;
        $invalid_inputs_joined = implode(", ", $invalid_inputs);
        $results['message'] = sprintf("Invalid Input.  Please fill out the following with valid inputs: %s", $invalid_inputs_joined);
    }

    // Send JSON response
    echo json_encode($results);
}