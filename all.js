class calculatorData{
    constructor(historicalRecord,currentInput){
        //把使用者輸入的內容傳到calculatorData空物件內並賦予屬性及值
        this.historicalRecord = historicalRecord;
        this.currentInput = currentInput;
        //有新增calculatorData物件 要回到預設狀態
        this.allClear();
    }
    //清除全部內容
    allClear(){
        this.currentInputText =""; 
        this.historicalRecordText ="";
        this.operation = undefined;
    }
    //從最後面為起始點一次刪除一個數字
    delete(){
        //轉成字串然後使用slice方法
        this.currentInputText = this.currentInputText.toString().slice(0, -1);
    }
    //新增數字內容
    addNumber(number){
        //避免輸入兩個以上的小數點 如果已經有小數點就不執行
        if (number === '.' && this.currentInputText.includes('.')){
            return;
        }
        //將傳入的number轉成字串避免直接以number型別來計算 
        this.currentInputText = this.currentInputText.toString() + number.toString();
    }
   
    chooseOperation(operation) {
        //如果目前沒有輸入任何數字不執行
        if (this.currentInputText === '') {
            return;
        }
        //如果之前有輸入數字 就執行計算
        if (this.historicalRecordText !== '') {
          this.compute();
        };
        this.operation = operation;
        //輸入完數字點擊"+-x/"會將已輸入的數字從目前輸入欄位中清空 數字會顯示在先前輸入的欄位中
        this.historicalRecordText = this.currentInputText;
        this.currentInputText = '';
      
      }
    
      compute() {
        //存放計算結果的變數
        let computedData
                     //把字串轉成數字
        const prev = parseFloat(this.historicalRecordText);
        const current = parseFloat(this.currentInputText);
        //如果沒有輸入數字內容就不執行
        if (isNaN(prev) || isNaN(current)) {
            return;
        }
        switch (this.operation) {
          //如果傳入的operation是+ 就執行加法
          case '+':
            computedData = prev + current
            break
          case '-':
            computedData = prev - current
            break
          case '*':
            computedData = prev * current
            break
          case '÷':
            computedData = prev / current
            break
          //如果都不是就中斷執行
          default:
            return
        }
        this.currentInputText = computedData;
        this.operation = undefined
        this.historicalRecordText = ''
      }

    //將運算結果顯示在畫面上
    showComputedResult(){
        this.currentInput.innerText = this.currentInputText;
        //如果有點擊計算的按鈕 按鈕內容(+-x/)也要被加到先前輸入欄位內
        if(this.operation != null){
            this.historicalRecord.innerText = `${this.historicalRecordText}${this.operation}`;
        } else {
            this.historicalRecord.innerText = '';
          }
    }
}

//將所有按鈕選取起來
const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-allClear]');
//將顯示欄位也選取起來
const historicalRecord = document.querySelector('[data-historical-record]');
const currentInput = document.querySelector('[data-current-input]');

//將建構出來的物件賦予到calculator變數上
 const calculator = new calculatorData(historicalRecord,currentInput);

//數字按鍵綁定點擊監聽事件
numberBtns.forEach( numBtn =>{
    numBtn.addEventListener('click', () =>{
         
        //點擊數字按鍵會將數字按鍵內的數字作為參數帶入
         calculator.addNumber(numBtn.innerText);
        //顯示運算結果
        calculator.showComputedResult();

    })
})

//運算按鈕綁監聽事件
operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      calculator.chooseOperation(btn.innerText);
      calculator.showComputedResult();
    })
  })

//等於按鈕綁點擊監聽事件
equalsBtn.addEventListener('click', btn => {
    calculator.compute();
    calculator.showComputedResult();
  })

//DEL按鈕綁點擊監聽事件
deleteBtn.addEventListener('click', ()=>{
    calculator.delete();
    calculator.showComputedResult();
})

//AC全部清除按鈕綁監聽事件
allClearBtn.addEventListener('click', button => {
    calculator.allClear();
    calculator.showComputedResult();
    currentInput.textContent = 0;
})
