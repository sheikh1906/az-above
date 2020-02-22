// #!/usr/bin/perl
// #
// # Sample Perl script for use with JPL's Horizons web-based batch interface.
// # Written 2006-Mar-02 by Alan B. Chamberlin (JPL/Caltech)
// #
// # Use of this script is at your own risk.
// #
// use strict;
// use LWP::UserAgent;

// my @data = ();

// # Load the input batch file:
// while (<>)
// {
//   #
//   # Skip comments:
//   next if (/^ *!/);
//   #
//   # Strip off trailing line-endind:
//   chomp;
//   #
//   # Remove any spaces surrounding '=' for compactness:
//   s/ *= */=/;
//   #
//   # Escape special URL characters (there may be others required as well):
//   s/ /%20/g;
//   s/\&/%26/g;
//   s/;/%3B/g;
//   s/\?/%3F/g;
//   #
//   # Store the modified command:
//   push @data, $_;
// }

// # Assemble the URL:
// my $url = 'https://ssd.jpl.nasa.gov/';
// $url .= 'horizons_batch.cgi?batch=1&';
// $url .= join('&', @data);

// # Setup the HTTP objects.
// my $ua = new LWP::UserAgent;
// my $req = new HTTP::Request;

// # Send the URL:
// $req->method("GET");
// $req->url($url);
// my $res = $ua->request($req);
// die "$url\n" . $res->status_line . "\n" if ( $res->is_error );

// # Display the results:
// print $res->content;
