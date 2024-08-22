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

function add_video_section(url){
    console.log(url)
}