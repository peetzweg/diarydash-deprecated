#!/bin/bash

resolutions=(1080 640)

for var in "$@"
do
	for r in ${resolutions[*]}
	do
		echo $r
		convert $var -resize x$r ${var%%.jpg}_$r.jpg
	done
done


