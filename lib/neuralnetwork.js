function sigmoid(x){
   return 1/(1+Math.exp(-x));
}

function dsigmoid(y){
  return  (y)*(1-y)
}

class NeuralNetwork {
    constructor(input_nodes,hidden_nodes,output_nodes){
        this.input_nodes=input_nodes
        this.hidden_nodes=hidden_nodes
        this.output_nodes=output_nodes 
        this.learning_rate=0.1

        this.weights_ih=new Matrix(this.hidden_nodes,this.input_nodes);
        this.weights_oh=new Matrix(this.output_nodes,this.hidden_nodes);
        this.bias_h = new Matrix(this.hidden_nodes,1);
        this.bias_o = new Matrix(this.output_nodes,1);

        this.weights_ih.randomize();
        this.weights_oh.randomize();
        this.bias_h.randomize();
        this.bias_o.randomize();

    }
    feedForward(inputs_array){
        let inputs = Matrix.fromArray(inputs_array);
        let hidden = Matrix.multiply(this.weights_ih,inputs);  
        hidden.add(this.bias_h);
        hidden.map(sigmoid);
        let output = Matrix.multiply(this.weights_oh,hidden);
        output.add(this.bias_o);
        output.map(sigmoid);

        return output.toArray();
    }

    train(inputs_array,targets_array){
        
        let inputs = Matrix.fromArray(inputs_array);
        let hidden = Matrix.multiply(this.weights_ih,inputs);   
        hidden.add(this.bias_h);
        hidden.map(sigmoid);

              
        let outputs = Matrix.multiply(this.weights_oh,hidden);
        outputs.add(this.bias_o);
        outputs.map(sigmoid);
      
       let targets = Matrix.fromArray(targets_array)
       let outputs_error  = Matrix.subtract(targets,outputs);
          
       let who_T = Matrix.transpose(this.weights_oh);
       let hidden_errors = Matrix.multiply(who_T,outputs_error);
     
       let gradients=Matrix.map(outputs,dsigmoid);
       gradients.multiply(outputs_error);
       gradients.multiply(this.learning_rate);
           

       let hidden_T=Matrix.transpose(hidden);
       let deltaWoh=Matrix.multiply(gradients,hidden_T);
       this.bias_o.add(gradients)
       
       this.weights_oh.add(deltaWoh);
      
        let hidden_gradient= Matrix.map(hidden,dsigmoid);
        hidden_gradient.multiply(hidden_errors);
        hidden_gradient.multiply(this.learning_rate);

        let inputs_T = Matrix.transpose(inputs);
        let deltaWih=  Matrix.multiply(hidden_gradient,inputs_T)

        this.weights_ih.add(deltaWih);
        this.bias_h.add(hidden_gradient);    

    }

}
