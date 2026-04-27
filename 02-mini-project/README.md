# Mini Project — Flappy Bird

### Concept
Recreated the Flappy Bird game using codings learned from week 1 to 5.
Bird and Pipes are classes with their own properties and methods. 

### Features
- Collision detection using `dist()`
- Score tracking and game-over states
- Background music and flying sound effect
- Player controls via space bar

### How to play
- Press space bar to make the bird fly
- Space bar can be pressed continuously
- Make the bird fly through the pipes without contacts 
- The score adds one after passing through one pipe
- Game over immediately after touching the pipe -- final score will be shown at the top center of the screen

### Screenshots
![image01](mini-project/documentation/Mini%20project_image01.jpg)
![image02](mini-project/documentation/Mini%20project_image02.jpg)

### Progress
[video01](<https://drive.google.com/file/d/1hxrBj7Stm2YEGQlZSmoQ4eDTnQEN-OPi/view?usp=drive_link>)

[video02](<https://drive.google.com/file/d/12IN8TQBVjrSdtERz_DtX3iPH5EVX90CS/view?usp=drive_link>)

[video03](<https://drive.google.com/file/d/1NeYOcOEVZOsfWDyIsRF6uWfwXiAhNw_b/view?usp=drive_link>)

### Demo Video
[flappy bird](<https://drive.google.com/file/d/1kq97zmts_tCgxfPY5EJ7eQKZ_5icGTJY/view?usp=drive_link>)

### Reflection
This project is bringing together all the concepts learned in the precvious classes. It helped me to get a better idea of where to create the arrays, make actions, and call the functions. At first, it was quite difficult to write out the correct codes to perform the right actions. However, everything turned out to make more sense as I progressed, and I was able to gradually find a pattern for coding. For instance, after I suceeded in creating a "game over" after detecting collision, it became easier to write the scoring system. 

A problem I noticed during this project is that I often could understand the logic of the code when seeing someone else writes it, but tend to get stuck when I write my own. I assume this is also caused my lack of practice, which then caused me to forget the necessary coding structure. Examples include forgetting that the codes run in order, so it is important to write codes for outer layers last. Another example is almost always forgtting to call the functions of the class within the draw section. 

Additionally, I often get confused of where to place certain codes. Although this project gave me a better idea of the locations of codes, I still encounter errors frequently. Problems especially appears when I tried to add interactive elements such as pressing the mouse and keys. At last, I was able to find answers or rules such as not to put functions within classes, the difference in result between functions and if statements, and more.

Overall, as I was coding, new questions constantly appeared. Nevertheless, the process of finding the answers helped me to remember and to better understand the codes. 