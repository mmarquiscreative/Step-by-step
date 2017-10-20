var dataController = (function(){
    
//// Variables ////
    var counters = {
        curStep: 0,
        stepLimit: -1
    }
    
//// Functions ////
    function updateCurStep(keyString){
        if (keyString === 'next' && counters.stepLimit > counters.curStep){
        counters.curStep += 1;            
        } else if (keyString === 'last' && counters.curStep > 0){
            counters.curStep -= 1
        } else if (keyString === 'reset'){
            counters.curStep = 0;
        } else {
            console.log('could not complete updateCurStep. curStep is currently: ' + counters.curStep)
        };
    };
   
    function updateStepLimit(someNumLimit){
        counters.stepLimit = someNumLimit;
    }

//// RETURN ////
    return {
        dataCheck: 'dataCheck',
        counters: counters,
        updateCurStep: updateCurStep,
        updateStepLimit: updateStepLimit
    };
    
})();

var UIController = (function(){
var HTMLStrings;
//// Variables ////
HTMLStrings = {
    ids: {
        stepContent: '#stepContent',
        interactBox: '#interactBox',
        courseStart: '#courseStart',
        lastStep: '#lastStep',
        home: '#home',
        nextStep: '#nextStep',
        stepNum: '#stepNum',
        navBtns: '#navBtns'
    },
    classes: {
        hidden: 'hidden'
    },
    splitChar: '__'
};
//// Functions ////
    function listToArray(nodeList){
        var tempList, newArray;
        tempList = nodeList;
        newArray = [];
        console.log(newArray);
        
        for (i = 0; i < nodeList.length; i++){
            newArray[i] = nodeList[i];
        };
        return newArray;
    };
    
    function addHidden(someID){
      var tempList = listToArray(document.querySelector(someID).children);
        for (i = 0; i < tempList.length; i ++){
            tempList[i].className = HTMLStrings.classes.hidden;
        }
    };
    function hideAll(){
        // 1. hide all step content
        addHidden(HTMLStrings.ids.stepContent);
        // 2. hide all quiz content
         addHidden(HTMLStrings.ids.interactBox);
    };
    
    function hideAllBtns(){
        // 1. hide all step content
        addHidden(HTMLStrings.ids.navBtns);
        
        
    };
    
    function countSteps(){
        var tempList = document.querySelector(HTMLStrings.ids.stepContent).children;
       var stepArray = listToArray(tempList);
        var tempLimit = stepArray.length - 1;                        
        return tempLimit;                           
    }
    
    function updateStepUI(tempNum, limitNum){
        document.querySelector(HTMLStrings.ids.stepNum).firstChild.textContent = ('Step ' + tempNum + ' of ' + limitNum);
    };
    
    function revealContent(targetID, stepNum){
        var tempArray = listToArray(document.querySelector(targetID).children);
        
        tempArray.forEach(function(cur){
           var splitArray; splitArray = cur.id.split('__');
            
           console.log(splitArray[1] + ' vs ' + stepNum); if(parseInt(splitArray[1]) === stepNum){
                cur.className = '';
            } else {
                console.log('reveal content doesnt fit for ' + cur.id);
            };
            
        });
    };
    
    
//// RETURN ////    
    return {
       UICheck: 'UICheck',
        hideAll: hideAll,
        listToArray: listToArray,
        revealContent: revealContent,
        HTMLStrings: HTMLStrings,
        countSteps: countSteps,
        updateStepUI: updateStepUI,
        hideAllBtns: hideAllBtns
    };
})();

var appController = (function(dataCtrl, UICtrl){
    
//// Variables ////
    
//// Functions ////
    function lastNextCheck(){
        lastStepCheck();
        nextStepCheck();
    };
    
    function homeState(){
        // reset curStep
        loadStep('reset');
        
        // empty step num UI
        document.querySelector(UICtrl.HTMLStrings.ids.stepNum).firstChild.textContent = '';
        
        // hide all buttons
        UICtrl.hideAllBtns();
        
        // reveal start course button
        document.querySelector(UICtrl.HTMLStrings.ids.courseStart).className = '';    
    };
    
    function startCourseState(){
        // load step
        loadStep('next');
    
        // hide all btns
        UICtrl.hideAllBtns();
        
        // show last, home, and next btns
         document.querySelector(UICtrl.HTMLStrings.ids.home).className = '';
        
         document.querySelector(UICtrl.HTMLStrings.ids.nextStep).className = '';
        
        document.querySelector(UICtrl.HTMLStrings.ids.lastStep).className = '';
        
        lastNextCheck()
    
    };
    
    function nextStepState(){
        
        loadStep('next');
        
        lastNextCheck()
        
    };
    
    function lastStepState(){
         if(dataCtrl.counters.curStep > 1){
                loadStep('last');
            };
        
        lastNextCheck()
        
    };
    
    function lastStepCheck(){
        
        if(dataCtrl.counters.curStep < 2){
            document.querySelector(UICtrl.HTMLStrings.ids.lastStep).disabled = true;
            
        } else {
            document.querySelector(UICtrl.HTMLStrings.ids.lastStep).disabled = false;
        };
        
    };
    
        function nextStepCheck(){
        
        if(dataCtrl.counters.curStep > (dataCtrl.counters.stepLimit - 1)){
            document.querySelector(UICtrl.HTMLStrings.ids.nextStep).disabled = true;
        } else {
            document.querySelector(UICtrl.HTMLStrings.ids.nextStep).disabled = false;
        };
        
    };
    
    function loadStep(keyString){
        // hide all
       UICtrl.hideAll();

        // update curStep
        dataCtrl.updateCurStep(keyString);
         console.log('loadStep run. curStep value is ' + dataCtrl.counters.curStep);
        
        // load new stage
        loadStage();
        
        // update step num UI
        UICtrl.updateStepUI(dataCtrl.counters.curStep, dataCtrl.counters.stepLimit);
    };
    
    function loadStage(){
        // 1. reveal stepContent
        UICtrl.revealContent(UICtrl.HTMLStrings.ids.stepContent, dataCtrl.counters.curStep);
        
        // 2. reveal quiz content
    UICtrl.revealContent(UICtrl.HTMLStrings.ids.interactBox, dataCtrl.counters.curStep);
        
    };
    
    function setStepLimit(){
        // calculate nodelist length
        var tempLimit = UICtrl.countSteps();
        
        console.log(tempLimit);
        
        // update dataCtrl stepLimit
        dataCtrl.updateStepLimit(tempLimit);
    };
    
    function loadListeners(){
        document.querySelector(UICtrl.HTMLStrings.ids.courseStart).addEventListener('click', startCourseState);
        
       document.querySelector(UICtrl.HTMLStrings.ids.home).addEventListener('click', homeState);
        document.querySelector(UICtrl.HTMLStrings.ids.nextStep).addEventListener('click', nextStepState);
        
         document.querySelector(UICtrl.HTMLStrings.ids.lastStep).addEventListener('click', lastStepState);
    };
    
    function innit(){
       homeState();
        document.querySelector(UICtrl.HTMLStrings.ids.stepNum).firstChild.textContent = '';
        setStepLimit();
        loadListeners();
        
        UICtrl.hideAll();
        console.log('innit, mright?' + ' ' + dataCtrl.dataCheck + ' ' + UICtrl.UICheck)
        loadStage();
    }
//// RETURN ////
    return {
        innit: innit
    };
})(dataController, UIController);

appController.innit();