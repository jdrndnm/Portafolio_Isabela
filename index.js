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
        new_section.classList.add(""+ element.name +"_section");
        const contacto_section = document.querySelector(".contacto_section");
        document.body.insertBefore(new_section, contacto_section);
        


        axios.get(element.url)
        .then(response => {
            const type_doc = (response.data.filter(item => item.name ==="type.txt"))[0].download_url
            const elements_project = (response.data.filter(item => item.name !=="type.txt"))
            
            axios.get(type_doc)
            .then(response => {
                console.log(response.data)

                if (response.data == "video"){
                    add_video_section(elements_project)
                }

            })
            .catch(error => console.error('Error:', error));



        })
        .catch(error => console.error('Error al cargar las carpetas:', error));

    });
}

function add_video_section(projects){
    projects.forEach(element => {
        console.log(element)
    })
}