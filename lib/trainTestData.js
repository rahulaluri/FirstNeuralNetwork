function trainEpoch(training) {
    shuffle(training, true);
    // console.log(training);
    // Train for one epoch
    for (let i = 0; i < training.length; i++) {
      let data = training[i];
      let inputs = Array.from(data).map((x) => x / 255);
      let label = training[i].label;
      let targets = [0, 0, 0];
      targets[label] = 1;
        //console.log(inputs);
      // console.log(targets);
      nn.train(inputs, targets);
    }
  }


  function testAll(testData) {
    let correct = 0;
     for (let i = 0; i < testData.length; i++) {

      let data = testData[i];
      let inputs = Array.from(data).map((x) => x / 255);
      let label = testData[i].label;
      let targets = [0, 0, 0];
      targets[label] = 1;
    
      let value = nn.feedForward(inputs);
      let m = Math.max(value[0],value[1],value[2])
      let classification = value.indexOf(m);
      if(classification===label){
          correct++;        
      }
    }
    let precentageCorrect = 100*(correct/testData.length)
    return console.log(precentageCorrect);
}