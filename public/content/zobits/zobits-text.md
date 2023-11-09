# Zobits

Completed May 2021

In collaboration with [Alyssa Lee](https://lassyla.github.io/#/) and Emily Zhou

Awarded the 2021 Henry Armero Award for Creative Inclusivity

## Overview

*Zobits* is a creative toy that invites players to iteratively assemble and tweak digital ecosystems. *Zobits* consists of a set of sixteen plastic figures representing different ecological niches, a magnetic pad with recepticles for four figures, and a ocompanion Android app on which the player's biomes develop. As players select and palce organisms in each of the recepticles, those organisms begin spawning within the phone app. Over the course of a couple days, the ecosystem develops and evolves, with balanced groupings of organisms thriving and unbalanced systems slowly dying off.

::youtube[Zobits overview video]{#o3RI0cMLVMs}

## Game Dynamics

`GAMEPLAY FLOWCHART??`

### Ecosystem Balance and Decay

*Zobits* employs slow game dynamics and delayed gratification in the context of an exploratory, generative toy. Players select ecosystem tetrads from among the sixteen organisms, snap their organisms onto the pad, and watch as their ecosystem develops over the course of a couple days. While many ecosystems will settle into some form of stasis, some might go through wild fluctuations in populations before reaching this point, and more still will simply slowly die out.

`INCLUDE EXAMPLES OF BALANCED AND UNBALANCED ECOSYSTEMS`

### Organisms

`SHOULD HAVE ORGANISM PHOTOS AND GIFS IN A TABLE`

## Development Process

### Electronics

`SHOULD INCLUDE DIAGRAM OF ELECTRONICS`

The earliest explorations of the toy's electronics began with the organism recognition mechanism. Initial ideas for organism recognition included NFC and acouple different visual recogition methods, but all of these approaches proved to be overly complicated for our relatively basic needs.

The approach I ended up carrying through to the final toy consisted of a series of surface pins wired to digital ports of the microcontroller and one pin wired to ground. As players place figures on the pad, magnets embedded in the organism and the pad align the pad pins with a mirrored set of pins in the organism's base. By wiring a subset of the organism's pins together, a unique collection of circuits can be closed between the pad's digital ports and the ground. This approach allows a unique binary id number to be physically encoded in each organism.

::youtube[Zobits electronics prototype]{#bBLuDVQ32Ig}

The pad communicates with the mobile app via Bluetooth. Rather than developing a custom protocol, the pad identifies itself as an HID device and sends keystrokes representing each organism. This saved both firmware development time and made it incredibly easy to spoof the pad when testing the phone software in absence of the pad.

`PUT THOSE PHOTOS OF THE ELECTRONICS HERE`

### Software

`SHOULD INCLUDE DIAGRAM OF SOFTWARE ARCHITECTURE`

1. organism behavior
   1. characteristics defined manually by us
   1. input and output levels tuned with genetic algorithm to maximize survival rate of ecosystems labelled as "good"
1. Mobile app
   1. built by alyssa not sure else to say

`ADD THAT EARLY ORGANISM STATS SPREADSHEET`

### Design

`Maybe emily has stuff I can skim off of?`

`GRAB EMILY'S EARLY RENDERS`