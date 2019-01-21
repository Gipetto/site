---
layout: source
title: Upload.class.php
article: /2006/12/22/classes_for_file_uploading_in_php/
---

{% highlight php linenos %}
<?php
/**
 * Basic file uploader
 *
 * @example
 *    $ul = new AP_File_Uploader();
 *    $upload_location = $ul->save_file($_FILES['myfile'],$destination,'my_new_file.jpg');
 *    if(!upload_location) {
 *        ... handle error ...
 *        $error = $ul->get_error();
 *    }
 *
 * @uses AP_File_MimeTypes
 *
 */
class AP_File_Upload {
    /**
     * list of acceptable file types
     *
     * @var array
     */
    public $accept;

    /**
     * file destination
     *
     * @var string - server path
     */
    public $destination;

    /**
     * Error string
     * If anything goes wrong this will give the reason
     *
     * @var string
     */
    private $_error;

    /**
     * constuct
     *
     * @param string $destination
     * @param array $accept
     */
    public function __construct($accept = false) {
        if (is_array($accept)) {$this->accept = $accept;} else {
            if (class_exists('AP_File_MimeTypes')) {
                $mt = new AP_File_MimeTypes();
                $this->accept = $mt->getTypes();
                unset($mt);
            } else {
                throw new Exception('Mime type class not defined');
            }
        }
    }

    /**
     * Check file type
     *
     * @param string $file
     * @return bool
     */
    public function check_type($file) {
        // get file type
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);

        // make sure the image is a valid file type and that they type matches the extention
        if (!array_key_exists($ext, $this->accept)) {
            $this->_error = 'invalid file type';
            return false;
        } elseif ($this->accept[$ext] != $file['type']) {
            $this->_error = 'file type does not match file extention';
            return false;
        } else {
            return true;
        }
    }

    /**
     * Make sure uploaded file exists
     *
     * @param string $path
     * @return bool
     */
    public function check_temp($path) {
        if (is_file($path) && is_uploaded_file($path)) {return true;} else {
            $this->_error = 'could not find uploaded file';
            return false;
        }
    }

    /**
     * Return the error string
     *
     * @return string
     */
    public function get_error() {
        return $this->_error;
    }

    /**
     * Save uploaded file
     *
     * $file = $_FILE['upload_name'];
     *
     * @param array $file - POST $_FILES array for file
     * @param string $destination - where to save the file
     * @param bool/string $new_name - false or what to rename the file
     * @return bool/string - false or location of uploaded file
     */
    public function save($file, $destination, $new_name = false) {
        switch ($file['error']) {
            case 0:
                // process destination
                if (is_dir($destination)) {
                    if (is_writable($destination)) {
                        $this->destination = $destination;
                    } else {
                        throw new Exception('Destination is not writable - check directory permissions.');
                    }
                } else {
                    throw new Exception('Provided directory for file upload is not valid');
                }

                // make sure a file was uploaded
                if ($this->check_temp($file['tmp_name']) && $this->check_type($file)) {
                    // use original file name if a new one is not supplied, replace spaces with underscores
                    if (!$new_name) {
                        $new_name = str_replace(' ', '_', $file['name']);
                    }

                    // build full file path for move
                    $uploadfile = $destination . $new_name;

                    // if we're looking at an uploaded file and the file
                    // can be moved then we're OK
                    if (!move_uploaded_file($file['tmp_name'], $uploadfile)) {
                        $this->_error = 'Could not move uploaded file - flog the webmaster';
                        return false;
                    } else {
                        // change permissions on the file
                        if (chmod($uploadfile, 0755)) {
                            return $uploadfile;
                        } else {
                            $this->_error = 'Could not change permissions on uploaded file. ' .
                                'Please contact the system administrator';
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            case 1:
            case 2:
                $this->_error = 'Your file was too large. Please edit your file or upload a different file.';
                return false;
            case 3:
                $this->_error = 'File upload incomplete - Please retry your upload';
                return false;
            case 4:
                $this->_error = 'No file uploaded. Please select a file to upload';
                return false;
            case 6:
                $this->_error = 'No temp folder on server - whack the server admin';
                return false;
            case 7:
                $this->_error = 'Failed to write to disk';
                return false;
            default:
                $this->_error = 'Unknown error occured';
                return false;
        }
    }
}
{% endhighlight %}