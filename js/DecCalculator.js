import { Calculator } from "./Calculator";

class DecCalculator extends Calculator{
    constructor(settings) {
        super(settings);
        console.log( this.getName() );
    }
    getName() {
        return `Hello I am ${this.name}`;
    }

    add(numberX, numberY) {
        let result = [0,0,0,0,0,0,0,0,0];
        for(let i = numberX.length - 1; i >= 0  ; i--) {
            let carryBit =  numberX[i] + numberY[i] + result[i];
            if( carryBit >= 10) {
                result[i] = carryBit % 10;
                result[i-1] += 1;
            } else {
                result[i] = carryBit;
            }
        }
        return result;
    }

    changeNumber(root) {
        let activeElement = root.find('.active');
        activeElement.text('');
        activeElement.attr( { 'onkeypress':"return (this.innerText.length <= 0)", 'contenteditable':"true"} );
        activeElement.trigger('focus');
    }

    updateResult() {
        let root =  this.$calculatorDOMElement;
        let $resultNumber = root.children(".group-number").children(".result-bit").find("span");
        for(let i=$resultNumber.length-1,j=0;i>=0;i--,j++)
            $($resultNumber[i]).text(this.resultNumberArray[j]);
    }

    initEvents() {
        super.initEvents();
        this.$calculatorDOMElement.find(".operator-bar").find('span').on('click', (event) => {
            let root =  this.$calculatorDOMElement;
            let activeElement = root.find('.active');
            activeElement.attr("contenteditable", 'false');
            this.checkNumber();
            this.updateResult();
        })
    }


}



export { DecCalculator  };
