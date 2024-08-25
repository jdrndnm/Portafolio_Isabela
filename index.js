
document.addEventListener("DOMContentLoaded", () => {

    // Once the page loads, add an event listener to close the navigation bar on small screens.

    const allNavButtons = document.querySelectorAll(".nav_btn");
    const burguer = document.querySelector(".right_side");
    
    //this event listener will trigger when a button is clicked
    allNavButtons.forEach(element => {
        element.addEventListener("click", function(){
            if (burguer.classList.contains("show_menu")){ //the show_menu class shows the nav bar
                burguer.classList.remove("show_menu")
                document.body.style.overflow="scroll"; //this enables the scroll
                
                
                //Animate the burger icon and reset it to its normal state.
                document.querySelector(".burguer div:first-child").style.transform = "rotate(0deg) translate(0px, 0px)"
                document.querySelector(".burguer div:nth-child(2)").style.width=""
                document.querySelector(".burguer div:nth-child(3)").style.transform = "rotate(0deg) translate(0px, 0px)"
            }
        })
    
    })


    //this will run after the page is loaded
    load_video_projects();
    load_photographic_projects();
    load_doc_projects();



    //this list the order of the sections
    const lista = [
        { index: 0, content: document.querySelector(".introduction") },
        { index: 1, content: document.querySelector(".audiovisual") },
        { index: 2, content: document.querySelector(".fotografía") },
        { index: 3, content: document.querySelector(".escrito") },
        { index: 4, content: document.querySelector(".contacto_section")  }
    ];
    
    let button_continue_target = null;    
    
    //when the button continue is clicked, this will scroll the view into the next target
    document.querySelector(".continue_intro").addEventListener("click", function(){
        if (button_continue_target){
            button_continue_target.scrollIntoView()
        }
    })
    
    //this code defines what the next target is
    //it's encapsualted inside a try because some old browsers might not support it
    //and i don't want all the code to break because of that, i mean who whants to, i know you don't
    //sadly something did break and here you are trying to understand this whole pile of shit i did
    //why am i writing this, i'll probably be the poor soul who will come here in the future
    //and i won't understang anything of what i did here, hopefullly reading the shit i wrote in the past
    //will make my day at that time, but i doubt it, life is cruel...
    try{
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    const button_go_down = document.querySelector(".continue_intro");
                    const element = lista.find(item => item.content === entry.target)
                    const next_button_target = lista.find(item => item.index === element.index+1)
                    const next_name = next_button_target.content.classList[0];
                    if (next_name!= "contacto_section"){
        
                        button_go_down.innerHTML = "<span>&#10140;</span>"+next_name
                        // button_go_down.style.opacity = "30%"; 
                        button_go_down.style.display="block";
        
                        button_continue_target = next_button_target.content
        
                    } else {
                        // button_go_down.style.opacity = "0%"; 
                        //why did i even attempt this      ^     it makes no sense, why would i not want to see it and still have it in there
                        //am i dumb or smthng. I'm not deleting that, it's the pin of shame

                        button_go_down.style.display="none";
                    }
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    } catch { console.log("ha sucedido un error con el observer.") }

    //one day i will read what i wrote and die of cringe, if it's not me, someone will, i pitty you.
    //hopefully no one will read this in the near future, that would be embarrasing, let it rest for a while, please.
    //it's 3 am btw, why am i doing this to me.
    
})

//this is the code for opening and closing the nav bar menu, it's for small screens only
document.querySelector(".burguer").addEventListener("click", function(){
    const burguer = document.querySelector(".right_side");
    if (burguer.classList.contains("show_menu")){ //if the burguer icon is clicked and it's already open, close the menu
        burguer.classList.remove("show_menu")
        document.body.style.overflow="scroll";

        document.querySelector(".burguer div:first-child").style.transform = "rotate(0deg) translate(0px, 0px)"
        document.querySelector(".burguer div:nth-child(2)").style.width=""
        document.querySelector(".burguer div:nth-child(3)").style.transform = "rotate(0deg) translate(0px, 0px)"
    } else { //if the burguer icon is clicked then open the menu
        burguer.classList.add("show_menu")
        document.body.style.overflow="hidden";

        document.querySelector(".burguer div:first-child").style.transform = "rotate(45deg) translate(0px, 14px)"
        document.querySelector(".burguer div:nth-child(2)").style.width="0"
        document.querySelector(".burguer div:nth-child(3)").style.transform = "rotate(-45deg) translate(0px, -15px)"
    }
    
})

//this will be used later to know whether the device is an iphone, just for compatibility with pdfs
function isIPhone() {
    return /iPhone/i.test(navigator.userAgent);
}

//this will be used to know whether the browser is safari, for compatibility
function isSafari() {
    var userAgent = navigator.userAgent;
    var isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
    return isSafari;
}


//this will get the video's id
function get_youtube_id(url) { //it receives a full url and returns only the id

    //this is a correct example of a full url with an id, not every url works:
    //  -->  https://youtu.be/6uS8BfyySqE?si=ACAnUDbHLcV7YFAs

    //this is an example of an url that won't work because the id is not being shown
    //  -->  https://www.youtube.com/watch?v=QFxiST6dld4

    //if the url starts with youtu.be then it's the right url
    //the next regex will select the id
    const regex = /youtu\.be\/([^\?]+)/;
    const match = url.match(regex);

    if (match && match[1]) {
        return match[1]; // if found, the id will be returned
    } else {
        return null; // if not found, null will be returned
    }
}

//loading the videos into th epage
async function load_video_projects(){

    //this is the link to the directories file
    const all_videos = await axios.get("directories.txt")
    
    //for every video found
    const keys = Object.keys(all_videos.data.audiovisual);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        const link_video = all_videos.data.audiovisual[key]        

        const video_id = get_youtube_id(link_video) //getting the video's youtube id

        //creating the html
        const video_item_container = document.createElement("div");
        video_item_container.classList.add("video_item_container");
        document.querySelector(".video_containers").appendChild(video_item_container);

        const img_thumbnail = document.createElement("img");
        //the next is the basic url of the thumbnail, it's taken directly from youtube
        img_thumbnail.src = `https://img.youtube.com/vi/${video_id}/hqdefault.jpg`;
        video_item_container.appendChild(img_thumbnail)

        const video_title = document.createElement("div");
        video_title.classList.add("video_title");
        video_title.innerHTML = key
        video_item_container.appendChild(video_title)
        
        video_item_container.addEventListener("click", function(){

            //when the video container is clicked, this code will load an iframe of the youtube embbeded video

            const background_dark = document.createElement("div");
            background_dark.classList.add("background_dark");
            document.body.appendChild(background_dark);

            document.body.style.overflow="hidden";

            const iframe = document.createElement("iframe");
            iframe.allowFullscreen=true;
            
            iframe.src = `https://www.youtube.com/embed/${video_id}`

            background_dark.appendChild(iframe)
            iframe.classList.add("iframe")

            background_dark.addEventListener("click", function(){
                this.remove()
                document.body.style.overflow="scroll";
            })
        })


    };

}





//this will load the photographic projects
async function load_photographic_projects(){
    
    const all_photos = await axios.get("directories.txt")
    
    const keys = Object.keys(all_photos.data.fotografia);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        const thumbnail_url = all_photos.data.fotografia[key].miniatura
        const element_url = all_photos.data.fotografia[key].fotos

        const photo = document.createElement("div");
        photo.classList.add("photo");
        document.querySelector(".photos_container").appendChild(photo);

        const photo_img = document.createElement("img");
        photo_img.src = "secciones/fotografía/"+thumbnail_url;
        photo.appendChild(photo_img)

        
        photo.addEventListener("click", function(){
            
            if(isIPhone()){ //if the device is an iphone, load the pdf in a new page instead
                window.open("https://jdrndnm.github.io/Portafolio_Isabela/secciones/fotografía/"+element_url, '_blank');
                return
            }

            //creating the html in case it's not an iphone
            const background_dark = document.createElement("div");
            background_dark.classList.add("background_dark");
            document.body.appendChild(background_dark);

            document.body.style.overflow="hidden";

            const pdf_obj = document.createElement("iframe");

            pdf_obj.width = "1000";
            pdf_obj.height = "800";
            pdf_obj.type = "application/pdf";
            pdf_obj.attributes="download"
            
            background_dark.appendChild(pdf_obj);
            
            if (isSafari() || isIPhone()){
                //if safari is being used, load the pdf directly into the iframe
                pdf_obj.src = "https://jdrndnm.github.io/Portafolio_Isabela/secciones/fotografía/"+element_url;
            } else { 
                //if any other browser is being used, load the pdf by using the mozilla's pdf viewer
                //i'm using this one because mobile browser usually don't have a pdf viewer plugin, this is the only solution i found
                //to actually visualize the pdf inside the page, i had to do it differently for iphone since no solution to a common
                //problem with iphone phone browsers was found, for some reason, they would only load the first page, i decided to let them
                //open the pdf in a new page instead
                //the next url will open for any pc running in windows or any android that's not using safari, no one use safari but anyway.
                pdf_obj.src = "https://mozilla.github.io/pdf.js/web/viewer.html?file=https://jdrndnm.github.io/Portafolio_Isabela/secciones/fotografía/"+element_url;
            }
            

            background_dark.addEventListener("click", function(){
                //if the background is clicked, close the pdf and allow scrolling again
                //notice that overflow is set to hidden when the pdf was opened, that's why this is needed.
                this.remove()
                document.body.style.overflow="scroll"
            })

        })
    }
}



//this function will load the written projects, it's pretty much the same as the photographic one so i won't say much
async function load_doc_projects(){
    const all_docs = await axios.get("directories.txt")
    
    const keys = Object.keys(all_docs.data.escritos);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        const doc = document.createElement("div");
        doc.classList.add("doc")
        document.querySelector(".docs_container").appendChild(doc);

        const doc_img = document.createElement("div");
        doc_img.style.backgroundImage  = `url(secciones/escritos/${all_docs.data.escritos[key].miniatura})`;
        doc_img.classList.add("doc_img")
        // doc_img.src = all_docs.data.escritos[key].miniatura;
        
        doc.appendChild(doc_img);

        const cube = document.createElement("div");
        cube.classList.add("cube");
        doc_img.appendChild(cube)

        const cube_title = document.createElement("div");
        cube_title.classList.add("cube_title");
        doc.appendChild(cube_title)
        cube_title.innerHTML=key

        doc.addEventListener("click", function(){

            if(isIPhone()){
                window.open("https://jdrndnm.github.io/Portafolio_Isabela/secciones/escritos/"+all_docs.data.escritos[key].escrito, '_blank');
                return
            }

            const background_dark = document.createElement("div");
            background_dark.classList.add("background_dark");
            document.body.appendChild(background_dark);

            document.body.style.overflow="hidden";

            const pdf_obj = document.createElement("iframe");
            pdf_obj.width = "1000";
            pdf_obj.height = "800";
            pdf_obj.type = "application/pdf";
            
            background_dark.appendChild(pdf_obj);

            if (isSafari() || isIPhone()){
                pdf_obj.src = "https://jdrndnm.github.io/Portafolio_Isabela/secciones/escritos/"+all_docs.data.escritos[key].escrito;
                
            } else {
                pdf_obj.src = "https://mozilla.github.io/pdf.js/web/viewer.html?file=https://jdrndnm.github.io/Portafolio_Isabela/secciones/escritos/"+all_docs.data.escritos[key].escrito;
                
            }

            background_dark.addEventListener("click", function(){
                this.remove()
                document.body.style.overflow="scroll"
            })

        })
  
    }  
}





