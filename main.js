class Car{
    constructor(name, price, imgUrl, imgValue){
        this.name = name;
        this.price = price;
        this.imgUrl = imgUrl;
        this.imgValue = imgValue;
    }
}

let cars = [
    new Car ("Peugeot", 800, "https://wallpaperaccess.com/full/15020.jpg", 0),
    new Car ("BMW", 3000, "https://www.teahub.io/photos/full/75-755562_download-sports-car-wallpaper-elegant-bmw-i8-super.jpg", 1),
    new Car ("GT-R", 10000, "https://www-asia.nissan-cdn.net/content/dam/Nissan/jp/vehicles/gt-r/2203/top/gt-r_2203_top_usp1_pc_01.jpg.ximg.l_full_m.smart.jpg", 2),
    new Car ("Cars", "?", "https://www.pixelstalk.net/wp-content/uploads/2016/10/HD-Free-Pictures-Disney-Cars.jpg", 3),
    new Car ("lightweight truck", 70, "https://www.keicar-info.com/img/ranking-img/truck/hikakuhyou_torakku_clip_image020.jpg", 4),
    new Car ("ALTO", 100, "https://cdn.autoc-one.jp/image/catalog/6/8/1286/3433/12370/1_o.jpg", 5),
    new Car ("Lamborghini", 4000,"https://catalogphoto.goo-net.com/carphoto/30301506_201208.jpg", 6),
    new Car ("ALPHARD", 700, "https://car-mo.jp/mag/wp-content/uploads/2021/01/20200420_01_01.jpg", 7),
    new Car ("RX-7", 300, "https://media.sketchfab.com/models/61c7faa539424486aff840b78d7d6459/thumbnails/9c66fa2177ec4b6b812263c0a8853f48/03e383bf77334c53bbd0cddcb47c40a7.jpeg", 8),            
];

let sliderItem = [];
for (let i = 0; i < cars.length; i++){
    sliderItem.push('<img class="imgFit full-width" src="' + cars[i].imgUrl + '" alt="">');
}

class SliderShow{
    static createSlider(){
        let sliderBox = document.getElementById("sliderBox");
        sliderBox.classList.add("col-md-7", "col-12", "p-2", "d-flex", "justify-content-center", "align-items-center");
        
        let main = document.createElement("div");
        main.classList.add("main", "full-width");
        main.setAttribute("id", "main");

        let extra = document.createElement("div");
        extra.classList.add("extra", "full-width");
        extra.setAttribute("id", "extra")

        sliderBox.append(main);
        sliderBox.append(extra);

        main.setAttribute("data-index", "0");

    }

    static createButtons(){
        let btnBox = document.getElementById("btnBox");
        let controls = document.createElement("div");
        controls.classList.add("col-12", "d-flex" , "flex-wrap", "px-0", "py-5");
        
        let buttons = "";
        for (let i = 0; i <= cars.length -1 ; i++){
            buttons += `
                <div class="col-4 text-center py-2 px-2">
                    <button id="btn${i+1}" type="button" class="btn btn-light col-12 item">${i+1}</button>
                </div>
            `;
        }
        controls.innerHTML = `${buttons}`;
        btnBox.append(controls);

        for (let i = 0; i <= cars.length-1; i++){
            document.getElementById("btnBox").querySelectorAll(".btn")[i].addEventListener("click", function(){
                Controller.slideJump(i);
            })
        }
    }

    static createInfoBox(){
        let infoBox = document.getElementById("infoBox");
        let imgIndex = document.querySelectorAll(".item");
        console.log(imgIndex);
        infoBox.innerHTML = `
            <div class="col-12 px-0 pl-2">
                <h3 class="h3 text-white">Display</h3>
                <h3 class="h3 text-white">Name : </h3>
                <h3 class="h3 text-white">Price : </h3>
            </div>
        `;
        
        for (let i = 0; i <= imgIndex.length; i++){
            let showInfo = imgIndex.item(i);
            showInfo.addEventListener("click", function(){
                infoBox.innerHTML = `
                    <div class="col-12 px-0 pl-2">
                        <p class="m-0 text-white h3 d">Name : ${cars[i].name}</p>
                        <p class="m-0 text-white h3">Price : ${cars[i].price}</p>
                    </div>
                ` 
            })
        }
    }

    static pushButton(){
        let main = document.getElementById("main");
        let index = parseInt(main.getAttribute("data-index"));

        document.getElementById("pushBtn").addEventListener("click", function(){
            alert("Thank you for buying" + " " + cars[index].name + " !!!" + "\n" + "Enjoy your driving.");
        })
    }
}

class Controller{
    static slideJump(value){
        let main = document.getElementById("main");
        let index = parseInt(main.getAttribute("data-index"));
        let currentIndex = index;

        let currentElement = document.createElement("div");
        currentElement.classList.add("d-flex", "justify-content-center");
        currentElement.innerHTML = `
            ${sliderItem[index]}
        `

        let nextElement = document.createElement("div");
        nextElement.classList.add("d-flex", "justify-content-center");
        nextElement.innerHTML = `
            ${sliderItem[value]}
        `

        let nextIndex = value;
    
        main.setAttribute("data-index", value.toString());
    
        this.animateMain(currentElement, nextElement, currentIndex, nextIndex, value);

    }

    static animateMain(currentElement, nextElement, currentIndex, nextIndex){
        let sliderBox = document.getElementById("sliderBox");
        let main = document.getElementById("main");
        let extra = document.getElementById("extra");

        main.innerHTML = "";
        main.append(nextElement);

        extra.innerHTML = "";
        extra.append(currentElement);

        main.classList.add("expand-animation");
        extra.classList.add("deplete-animation");
    
        if (nextIndex < currentIndex){
            sliderBox.innerHTML = "";
            sliderBox.append(extra);
            sliderBox.append(main);
        } else {
            sliderBox.innerHTML = "";
            sliderBox.append(main);
            sliderBox.append(extra);
        }
    }
}

SliderShow.createSlider();
SliderShow.createButtons();
SliderShow.createInfoBox();
