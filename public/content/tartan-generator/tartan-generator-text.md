# Tartan Generator

Completed August 2022

## Description

*Tartan Generator* is a web app that generates symmetrical tartan plaids based on color palettes pulled from user-uploaded images. After a user uploads an image, raw pixel data is passed to a WebAssembly script (compiled from Rust) that uses K-Means clustering to find `k` dominant colors. The value of `k` is set by the user. These colors, and their relative proportions across the image are passed back to the main JavaScript process to draw the tartan.

[Try the app yourself!](https://pitworker.github.io/tartanGenerator/)

## Development
