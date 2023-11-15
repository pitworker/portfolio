# Zobits

Completed May 2021

In collaboration with [Alyssa Lee](https://lassyla.github.io/#/) and Emily Zhou

Awarded the 2021 Henry Armero Award for Creative Inclusivity

## Overview

*Zobits* is a creative toy that invites players to iteratively assemble and tweak digital ecosystems. *Zobits* consists of a set of sixteen plastic figures representing different ecological niches, a magnetic pad with recepticles for four figures, and a ocompanion Android app on which the player's biomes develop. As players select and palce organisms in each of the recepticles, those organisms begin spawning within the phone app. Over the course of a couple days, the ecosystem develops and evolves, with balanced groupings of organisms thriving and unbalanced systems slowly dying off.

::youtube[Zobits overview video]{#o3RI0cMLVMs}

## Game Dynamics

### Ecosystem Balance and Decay

*Zobits* employs slow game dynamics and delayed gratification in the context of an exploratory, generative toy. Players select ecosystem tetrads from among the sixteen organisms, snap their organisms onto the pad, and watch as their ecosystem develops over the course of a couple days. While many ecosystems will settle into some form of stasis, some might go through wild fluctuations in populations before reaching this point, and more still will simply slowly die out.

### Organisms

| ID | Organism | Sprite | Description |
| -- | -------- | ------ | ----------- |
| `0x0`  | Large Carnivore | ![large carnivore](/content/zobits/images/carnivoreA.gif "large carnivore") | The *large carnivore* is the apex predator. An opportunistic hunter, it will eat nearly any animal it encounters. |
| `0x1` | Detritivore | ![detritivore](/content/zobits/images/detritivoreB.gif "detritivore") | The *detritivore* consumes dead and decaying matter. The organism's role in breaking down waste material is vital for ecosystem health. |
| `0x2` | Omnivore | ![omnivore](/content/zobits/images/omnivoreA.gif "omnivore") | The *omnivore* consumes both plants and animals. This organism helps keep the populations of smaller animals and many plants in check, while also being prey for larger carnivores. |
| `0x3` | Grazer | ![grazer](/content/zobits/images/grazerB.gif "grazer") | The *grazer* consumes grass, flowers, and other short plants. This organism controls the volume of underbrush and provides food for large predators. |
| `0x4` | Insect | ![insect](/content/zobits/images/insectA.gif "insect") | The *insect* is the smallest animal in the *Zobits* ecosystem. With their diet of nectar from flowering plants, these organisms play a vital role as pollinators. |
| `0x5` | Shroom | ![shroom](/content/zobits/images/shroomA.gif "shroom") | The *shroom* is the larger fungus in the *Zobits* ecosystem. This organism helps break down decaying matter. |
| `0x6` | Mold | ![mold](/content/zobits/images/moldB.gif "mold") | The *mold* is the smaller fungus in the *Zobits* ecosystem. This organism reproduces rapidly and can infect a number of the ecosystem's other species. |
| `0x7` | Tree | ![tree](/content/zobits/images/treeA.gif "tree") | The *tree* is the *Zobits* ecosystem's largest plant. These organisms have long lifespans and provide shelter, air, and food for many of the ecosystem's animals and fungi. |
| `0x8` | Flower | ![flower](/content/zobits/images/flowerA.gif "flower") | The *flower* is a short plant. Its pollen and nectar provide food for small herbivores and its buds and stems provide food for larger herbivores and omnivores. |
| `0x9` | Grass | ![grass](/content/zobits/images/grassC.gif "grass") | The *grass* fills out the Zobits ecosystem's underbrush. It is the grazer's primary food source. |
| `0xA` | Legume | ![legume](/content/zobits/images/legumeA.gif "legume") | The *legume* is a small plant that nourishes the soil it grows in. The roots of the legume introduces fertilizers to the soil that help other plants grow. |
| `0xB` | Vine | ![vine](/content/zobits/images/vineB.gif "vine") | The *vine* provides food for many herbivores, but its habit of growing on other plants can restrict their host plants' populations. |
| `0xC` | Lichen | ![lichen](/content/zobits/images/lichenA.gif "lichen") | The *lichen* is a composite of algaes and fungi that grows on stones and trees. These composites provide nutrients for the small animals that eat them. |
| `0xD` | Fern | ![fern](/content/zobits/images/fernB.gif "fern") | The *fern* is another short plant. Its leaves provide food for many herbivores. |
| `0xE` | Small Carnivore | ![Small Carnivore](/content/zobits/images/smallCarnivoreA.gif "Small Carnivore") | The *small carnivore* is a minor predator in the *Zobits* ecosystem. This organism keeps invertebrate populations in check, but it can also fall prey to larger omnivores and carnivores. |
| `0xF` | Mollusk | ![mollusk](/content/zobits/images/molluskA.gif "mollusk") | The *mollusk* is a small organism that eats plants and fungi. This organism is one of the few animals in the *Zobits* ecosystem that consumes mold. |

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