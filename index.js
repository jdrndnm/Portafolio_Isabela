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



async function load_video_projects(){

    const all_videos = await axios.get('https://api.github.com/repos/jdrndnm/test_portfolio/contents/secciones/audiovisual')
    for (let i = 0; i < all_videos.data.length; i++) {
        const element = all_videos.data[i];
        console.log(element.url);

        const nw = await axios.get(element.url)
        console.log(nw)

        // const video_item_container = document.createElement("div");
        // video_item_container.classList.add("video_item_container");
        // document.querySelector(".video_containers").appendChild(video_item_container);

        // const img_thumbnail = 

    }

}

load_video_projects()