const canvas=document.getElementById("canvas");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;


let context= canvas.getContext("2d");

context.fillStyle="white";
context.fillRect(0,0,canvas.width,canvas.height);

let draw_color="black";
let draw_width="2";
let is_drawing=false;

let restor_array=[];
let index=-1;

function changeColor(element)
{
    draw_color=element.style.background;
}


canvas.addEventListener("touchstart",start,false);
canvas.addEventListener("touchmove",draw,false);
canvas.addEventListener("mousedown",start,false);
canvas.addEventListener("mousemove",draw,false);

canvas.addEventListener("touchend",stop,false);
canvas.addEventListener("mouseup",stop,false);
canvas.addEventListener("oseout",stop,false);

function start(event){
    is_drawing=true;
    context.beginPath();
    context.moveTo(event.clientX-canvas.offsetLeft,
                    event.clientY-canvas.offsetTop);

    event.preventDefault();

}

function draw(event)
{
    if(is_drawing)
    {
        context.lineTo(event.clientX-canvas.offsetLeft,
            event.clientY-canvas.offsetTop);
        
        context.strokeStyle=draw_color;
        context.lineWidth=draw_width;
        context.lineCap="round";
        context.lineJoin="round";
        context.stroke();
    }
}

function stop(event)
{
    if(is_drawing)
    {
        context.stroke();
        context.closePath();
        is_drawing=false;
    }
    event.preventDefault();

    if (event.type!='mouseout')
    {
        restor_array.push(context.getImageData(0,0,canvas.width,canvas.height));
        index+=1;
    }

}

function clearCanvas()
{
    context.fillStyle="white";
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillRect(0,0,canvas.width,canvas.height);

    restor_array=[];
    index=-1;
}

function undo()
{
    if(index<=0)
    {
        clearCanvas();
    }
    else{
        index-=1;
        restor_array.pop();
        context.putImageData(restor_array[index],0,0);
    }
}