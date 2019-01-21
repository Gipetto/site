---
layout: source
title: MimeTypes.class.php
article: /2005/03/04/making_life_easier_with_exec/
---

{% highlight php linenos %}
<?php
/**
 * Simple repository of common file mime types
 *
 * updated 2007-08-30
 *        added method for retrieval of single type
 *        added docx and xlsx types, added simple pdf group type
 */
class AP_File_MimeTypes {
    public $types;
    public $groups;

    /**
     * construct
     *
     * initialize our mime types and groups
     */
    public function __construct() {
        $this->types = array(
            'ai' => 'application/postscript',
            'aif' => 'audio/x-aiff',
            'aiff' => 'audio/x-aiff',
            'asf' => 'video/x-ms-asf',
            'asx' => 'video/x-ms-asx',
            'avi' => 'video/avi',
            'bin' => 'application/octet-stream',
            'bmp' => 'image/bmp',
            'bz' => 'application/x-bzip',
            'bz2' => 'application/x-bzip2',
            'crt' => 'application/x-x509-ca-cert',
            'css' => 'text/css',
            'csv' => 'text/plain',
            'doc' => 'application/msword',
            'docx' => 'application/msword',
            'dot' => 'application/msword',
            'dxf' => 'application/dxf',
            'eps' => 'application/postscript',
            'gif' => 'image/gif',
            'gz' => 'application/x-gzip',
            'gzip' => 'application/x-gzip',
            'htm' => 'text/html',
            'html' => 'text/html',
            'ico' => 'image/x-icon',
            'jpg' => 'image/jpeg',
            'jpe' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'js' => 'text/javascript',
            'm4a' => 'audio/mp4',
            'mov' => 'video/quicktime',
            'mp3' => 'audio/mpeg',
            'mp4' => 'video/mp4',
            'mpeg' => 'video/mpeg',
            'mpg' => 'video/mpeg',
            'pdf' => 'application/pdf',
            'php' => 'text/plain',
            'phps' => 'text/plain',
            'png' => 'image/png',
            'pot' => 'application/vnd.ms-powerpoint',
            'ppa' => 'application/vnd.ms-powerpoint',
            'pps' => 'application/vnd.ms-powerpoint',
            'ppt' => 'application/vnd.ms-powerpoint',
            'ps' => 'application/postscript',
            'qt' => 'video/quicktime',
            'ra' => 'audio/x-pn-realaudio',
            'ram' => 'audio/x-pn-realaudio',
            'rtf' => 'application/rtf',
            'shtml' => 'text/html',
            'sit' => 'application/x-stuffit',
            'swf' => 'application/x-shockwave-flash',
            'sql' => 'text/plain',
            'tar' => 'application/x-tar',
            'tgz' => 'application/x-compressed',
            'tif' => 'image/tiff',
            'tiff' => 'image/tiff',
            'txt' => 'text/plain',
            'wav' => 'audio/wav',
            'wma' => 'audio/x-ms-wma',
            'wmf' => 'windows/metafile',
            'wmv' => 'video/x-ms-wmv',
            'xls' => 'application/vnd.ms-excel',
            'xlsx' => 'application/vnd.ms-excel',
            'xlt' => 'application/vnd.ms-excel',
            'z' => 'application/x-compressed',
            'zip' => 'application/zip',
        );

        $groups['office'] = array('csv', 'doc', 'dot', 'pdf', 'pot', 'pps', 'ppt', 'rtf', 'txt', 'xls');
        $groups['image'] = array('ai', 'bmp', 'dxf', 'eps', 'gif', 'ico', 'jpg', 'jpe', 'jpeg', 'pdf', 'png', 'ps', 'swf', 'tif', 'tiff', 'wmf');
        $groups['compressed'] = array('bin', 'bz', 'bz2', 'gz', 'sit', 'tar', 'tgz', 'z', 'zip');
        $groups['video'] = array('asf', 'asx', 'avi', 'mov', 'mpg', 'mpeg', 'mp4', 'qt', 'ra', 'ram', 'swf', 'wmv');
        $groups['audio'] = array('mp3', 'm4a', 'ra', 'ram', 'wav', 'wma');
        $groups['web'] = array('css', 'gif', 'ico', 'jpg', 'jpeg', 'js', 'htm', 'html', 'pdf', 'php', 'phps', 'png', 'shtml', 'sql');
        $groups['pdf'] = array('pdf');

        $this->groups = $groups;
    }

    /**
     * Return array of mime types
     *
     * @param string/bool $group_type
     * @return array
     */
    public function getTypes($group_type = false)
    {
        if (!$group_type) {return $this->types;} else {
            if (array_key_exists($group_type, $this->groups)) {
                foreach ($this->types as $key => $mt) {
                    if (in_array($key, $this->groups[$group_type])) {
						$types[$key] = $mt;
					}
                }
                return $types;
            } else {
				return false;
			}
        }
    }

    /**
     * Return a single type
     *
     */
    public function getType($type) {
        if (array_key_exists($type, $this->groups)) {
			return $this->groups[$type];
		} else {
			return false;
		}
    }

    /**
     * Destruct
     *
     */
    public function __destruct() {
        unset($this->groups, $this->types);
    }

}
{% endhighlight %}