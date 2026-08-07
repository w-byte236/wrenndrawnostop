// =========================
// Scene resize
// =========================

const scene = document.querySelector(".scene");

let currentScale = 1;


function resizeScene(){

    currentScale = 1;

    scene.style.transform =
        "scale(1)";

}


window.addEventListener(
    "resize",
    resizeScene
);


resizeScene();


// =========================
// Books interaction
// =========================

let topLayer = 100;


document.querySelectorAll(".book").forEach(book=>{


    let offsetX = 0;
    let offsetY = 0;

    let dragging = false;

    let startX = 0;
    let startY = 0;



    // -------------------------
    // Mouse down
    // -------------------------

    book.addEventListener(
        "mousedown",
        e=>{


            e.preventDefault();


            topLayer++;

            book.style.zIndex = topLayer;



            const rect =
            scene.getBoundingClientRect();



            offsetX =
            (e.clientX - rect.left)
            / currentScale
            - book.offsetLeft;



            offsetY =
            (e.clientY - rect.top)
            / currentScale
            - book.offsetTop;



            startX = e.clientX;
            startY = e.clientY;



            dragging = false;


            book.classList.add(
                "dragging"
            );


        }
    );




    // -------------------------
    // Mouse move
    // -------------------------

    document.addEventListener(
        "mousemove",
        e=>{


            if(
                !book.classList.contains(
                    "dragging"
                )
            ) return;



            let moveDistance =
            Math.sqrt(
                Math.pow(e.clientX-startX,2)
                +
                Math.pow(e.clientY-startY,2)
            );


            if(moveDistance > 5){

                dragging = true;

            }



            const rect =
            scene.getBoundingClientRect();



            book.style.left =
            (
                (e.clientX - rect.left)
                /
                currentScale
                -
                offsetX
            )
            + "px";



            book.style.top =
            (
                (e.clientY - rect.top)
                /
                currentScale
                -
                offsetY
            )
            + "px";


        }
    );





    // -------------------------
    // Mouse up
    // -------------------------

    document.addEventListener(
        "mouseup",
        ()=>{


            book.classList.remove(
                "dragging"
            );


        }
    );





// -------------------------
// Single click toggle book
// -------------------------

book.addEventListener(
    "click",
    ()=>{


        if(dragging) return;


        const open =
        book.querySelector(".open");


        // 没有open图片，不执行打开
        if(!open) return;


        book.classList.toggle("opened");


    }
);



    // -------------------------
    // Double click detail page
    // -------------------------

    book.addEventListener(
    "dblclick",
    ()=>{
        const page =
        book.dataset.page;

        if(page){
            window.location.href =
            page + ".html";
        }
    }
);


});

// =========================
// Other objects interaction
// =========================


document.querySelectorAll(".clickable").forEach(item=>{


    console.log("found:", item);


    // hover测试
    item.addEventListener(
        "mouseenter",
        ()=>{
            console.log("hover:", item);
        }
    );


    // 点击置顶
    item.addEventListener(
    "mousedown",
    ()=>{

        if(item.classList.contains("legs")){
            return;
        }

        topLayer++;
        
        if(topLayer > 9000){
        topLayer = 100;
    }

item.style.zIndex = topLayer;

    }
);


    // 双击进入页面
    item.addEventListener(
        "dblclick",
        ()=>{


            const page =
            item.dataset.page;


            if(page){

                window.location.href =
                page + ".html";

            }


        }
    );


});



// =========================
// Legs bubble interaction
// =========================


const legs = document.querySelector(".legs");

const ble = document.querySelector(".ble");
const right = document.querySelector(".right");

const ble2 = document.querySelector(".ble2");
const left = document.querySelector(".left");

hideAllBubble();

function hideAllBubble(){

    ble.style.display = "none";
    right.style.display = "none";

    ble2.style.display = "none";
    left.style.display = "none";

}

hideAllBubble();

// 点击 legs


legs.addEventListener(
"click",
(e)=>{

    e.stopPropagation();


    hideAllBubble();


    ble.style.display="block";
    right.style.display="block";

    ble.style.zIndex = 99999;
    right.style.zIndex = 99999;


});



// 点击 Right

right.addEventListener(
"click",
(e)=>{

    e.stopPropagation();


    hideAllBubble();


    ble2.style.display="block";
    left.style.display="block";
    
    ble2.style.zIndex = 99999;
    left.style.zIndex = 99999;


});




// 点击 Left

left.addEventListener("click",(e)=>{

    e.stopPropagation();

    hideAllBubble();

    ble.style.display = "block";
    right.style.display = "block";

});



// 点击其他地方关闭

document.addEventListener(
"click",
(e)=>{

    if(
        !e.target.classList.contains("legs") &&
        !e.target.classList.contains("right") &&
        !e.target.classList.contains("left")
    ){

        hideAllBubble();

    }

});

// =========================
// Hover tooltip
// =========================


const tooltip = document.querySelector(".tooltip");


document.querySelectorAll("[data-title]").forEach(item=>{


    item.addEventListener(
        "mouseenter",
        ()=>{

            tooltip.innerText = item.dataset.title;

            tooltip.style.display="block";

        }
    );


    item.addEventListener(
        "mouseleave",
        ()=>{

            tooltip.style.display="none";

        }
    );


});