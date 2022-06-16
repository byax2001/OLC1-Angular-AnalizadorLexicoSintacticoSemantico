try{
    let option1= document.getElementById('option1');
    let option2= document.getElementById('option2');
    let option3= document.getElementById('option3');
    let option4= document.getElementById('option4');
    let option5= document.getElementById('option5');
    let content1= document.getElementById('content1');
    let content2= document.getElementById('content2');
    let content3= document.getElementById('content3');
    let content4= document.getElementById('content4');
    let content5= document.getElementById('content5');
    let chose=1;
    const changeOption =()=>{
        chose==1?//if
        (
            option1.classList.value='option option-active',
            content1.classList.value='tAreaW content content-active'
        )
        ://else
        (
            option1.classList.value='option',
            content1.classList.value=' tAreaW content'    
        )
        chose==2? 
        (
            option2.classList.value='option option-active',
            content2.classList.value='tAreaW content content-active'
        )
        :
        (
            option2.classList.value="option",
            content2.classList.value='tAreaW content'    
        )
        chose==3? 
        (
            option3.classList.value='option option-active',
            content3.classList.value='tAreaW content content-active'
        )
        :
        (
            option3.classList.value="option",
            content3.classList.value='tAreaW content'    
        )
        chose==4? 
        (
            option4.classList.value='option option-active',
            content4.classList.value='tAreaW content content-active'
        )
        :
        (
            option4.classList.value="option",
            content4.classList.value='tAreaW content'    
        )
        chose==5? 
        (
            option5.classList.value='option option-active',
            content5.classList.value='tAreaW content content-active'
        )
        :
        (
            option5.classList.value="option",
            content5.classList.value='tAreaW content'    
        )
    }
        
option1.addEventListener('click',()=>{
    chose=1;
    changeOption();
    
    $('.CodeMirror').each(function(i, el){
        el.CodeMirror.refresh();
    });
    
})
option2.addEventListener('click',()=>{
    chose=2;
    changeOption();
    
    $('.CodeMirror').each(function(i, el){
        el.CodeMirror.refresh();
    });
    
})
option3.addEventListener('click',()=>{
    
    chose=3;
    changeOption();
    
    $('.CodeMirror').each(function(i, el){
        el.CodeMirror.refresh();
    });
    
})
option4.addEventListener('click',()=>{
    chose=4;
    changeOption();
    
    $('.CodeMirror').each(function(i, el){
        el.CodeMirror.refresh();
    });
})
option5.addEventListener('click',()=>{
    chose=5;
    changeOption();
    
    $('.CodeMirror').each(function(i, el){
        el.CodeMirror.refresh();
    });
})

}catch(e){}




/*


*/