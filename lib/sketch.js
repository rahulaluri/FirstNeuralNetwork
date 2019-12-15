const len = 784;

const totalData = 1000;

let cats_data; 
let trains_data; 
let rainbows_data;


let cats={};
let trains = {};
let rainbows = {};
let CAT=0;
let TRAIN=1;
let RAINBOW=2;
let trainButton;
let testButton;
let nn;

let cats_training,trains_training,rainbows_training;
function preload(){
    cats_data=loadBytes('./data/cats1000.bin');
    trains_data=loadBytes('./data/trains1000.bin');
    rainbows_data=loadBytes('./data/rainbows1000.bin');
}

function setup(){
    createCanvas(280,280);
    background(255);

    prepareData(cats,cats_data,CAT);
    prepareData(trains,trains_data,TRAIN);
    prepareData(rainbows,rainbows_data,RAINBOW);

    nn= new NeuralNetwork(784,64,3);

    trainButton = select("#train");
    testButton = select("#test");    
    clearButton = select("#clear");
    guessButton = select("#guess");
    
      
    //pass on the inputs for training form the training set
    let training =[];
    training=training.concat(cats.training)    
    training=training.concat(trains.training)
    training=training.concat(rainbows.training)
    
    let testing=[];
    testing=testing.concat(cats.testing)    
    testing=testing.concat(trains.testing)
    testing=testing.concat(rainbows.testing)

   
    trainButton.mousePressed(()=>trainEpoch(training))
    testButton.mousePressed(()=> testAll(testing))
    clearButton.mousePressed(()=> background(255))
    guessButton.mousePressed(()=> 
    // Input from the drawing goes here!
    console.log("testing")
    )
    

    
}

//Draw a figure and check it's accuracy

function draw(){
    strokeWeight(8);
    stroke(0);
    if(mouseIsPressed){
    line(pmouseX, pmouseY, mouseX, mouseY);
}
}

