var dataController = (function(){
    
//// Variables ////
    var curStep = 0;
//// Functions ////
    
//// RETURN ////
    return {
        dataCheck: 'dataCheck',
        curStep: curStep
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
        nextStep: '#nextStep'
    },
    classes: {
        hidden: 'hidden'
    },
    splitChar: '__'
}
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
        HTMLstrings: HTMLStrings
    };
})();

var appController = (function(dataCtrl, UICtrl){
    
//// Variables ////
    
//// Functions ////
    function loadStage(){
        // 1. reveal stepContent
console.log(UICtrl.HTMLstrings.ids.stepContent);        UICtrl.revealContent(UICtrl.HTMLstrings.ids.stepContent, dataCtrl.curStep);
        // 2. reveal quiz content
    }
    
    function loadListeners(){
        document.querySelector(UICtrl.HTMLstrings.ids.courseStart).addEventListener('click', loadStage);
    }
    
    function innit(){
        
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