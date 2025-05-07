---
layout: source
title: dbConnect.class.php
---

{% highlight php linenos %}
<?php
///////////////////////////////////////////
// Class to connect to a MySQL database
//
// Shawn Parker
// gipetto.dyndns.org
// scripts@topfroggraphics.com
//
// Distributed with no license or warranty.
//
// If you redistribute please do so with
// this statement included and with the
// usage suggestions at the bottom of
// this file intact.
//
// v.1.4 - 2006/03/06
//
// See bottom of file for usage suggestions
// and Changelog
//
///////////////////////////////////////////

///////////////////////////////////////////
// Class to connect to a MySQL database
//
// Usage suggestions. Please leave these
// instructions intact if you redistribute
// this file.
//
///////////////////////////////////////////
/*
I built this class with simplicity and robustness in mind.
I also wanted to include a couple of routines that I commonly use when
pulling information from a database. There are a ton of scripts out
there that do this but I wanted one built how I like to work. Hopefully
this serves you well.

Basic usage is just as with any other OOP script and db connection

    $db = &new dbConnect();
    $query = 'SELECT * FROM table';
    $db->queryDB($query);
    while($row = $db->fetchArray()) {
        echo 'data: '.$row[0];
    }
    $db->closeCon();

A brief outline of the call methods:

    $db->fetchArray()    // will return an array row with numbered keys
    $db->fetchAssoc()    // will return an array row with associative keys matching the table field names
    $db->fetchObject()    // will return an object with properties that correspond to the fetched row
    $db->affectedRows()    // will return the number of rows affected by UPDATE, INSERT, & DELETE query
    $db->numRows()        // will return the number of rows affected by SELECT query only
    $db->fetchID()        // will return the auto-incremented id number for the previous INSERT query

One of the things that I do almost exclusively with databse calls is to
drop the data directly into an array. So I included 2 functions to do this
automatically - one for associative arrays and one for a standard numbered array

    $db = &new dbConnect();
    $query = 'SELECT * FROM table';
    $db->queryDB($query);
    $array = $db->arrayAssoc();
    $db->closeCon();

This class allows for the use of mysql_real_escape_string through a simplified function. Suggested usage is
as follows if it is to be used alone:

    $query = sprintf("SELECT * FROM table WHERE email=%1 AND name=%2",
    $this->escapeData($email),
    $this->escapeData($name));

You can also have this class build the query for you and do the escaping string itself using the function
below. It is not mandatory but can save some typing on long queries.

    $base_query = "SELECT * FROM table WHERE email=%1 AND name=%2";
    $query = $db->buildQuery($base_query,$var1,$var2,etc...);

$array is now an associative array of the results of the database call ready
to be used elsewhre in your program. Returns NULL on zero results returned.
A brief outline of the array methods:

    $db->arrayAssoc()    // will return an associative array of the complete result set
    $db->arrayNum()        // will return a standard numbered array of the complete result set

Also included are standard methods for freeing the result and closing the connection.

    $db->freeResult()    // clears the result for reuse during multiple queries per connection
    $db->closeCon()        // closes the database connection. Not needed if connection is persistent

For finding out table information on the server there's a function to list all tables into an array

    $tables = $db->showTables();    // drops table list into an array

For testing purposes I include a method for querying the server version

    $sys = $db->getInfo();    // returns information about the MySQL environment

I also wanted the ability to temporarily override the settings in the
databases routine without having to set up another config file. I did this
by enabling you to pass an array to the object when instantiating it.

It is as simple as setting up an array of values. Below are the available
options. All are optional - you only need to include the settings you want to
override for this instantiation of the script.

    $settings = ('type' => 'write'          // default is read only, set this to enable write user/pass
        'persistent' => True                // default is non-persistent connection
        'host' => 'dbserver.domain.com',    // new database server address FQDN or IP address
        'username' => 'my_username',        // new read only username to use instead
        'password' => 'my_password',        // new read only password to use instead
        'write_username' => 'w_user',       // new read / write username to use instead
        'write_password' => 'w_pass',       // new read / write password to use instead
        'database' => 'my_dbname',          // new database to select
        'error_to' => 'me@domain.com',      // who to send error emails to
        'error_from' => 'sv@domain.com',    // who the error emails will be from
        'error_subject' => 'SQL ERROR',     // the subject line of the error message
        'show_all_errors' => True
    );

    $db = &new dbConnect($settings);

and so on...

The script contains an $allow_override value that can be set to false to
deny the ability to change settings at runtime. If you're in a shared environment
and need to further protect this file consider changing the ownership of the file (chown)
to the apache webserver user and revoke read privileges (chmod) all users except for the
apache webserver user or by putting the file into a directory that is only readable by the
apache webserver user.

The script has a built in error reporter that will send an email to the
you (or someone you designate) and show only a basic error to the user so
we don't give away any details about the config should an error occur. This
requires a functioning mail server running on the machine. Leave these settings blank
to disable email error reporting on this script.

You can hard code addresses or partial IP strings to match and show complete errors to
into the $display_error_to variable. The more specific you get the more you can fine tune it.
A partial IP will let an IP range see the error while a specific IP will limit to a specific
computer. An example of usage is:

    var $display_error_to = array('192.168','10.1.1.108');

The email routine sends plain text emails only and I have no plans on integrating
HTML formatting. Feel free to edit the email and error message to suit your needs.

Last, but not least, is a little routine that I use a lot which outputs a given array with <pre>
formatting. This is very useful for checking returned values without having to format any
actual HTML code. Example:

    $array = array('apple','orange' => array('fruit','peel'));
    $db->printPre($array);

will output

    Array (
        [0] => apple
        [orange] => Array (
            [0] => 'fruit'
            [1] => 'peel'
        }
    )

Future plans: I would like to include features in the future for creating new tables and doing
more advanced SQL operations.

I accept any and all comments and criticism on my scripts. Please feel free to email me with
any comments or concerns with this script even if its just to let me know that you found it
useful enough to include in your site.

CHANGELOG
- v.1.4 - 2006/03/06
    Updated to be a little more PHP 5 centric and still have PHP 4 backward
    compatability with true constructors and destructors
- v.1.3 - 2005/09-12
    Added routines ( escapeData, buildQuery ) for processing mysql_real_escape_string - better than using
    addslashes/stripslashes as the escaping is done by mySQL instead of PHP - more reliable as mySQL knows
    what it needs a little bit better than PHP does at it better accounts for character encodings.
- v.1.2 - 2005/06/24
    Fixed arrayAssoc & arrayNum to return NULL if query has 0 results
- v.1.1 - 2005/06/19
    First major release
 */
class dbConnect {
    /**
     * database server - FQDN or IP address
     */
    public $host = '';

    /**
     * default read-only username
     */
    public $username = '';

    /**
     * default read-only password
     */
    public $password = '';

    /**
     * default table
     */
    public $database = '';

    /**
     * set to username of write enabled user
     */
    public $write_username = '';

    /**
     * set to password of write enabled user
     */
    public $write_password = '';

    /**
     * set to True to default to persistent connections
     */
    public $persistent = false;

    /**
     * set default type to read only
     */
    public $type = 'read';

    /**
     * recipient of error emails
     */
    public $error_to = '';

    /**
     * who the error emails should be from
     */
    public $error_from = '';

    /**
     * subject line for error emails
     */
    public $error_subject = 'SQL ERROR';

    /**
     *  wether to show all PHP/SQL errors or not
     */
    public $show_all_errors = false;

    /**
     * defaults to allow override. Set to false to lock in the above values
     */
    public $allow_override = true;

    public $display_error_to = array('127.0.0.1');

    public $con;
    public $result;
    public $query;

    // php4 constructor simulator
    public function dbConnect($settings = array()) {
        if (phpversion('tidy') < 5) {
            $argcv = func_get_args();
            call_user_func_array(array(&$this, '__construct'), $argcv);
            register_shutdown_function(array(&$this), '__destruct');
        }
    }

    public function __construct($settings = array()) {
        if ($this->allow_override == true) {
            if (isset($settings['username']) && $settings['username'] != null) {
                $this->username = $settings['username'];
            }
            if (isset($settings['password']) && $settings['password'] != null) {
                $this->password = $settings['password'];
            }
            if (isset($settings['write_username']) && $settings['write_username'] != null) {
                $this->write_username = $settings['write_username'];
            }
            if (isset($settings['write_password']) && $settings['write_password'] != null) {
                $this->write_password = $settings['write_password'];
            }
            if (isset($settings['host']) && $settings['host'] != null) {
                $this->host = $settings['host'];
            }
            if (isset($settings['database']) && $settings['database'] != null) {
                $this->database = $settings['database'];
            }
            if (isset($settings['error_from']) && $settings['error_from'] != null) {
                $this->error_from = $settings['error_from'];
            }
            if (isset($settings['error_to']) && $settings['error_to'] != null) {
                $this->error_to = $settings['error_to'];
            }
            if (isset($settings['type']) && eregi('read|write', $settings['type'])) {
                $this->type = $settings['type'];
            }
            if (isset($settings['persistent']) && is_bool($settings['persistent'])) {
                $this->persistent = $settings['persistent'];
            }
            if (isset($settings['show_all_errors']) && is_bool($settings['show_all_errors'])) {
                $this->show_all_errors = $settings['show_all_errors'];
            }
        }

        $p = '<p><strong>';
        $cp = "</strong></p>\n";

        if ($this->username == null) {
            die($p . 'No Username defined' . $cp);
        }
        if ($this->host == null) {
            die($p . 'No database host defined' . $cp);
        }
        if ($this->password == null) {
            die($p . 'No database password provided' . $cp);
        }
        if ($this->database == null) {
            die($p . 'No database name provided' . $cp);
        }
        if ($this->type == 'write' && $this->write_username == null) {
            die($p . 'No write-enabled Username Defined' . $cp);
        }
        if ($this->type == 'write' && $this->write_password == null) {
            die($p . 'No write-enabled Password Defined' . $cp);
        }

        $this->hostConnect();
    }

    public function __destruct() {
        $this->closeCon();
    }

    public function hostConnect() {
        $ctype = ($this->persistent == true ? 'mysql_pconnect' : 'mysql_connect');

        if ($this->type == 'write') {
            $u = $this->write_username;
            $p = $this->write_password;
        } else {
            $u = $this->username;
            $p = $this->password;
        }

        $this->con = $ctype($this->host, $u, $p)
        or die($this->error('Connecting to host'));

        @mysql_select_db($this->database)
        or die($this->error('Database Select'));
    }

    public function escapeData($d) {
        if (get_magic_quotes_gpc()) {
            $d = stripslashes($d);
        }

        if (!is_numeric($d)) {
            $d = "'" . mysql_real_escape_string($d, $this->con) . "'";
        }

        return $d;
    }

    public function buildQuery($base) {
        $count = func_num_args();
        $args = func_get_args();

        for ($i = 1; $i < $count; $i++) {
            $base = str_replace('%' . $i, $this->escapeData($args[$i]), $base);
        }

        return $base;
    }

    public function queryDB($q) {
        $this->result = mysql_query($q, $this->con)
        or die($this->error('Querying database. Query was: ' . $q));
    }

    public function affectedRows() {
        return @mysql_affected_rows($this->con);
    }

    public function numRows() {
        return @mysql_num_rows($this->result);
    }

    public function fetchObject() {
        return @mysql_fetch_object($this->result, MYSQL_ASSOC);
    }

    public function fetchArray() {
        return @mysql_fetch_array($this->result, MYSQL_NUM);
    }

    public function fetchAssoc() {
        return @mysql_fetch_assoc($this->result);
    }

    public function fetchID() {
        return @mysql_insert_id($this->con);
    }

    public function arrayAssoc() {
        while ($row = $this->fetchAssoc()) {
            $array[] = $row;
        }
        return isset($array) ? $array : null;
    }

    public function arrayNum() {
        while ($row = $this->fetchArray()) {
            $array[] = $row;
        }
        return isset($array) ? $array : null;
    }

    public function getInfo() {
        $sys = 'MySQL Client Info: ' . @mysql_get_client_info() . "\n<br />" .
        'MySQL Server Info: ' . @mysql_get_server_info() . "\n<br />" .
        'MySQL Host Info: ' . @mysql_get_host_info() . "\n<br />";

        return $sys;
    }

    public function showTables() {
        $tableinfo = mysql_list_tables($this->database);

        while ($row = mysql_fetch_row($tableinfo)) {
            $array[] = $row[0];
        }
        return $array;
    }

    public function freeResult() {
        @mysql_free_result($this->result);
    }

    public function closeCon() {
        @mysql_close($this->con);
    }

    public function error($z) {
        if ($this->error_to != null) {
            $error_message = "Server: {$_SERVER['SERVER_NAME']}\n\n" .
            "Page: {$_SERVER['PHP_SELF']}\n\n" .
            "ON: {$z}\n\n" .
            "Error: " . mysql_error() . "\n\n";

            $default_subject = 'SQL Error Notification';

            $headers = (isset($this->error_from) && $this->error_from != null ? "From: " . $this->error_from : '');
            $subject = (isset($this->error_subject) && $this->error_subject != null ? $this->error_subject : $default_subject);

            @mail($this->error_to, $subject, $error_message, $headers);
        }

        foreach ($this->display_error_to as $ad) {
            if (eregi($ad, $_SERVER['REMOTE_ADDR'])) {
                $show_match = true;
            }
        }

        return '<p><strong>There was an error querying the database.' .
        ' We apologize for the inconvenience.' .
        //' The webmaster is being flogged as you read this.'.
        (isset($show_match) && $show_match == true || $this->show_all_errors == true ? '<br />Error: ' . mysql_error() : '') .
            '</strong></p>';
    }

    public function printPre($array) {
        echo '<pre>' . print_r($array, true) . '</pre>';
    }
}
{% endhighlight %}
