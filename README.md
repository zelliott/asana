# Asana Gallery Challenge
## Approach
### Part 1:

My first two insights were:

1. The height and width of each image do not matter individually, only the **ratio of height to width** will effect the algorithm.  In other words, a 100x50 and a 1000x500 image will be handled identically by `layoutFrames`.

2. From a UI standpoint, it makes sense to try to make the images as big as possible (given our constraints).  In other words, `layoutFrames` could technically scale all images down to fit on a single row, but then it would be difficult to view the images.

Given these two points, my implementation of `layoutFrames` works as follows:

1. Begin by building the first row of images.

2. Scale the image up to its maximum height (given the `maxRowHeight` constraint) and add it to the first row.

3. If there is horizontal space on this row for another image, repeat step 2 with the next image.

4. Continue adding images to this row until we are overflowing the width constraint.

5. Then, take all the images added to this row, and scale them down proportionally so that their combined width + padding equals the maximum width.

6. Repeat with the next row (until we have added all images).

Additionally, I decided to follow **test driven development** because it is nearly impossible to visually tell that the algorithm is working correctly.  There are too many small discrepancies/corner cases that might arise.  Run `npm test` to run the unit tests (be sure to `npm install` beforehand, although I added the node_modules folder) .

### Part 2:
I used SCSS for this project because, in my opinion, nesting makes CSS more readable and mixins/variables/extends are indispensable.  I usually organize my CSS as follows:

`base\` (layouting, typography)

`components\` (shared components such as controls, inputs, buttons, menus, etc)

`modules\` (variables, mixins, helper classes, functions)

`vendors\`

`views\` (one scss partial per view) 

`screen.scss`

`print.scss`

However, given the small scope of the challenge, I ended up placing all SCSS files in the same `sass` folder.

### Part 3:

I abstracted out picture adding into its own method, `fillImages`, so that you could quickly change images sources without having to re-run `layoutFrames` or completely create a new `Gallery`.  Why Bears, Bill Murrays and Nick Cages?  They were the only placeholder images that had the same URL pattern!
