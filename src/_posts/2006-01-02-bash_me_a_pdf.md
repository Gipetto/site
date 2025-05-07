---
id: 148
title: Bash me a PDF
date: 2006-01-02T21:19:00+00:00
layout: post.liquid
guid: http://top-frog.com/?p=148
permalink: /2006/01/02/bash_me_a_pdf/
categories:
  - 'Web Design & Development'
tags:
  - bash
  - boundingbox
  - crop
  - customize
  - eps
  - ghostscript
  - osx
  - pdf
  - pdflib
  - ps2pdf
  - pstill
---
**UPDATE:** Being a linux n00b I didn't think that even though Ghostscript 7.07 can support everything I've done here it doesn't mean that its been compiled with everything needed to do the job right. My test server at work and my production server both run GS 7.07 but the production server is lacking the EPS Crop support – so I get nothing… While this script works well on OSX and a custom built linux box I can't guarantee that my production servers, which are not owned or managed by me, are set up correctly. So I'm resorting to purchasing a license for PStill. Bah! I was so close too.

#### Now, on with the original story:

Let me start this off by saying what I know about bash scripting can be written on the head of a pin in 24pt type.

I'm building a customizeable PDF system at work where our vendors can add their logos to our datasheets and use them for marketing our services that they resell.

Of course I want the end result to be the best it can be so naturally I want the user to be able to upload EPS files for placement. The problem with that is [PDFlib](http://www.pdflib.com), the library I'm using to composite the PDF templates and user data, does not accept EPS files as input. I need to convert EPS files to PDF for import.

At first I questioned this policy, now I know why PDFlib doesn't accept EPS files. They're a pain in the ass.



EPS files contain a `BoundingBox` parameter that defines just the area that is occupied by the graphic data. However for reasons unknown to me that bounding box data is not always interpreted correctly and I could not figure out just how to get it to be recognized.

Between trying to get a Bash script written correctly and trying to figure out how to get [GhostScript](http://www.cs.wisc.edu/~ghost/) to do what I want I was ready to bash my head into a pulp with the first available blunt object. (yes, every pun intended)

So, in case anybody needs to do this in the future here is what to do and why:

#### The Problem

I still don't know why but on some EPS files a conversion to PDF using GhostScript would place the artwork from the EPS on an 8.5" x 11" canvas. For some reason the Bounding Box data in the file was not being read and the graphic was being placed where it normally sits when opened in a Vector Illustration program (like Illustrator or Freehand). The problem with this is that when the resulting PDF was imported into another PDF via PDFlib the entire 8.5" x 11" canvas was seen as a graphic – there was no crop box to guide the import.

#### The Solution…

Wasn't easy to figure out. GhostScript has got to have one of the most complete and thorough documentation that tells you nothing! Despite having documentation going back several versions the documentation tells you all about the program without telling you how to use it. At least, that's how I found it…

Anyway, after searching the GhostScript documentation and many online groups I actually stumbled across the solution.

Its recommended in the documentation to use `-dEPSCrop` to cut an EPS file down to its bounding box. However on the problem files this leaves the file in the lower left hand corner of the document. I couldn't find mention of this problem by anyone else anywhere anywhere. Kinda made me feel alone.

My next thought was to try a custom page size. Using `-dDEVICEWIDTHPOINTS` and `-dDEVICEHEIGHTPOINTS` I could define a custom page size. My final GhostScript command looked like this:

``` sh
/usr/bin/gs -q -dSAFER -dBATCH -dNOPAUSE -sDEVICE=pdfwrite \
  -sOutputFile=$newname -dDEVICEWIDTHPOINTS=$width \
  -dDEVICEHEIGHTPOINTS=$height -dPDFSETTINGS=/prepress \
  -sProcessColorModel=DeviceCMYK -dEPSCrop $1
```

#### How the hell do I get that in there?

For my next trick I needed to get the bounding box information from a script output into the command above so that `$height` and `$width` correctly corresponded to the bounding box information I pulled from the file. I had to learn some Bash voodoo.

So what did I do? I stole some code…

Querying the bounding box info was easy

``` sh
gs -q -dBATCH -dNOPAUSE -sDEVICE=bbox $1
```

That returns the `BoundingBox` info and the `HiResBoundingBox` info. I had to pipe the results to a variable and then parse that variable to assign the appropriate values to variables. Ended up with this:

``` sh
# get bounding box parameters
BBSize=`gs -q -dBATCH -dNOPAUSE -sDEVICE=bbox $1 -c quit 2>&1`;

# assign height and width to new vars
height=$(echo $BBSize | awk '/%%BoundingBox:/ { print $5 }');
width=$(echo $BBSize | awk '/%%BoundingBox:/ { print $4 }');
```

Setting bbox as the device for GhostScript returns the bounding box values. Using `2>&1` at the end of that command takes what is normally sent to stderr and redirects it to the standard output so it can be assigned to a variable. The key to getting that data into a variable are the backticks surrounding the command. 

There is another method of assigning the output of a command to a variable and I actually used that on the next section with the `$( … )` portion. I piped the echo to awk to grab just the portions that I need.

#### Its all in a name

I designed the script to be passed a filename so that it can process that file. I needed to change the file extension on that name so I could give it to GhostScript as a name for my new file. I had to look around for help on this one and got this:

``` sh 
for f in $1; do 
  newname="${f%.eps}".pdf; 
done
```

#### Put it all together and Voila

All together that makes a handy little script for converting EPS files into PDF files with GhostScript as far back as 7.0.7. It may go back even further but I didn't test older systems since I don't need to go back any further than 7.0.7 and I think just about any host out there has at least 7.0.7.

You can view the entire script [here](/script_src/convertEPS.sh.html). I'd be happy to hear any comments or improvements (though it is a simple script). One thing to be aware of for use on Mac OS X – it looks like GhostScript has been modified a bit on OS X, so be sure to test on the target system before putting it into production. I mostly noticed differences in `ps2pdf` and the like. Not only in reliability but in color accuracy as well. OS X worked better than the other Unix variants and that could be since it was integrated into the OS X printing system and benefits a bit from that integration.
