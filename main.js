
if (window.DeviceMotionEvent != undefined) {
    //No accelerometer is present. Use buttons. 
    window.addEventListener("devicemotion", accelerometerUpdate, true);
}else{
    alert('ERROR');
}


function accelerometerUpdate(e) {
    if(screen.orientation.angle == 0){
        var aX = e.accelerationIncludingGravity.x*1;
        var aY = e.accelerationIncludingGravity.y*1;
        var aZ = e.accelerationIncludingGravity.z*1;
    }else if(screen.orientation.angle == 90){
        var aX = e.accelerationIncludingGravity.y*1;
        var aY = e.accelerationIncludingGravity.x*1;
        var aZ = e.accelerationIncludingGravity.z*1;
    }else if(screen.orientation.angle == 270){
        var aX = -e.accelerationIncludingGravity.y*1;
        var aY = -e.accelerationIncludingGravity.x*1;
        var aZ = e.accelerationIncludingGravity.z*1;
    }
    
    
    let xPosition = -Math.round( (Math.atan(aX, aZ))/(Math.PI/180))/90;
    
    let yPosition = Math.round((Math.atan(aY-4, aZ))/(Math.PI/180))/90;
    
     
    // let al = document.querySelector('.lol');
    // console.log(al);
    // al.innerHTML = `${xPosition}\n ${yPosition}`;
    
    let children = Array.prototype.slice.call(imageBlock.children);
    children.forEach(element => {
        element.style.transform = `translate(${-50 - (Math.round(xPosition*10)/10) *element.dataset.distance*13}%,${-50-(Math.round(yPosition*10)/10)*element.dataset.distance*8}%)`;
    });
    
    
}
function imageMove(e){
    let cordX = (e.clientX - this.offsetWidth/2)/this.offsetWidth*2;
    let cordY = (e.clientY - this.offsetHeight/2)/this.offsetHeight*2;
    let children = Array.prototype.slice.call(this.children);
    children.forEach(element => {
        element.style.transform = `translate(${-50-(Math.round(cordX*10)/10)*element.dataset.distance*2.2}%,${-50-(Math.round(cordY*10)/10)*element.dataset.distance*5}%)`;
    });
    
}
const imageBlock = document.querySelector('.img3d');

imageBlock.addEventListener("mousemove",imageMove,true);


/////////////PRELOADER
let images = document.images,
    images_total_count = images.length,
    images_loaded_count = 0,
    preloaderElem = document.getElementById('preloader'),
    backgroundPreloader = document.querySelector('.back-loader');

    
    for(let i =0;i<images_total_count;i++){
        
        let image_clone = new Image();
        
        image_clone.onload =  imageload;
        
        image_clone.onerror =   imageload;
        image_clone.src = images[i].src;
        
        
        
    }


function imageload() {   
        images_loaded_count++;
       
        
        backgroundPreloader.style.background = `linear-gradient(0deg, black 50%, white 50%) 0 ${-images_loaded_count/images_total_count*(backgroundPreloader.clientHeight/2)}px`; 
        if(images_loaded_count>= images_total_count){
            setTimeout(()=>{
                imageFinish();
            },500)
        }
}
function imageFinish(){
    preloaderElem.style.opacity = '0';
    preloaderElem.style.visibility = 'hidden';
    
    let children = Array.prototype.slice.call(imageBlock.children);
    children.forEach(element => {
        element.style.transform = `translate(-50%,-50%)`;
    });

}
window.addEventListener('resize',resizeEvn);
function resizeEvn(){
    backgroundPreloader.style.background = `linear-gradient(0deg, black 50%, white 50%) 0 ${-images_loaded_count/images_total_count*(backgroundPreloader.clientHeight/2)}px`; 
}
