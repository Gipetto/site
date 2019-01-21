---
layout: source
title: convertEPS.sh
article: /2006/01/02/bash_me_a_pdf/
---

{% highlight sh linenos %}
#! /bin/bash
# script to account for an odd error in GhostScript where the bounding box is 
# not always properly read and processed when converting
# -sDEVICE=bbox always reports the correct values
# works with gs 7.0.7 & 8.5, other versions not tested

# if script was invoked with no vars passed then exit with usage
if [ $# -eq 0 ]
then
	echo "";
	echo "Error: No filename supplied";
	echo "Usage: ./convertEPS.sh filename";
	echo "";
	exit 2;
fi

# if we get this far then we're good to proceed
# get bounding box parameters
BBSize=`gs -q -dBATCH -dNOPAUSE -sDEVICE=bbox $1 -c quit 2>&1`;

# assign height and width to new vars
height=$(echo $BBSize | awk '/%%BoundingBox:/ { print $5 }');
width=$(echo $BBSize | awk '/%%BoundingBox:/ { print $4 }');

# change the eps filename to a pdf filename
for f in $1; do newname="${f%.eps}".pdf; done

# convert the eps into a pdf
/usr/bin/gs -q -dSAFER -dBATCH -dNOPAUSE \
	-sDEVICE=pdfwrite \
	-sOutputFile=$newname \
	-dDEVICEWIDTHPOINTS=$width \
	-dDEVICEHEIGHTPOINTS=$height \
	-dPDFSETTINGS=/prepress \
	-sProcessColorModel=DeviceCMYK \
	-dEPSCrop $1

#exit
if [ -f $newname ] 
then
	# uncomment the next line if you want to delete
	# the original file
	#rm -f $1;
	
	# exit success
	echo $newname
	exit 0
else
	# exit failure
	exit 3
fi
{% endhighlight %}