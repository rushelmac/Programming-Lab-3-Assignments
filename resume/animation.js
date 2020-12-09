const TypeWriter = function(txtEle, words, wait = 3000) {
    this.txtEle = txtEle;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
};

//Type method
TypeWriter.prototype.type = function(){
    // Current index of words
    const current = this.wordIndex % this.words.length;
    // get full text of full word
    const fulltxt = this.words[current];

    // Check deleting

    if(this.isDeleting){
        // Remove char
        this.txt = fulltxt.substring(0, this.txt.length - 1);
    } else{
        // add char
        this.txt = fulltxt.substring(0, this.txt.length + 1);
    }

    // insrt tct into element
    this.txtEle.innerHTML = '<span class="txt">'+this.txt+'</span>';

    //Type speed
    let typeSpeed = 300;

    if(this.isDeleting){
        typeSpeed /=2;
    }

    // if word is complete
    if(!this.isDeleting && this.txt === fulltxt) {
        // Make a pause at end
        typeSpeed = this.wait;
        // set delete to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        // MOve to next word
        this.wordIndex++;
        // pause
        typeSpeed = 500;
    }

    setTimeout(()=> this.type(), typeSpeed);
};

document.addEventListener('DOMContentLoaded', init);

function init(){
    const txtEle = document.querySelector('.txt-type');
    const words = JSON.parse(txtEle.getAttribute('data-words'));
    const wait = txtEle.getAttribute('data-wait');

    new TypeWriter(txtEle, words, wait);
}

