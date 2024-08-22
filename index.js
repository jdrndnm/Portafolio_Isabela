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


function load_section_names_from_github(){
    
    var apiUrl = `https://api.github.com/repos/jdrndnm/test_portfolio/contents/secciones`;

    axios.get(apiUrl)
        .then(response => {
            add_section_names_into_web(response.data)
        })
        .catch(error => console.error('Error al cargar las carpetas:', error));
}

load_section_names_from_github()

function add_section_names_into_web(sections){
    
    sections.forEach(element => {
        
        // add the section to the nav bar
        const section_button = document.createElement("div");
        section_button.classList.add("nav_btn");
        section_button.innerHTML=element.name;
        const contact_button = document.querySelector(".contacto_button")
        document.querySelector(".right_side").insertBefore(section_button,contact_button);

        // create the section
        const new_section = document.createElement("section");
        new_section.id= ""+ element.name +"_section";
        // new_section.classList.add("video")
        const contacto_section = document.querySelector(".contacto_section");
        document.body.insertBefore(new_section, contacto_section);

        
        axios.get(element.url)
        .then(response => {
            const type_doc = (response.data.filter(item => item.name ==="type.txt"))[0].download_url
            const elements_project = (response.data.filter(item => item.name !=="type.txt"))
            
            axios.get(type_doc)
            .then(response => {

                if (response.data == "video"){
                    new_section.classList.add("video")
                    add_video_to_section(new_section, elements_project)
                }

            })
            .catch(error => console.error('Error:', error));



        })
        .catch(error => console.error('Error al cargar las carpetas:', error));

    });
}

function get_thumbnail(url) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    if (!videoId) {
        alert('Por favor ingresa una URL válida de YouTube.');
        return;
    }
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    return thumbnailUrl;
}

async function get_txtcontent_url(videofilecontents_url, type_content) {
    try {
        const response = await axios.get(videofilecontents_url);
        
        const result = response.data.filter(item => item.name === type_content)[0].download_url;
        return result;
    } catch (error) {
        console.error('Error al cargar las carpetas:', error);
        return null;
    }
}


// async function get_video_title(videofilecontents_url){
//     try{
//         const response = await axios.get(videofilecontents_url);
//         const video_title = response.data.filter(item => item.name ===)
//     }
// }

async function add_video_to_section(new_section, projects) {
    // Crear carrusel
    const video_project = document.createElement("div");
    video_project.classList.add("video_project");
    new_section.appendChild(video_project);
    
    const main_video_container = document.createElement("div");
    main_video_container.classList.add("main_video_container");
    video_project.appendChild(main_video_container);

    const video_thumbnail = document.createElement("div");
    video_thumbnail.classList.add("video_thumbnail");
    main_video_container.appendChild(video_thumbnail);

    const video_play = document.createElement("img");
    video_play.src = "./resources/icon_play.png";
    video_play.classList.add("video_play")
    video_thumbnail.appendChild(video_play);

    const thumbnailimg = document.createElement("img");
    video_thumbnail.appendChild(thumbnailimg);

    let videofilecontents_url = projects[0].url;

    const video_url = await get_txtcontent_url(videofilecontents_url, "video.txt");

    if (video_url) {
        const response = await axios.get(video_url);
        const thumbnail_url = get_thumbnail(response.data);

        thumbnailimg.src = thumbnail_url;
    } else {
        console.error("No se pudo obtener la URL del video.");
    }

    thumbnailimg.classList.add("thumbnailimg");

    const textual = document.createElement("div");
    textual.classList.add("textual");
    main_video_container.appendChild(textual);

    const project_video_title = document.createElement("project_video_title");
    project_video_title.classList.add("project_video_title");
    textual.appendChild(project_video_title);

    
    const titulo_url = await get_txtcontent_url(videofilecontents_url, "titulo.txt");
    const titulotxt_content = await axios.get(titulo_url)

    project_video_title.innerHTML = titulotxt_content.data;

    const project_video_description = document.createElement("p");
    project_video_description.classList.add("project_video_description");

    const description_url = await get_txtcontent_url(videofilecontents_url, "descripcion.txt");
    const descripciontxt_content = await axios.get(description_url);

    project_video_description.innerHTML = descripciontxt_content.data;
    textual.appendChild(project_video_description)

    const carrousel = document.createElement("div");
    carrousel.classList.add("carrousel");
    video_project.appendChild(carrousel);

    
    console.log(projects)
    for (let element of projects) {
        videofilecontents_url = element.url;
        console.log(element);
    
        const video_from_carrousel = document.createElement("div");
        video_from_carrousel.classList.add("video_from_carrousel");
        carrousel.appendChild(video_from_carrousel);
    
        const carrousel_thumbnailimg = document.createElement("img");
        carrousel_thumbnailimg.classList.add("carrousel_thumbnailimg");
        video_from_carrousel.appendChild(carrousel_thumbnailimg);

        const elements_inside_urls = await axios.get(element.url) 
        const videos_url = await get_txtcontent_url(videofilecontents_url, "video.txt") 
        const videos_actual_url = await axios.get(videos_url);

        video_from_carrousel.dataset.video = videos_actual_url.data

        const videos_thumbnail = await get_thumbnail(videos_actual_url.data)
        carrousel_thumbnailimg.src = videos_thumbnail

        video_from_carrousel.dataset.thumbnail = videos_thumbnail;

        const videos_title_url = await get_txtcontent_url(videofilecontents_url, "titulo.txt");
        const videos_title = await axios.get(videos_title_url)
        
        video_from_carrousel.dataset.title = videos_title.data;

        const videos_description_url = await get_txtcontent_url(videofilecontents_url, "descripcion.txt");
        const videos_description = await axios.get(videos_description_url);

        video_from_carrousel.dataset.description = videos_description.data;   

        if (element == projects[0]){
            video_from_carrousel.classList.add("carousel_selected")
        }
        

    }
    



}