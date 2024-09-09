# L1-1DV610
The source files for L1-1DV610 - The Terminal Editor (WIP)

## Branching Strategy
For this project I've decided to start lightly. I will only be working in the main branch.

## Concept
The concept is a small code editor. That supports some very simple syntax. The editor will allow users to initialize variables such as integers and strings.
Perform simple operations on integers such as add and subtract. As well as feature a print command to print to the console.

## Syntax
Each line must start with `<` and end with `>`.

### Variable names
Each variable declared must begin with a lowercase letter and may be followed by any number of upper case letters and numbers.

Example: `theName1`

### Declaring an integer
`<int age = 22>`

### Declaring a string
`<string name = "Name">` or `<string name = 'Name'>`

### Output to console.
To output to console use the following syntax: `<output([your operation])>`

Variables as well as new operations can be output to console. One larger example would be:

`<int age = 22>`

`<string name = "Simon">`

`<output(name + " is " + age)>`

´Output: Simon is 22´
