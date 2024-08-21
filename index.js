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
    
    const username = 'jdrndnm';
    const repoName = 'test_portfolio'; 
    const apiUrl = `https://api.github.com/repos/${username}/${repoName}/contents/secciones`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            add_section_names_into_web(data)
        })
        .catch(error => console.error('Error al cargar las carpetas:', error));
}
load_section_names_from_github()

function add_section_names_into_web(sections){
    console.log(sections)
    sections.forEach(element => {
        console.log(element)
    });
}