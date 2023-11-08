# Tartan Generator

Completed August 2022

## Description

*Tartan Generator* is a web app that generates symmetrical tartan plaids based on color palettes pulled from user-uploaded images. After a user uploads an image, raw pixel data is passed to a WebAssembly script (compiled from Rust) that uses K-Means clustering to find `k` dominant colors. The value of `k` is set by the user. These colors, and their relative proportions across the image are passed back to the main JavaScript process to draw the tartan.

`SCREENSHOT OF THE INTERFACE GOES HERE`

[Try the app yourself!](https://pitworker.github.io/tartanGenerator/)

## Development

This project began in the Spring of 2021 after I'd followed an internet rabbit-hole to reading the entire Wikipedia page on Tartan cloth. Interested in generating representations of these patterns digitally, I started drawing twill-like patterns using p5.js.

`IMAGE OF DIGITAL TARTAN GOES HERE`

I was interested in automating this process a little more, so I looked to scraping images for color palettes. My original method to scrape colors consisted of simply grabbing the 5 most frequent colors in the image (at this point I enforced a constant color count). While this method generally worked for images with limited color spaces, it stumbled on images with high color variations, with some high-resolution photographs only containing a handful of pixels of the same color.

`IMAGES OF FIRST VERSION OF UI GO HERE`

Other projects soon stole my attention, causing this one to get shelved in its rudimentary state for over a year. In the summer of 2022, though, I was eagerly learning Rust and unshelved the *Tartan Generator* as an excuse to use the language in a real project.

My first task was to address my mediocre color picking algorithm, which I addressed by shifting to a K-Means algorithm. While this method can sometimes return somewhat washed-out results on complicated photos with lots of colors, in the vast majority of cases, the method produces far more reliable and generally better looking results compared to the original approach.

`IMAGE COMPARING K-MEANS TO SWAN'S SHITTY APPROACH (TM)`

After fixing the algorithm with my new WebAssembly K-Means color picking script, I revised the interface to hand control over the tartan's color count to the user and to make some visual tweaks. I then built and published the project to my GitHub pages URL.

`IMAGE COMPARING NEW INTERFACE TO OLD ONE`

The source code for this project can be found [here.](https://github.com/pitworker/tartanGenerator)