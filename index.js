document.querySelector(".burguer").addEventListener("click", function(){
    const burguer = document.querySelector(".right_side");
    if (burguer.classList.contains("show_menu")){
        burguer.classList.remove("show_menu")
        document.body.style.overflow="scroll";

        document.querySelector(".burguer div:first-child").style.transform = "rotate(0deg) translate(0px, 0px)"
        document.querySelector(".burguer div:nth-child(2)").style.width=""
        document.querySelector(".burguer div:nth-child(3)").style.transform = "rotate(0deg) translate(0px, 0px)"
    } else {
        burguer.classList.add("show_menu")
        document.body.style.overflow="hidden";

        document.querySelector(".burguer div:first-child").style.transform = "rotate(45deg) translate(0px, 14px)"
        document.querySelector(".burguer div:nth-child(2)").style.width="0"
        document.querySelector(".burguer div:nth-child(3)").style.transform = "rotate(-45deg) translate(0px, -15px)"
    }
    
})

function get_youtube_id(url) {
    // Verifica si la URL es del tipo "youtu.be"
    const regex = /youtu\.be\/([^\?]+)/;
    const match = url.match(regex);

    if (match && match[1]) {
        return match[1]; // La ID del video es el primer grupo de captura
    } else {
        return null; // No se encontró una ID válida
    }
}


async function load_video_projects(){

    const all_videos = await axios.get("directories.txt")
    


    // const all_videos = await axios.get('https://api.github.com/repos/jdrndnm/test_portfolio/contents/secciones/audiovisual')

    
    const keys = Object.keys(all_videos.data.audiovisual);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];


        const link_videotxt = all_videos.data.audiovisual[key]
        const link = await axios.get(link_videotxt)
        const link_video = link.data


        const video_id = get_youtube_id(link_video)

        // console.log()

        const video_item_container = document.createElement("div");
        video_item_container.classList.add("video_item_container");
        document.querySelector(".video_containers").appendChild(video_item_container);

        const img_thumbnail = document.createElement("img");
        img_thumbnail.src = `https://img.youtube.com/vi/${video_id}/hqdefault.jpg`;
        video_item_container.appendChild(img_thumbnail)

        const video_title = document.createElement("div");
        video_title.classList.add("video_title");
        video_title.innerHTML = key
        video_item_container.appendChild(video_title)
        
        video_item_container.addEventListener("click", function(){
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

load_video_projects()


async function load_photographic_projects(){
    // const all_photos = await axios.get('https://api.github.com/repos/jdrndnm/test_portfolio/contents/secciones/fotografía')
    const all_photos = await axios.get("directories.txt")
    
    const keys = Object.keys(all_photos.data.fotografia);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        // const element = all_photos.data[i];

        // const element_url = await axios.get(element.url)
        // const thumbnail_url = element_url.data.filter(item => item.name === "miniatura.png")[0].download_url

        const thumbnail_url = all_photos.data.fotografia[key].miniatura
        const element_url = all_photos.data.fotografia[key].fotos
        console.log(thumbnail_url)

        const photo = document.createElement("div");
        photo.classList.add("photo");
        document.querySelector(".photos_container").appendChild(photo);

        const photo_img = document.createElement("img");
        photo_img.src = thumbnail_url;
        photo.appendChild(photo_img)

        
        photo.addEventListener("click", function(){
            const background_dark = document.createElement("div");
            background_dark.classList.add("background_dark");
            document.body.appendChild(background_dark);

            document.body.style.overflow="hidden";

            const pdf_obj = document.createElement("iframe");
            pdf_obj.src = "https://jdrndnm.github.io/test_portfolio/"+element_url;
            pdf_obj.width = "1000";
            pdf_obj.height = "800";
            pdf_obj.type = "application/pdf";

            background_dark.appendChild(pdf_obj);

            background_dark.addEventListener("click", function(){
                this.remove()
                document.body.style.overflow="scroll"
            })

        })


        

        


        // console.log(thumbnail_url)
    }

}

load_photographic_projects()


async function load_doc_projects(){
    const all_docs = await axios.get("directories.txt")
    
    const keys = Object.keys(all_docs.data.escritos);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        const doc = document.createElement("div");
        doc.classList.add("doc")
        document.querySelector(".docs_container").appendChild(doc);

        const doc_img = document.createElement("img");
        doc_img.src = all_docs.data.escritos[key].miniatura;
        
        doc.appendChild(doc_img);

    }  
}

load_doc_projects();