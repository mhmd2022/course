window.addEventListener("load",()=>{
    document.querySelector(".js-page-loader").classList.add("face-off");
    setTimeout(()=>{
        document.querySelector(".js-page-loader").style.display = "none";
    },600)
})

function testimonialSlider (){
    const carouselOne = document.getElementById('carouselOne');
    if(carouselOne){
        carouselOne.addEventListener('slide.bs.carousel', function () {
            const activeItem = this.querySelector(".active")
            document.querySelector(".js-testimonial-img").src = activeItem.getAttribute("data-js-testimonial-img");
            
          });
    }
}
testimonialSlider();

/*-------------------
header-backdrop
----------------------*/
function headerMenu(){
    const menu = document.querySelector(".js-header-menu"),
    backdrop =document.querySelector(".js-header-backdrop"),
    menuCollapseBreakpoint = 991;
    function collapse(){
        menu.querySelector(" .active .js-sup-menu").removeAttribute("style");
        menu.querySelector(".active").classList.remove("active");
    };

    function toggleMenu(){
        menu.classList.toggle("open");
        document.body.classList.toggle("overflow-hidden");
        backdrop.classList.toggle("active");
    }
    backdrop.addEventListener("click",toggleMenu);
    document.querySelectorAll(".js-header-menu-toggler").forEach((item)=>{
        item.addEventListener("click",toggleMenu);
    });
    menu.addEventListener("click",(event)=>{
        const { target } = event;
        if(target.classList.contains("js-toggle-sup-menu") && window.innerWidth <= menuCollapseBreakpoint){
            event.preventDefault();
            if(target.parentElement.classList.contains("active")){
                collapse();
                return;
            }
            if(menu.querySelector(".active")){
                collapse();
            }
           target.parentElement.classList.add("active");
           target.nextElementSibling.style.maxHeight = target.nextElementSibling.scrollHeight + "px";

        }
    });
    window.addEventListener("resize",function(){
        if(this.innerWidth > menuCollapseBreakpoint && menu.classList.contains("open")){
            toggleMenu();
        }
    })

}
headerMenu();
/*-----------------------
style switcher
------------------------*/
function styleSwitcherToggle(){
    const styleSwitcherToggler = document.querySelector(".js-style-switcher-toggler"),
    styleSwitcher = document.querySelector(".js-style-switcher");
    styleSwitcherToggler.addEventListener("click",()=>{
        styleSwitcher.classList.toggle("open");
        styleSwitcherToggler.querySelector(".fas").classList.toggle("fa-times");
        styleSwitcherToggler.querySelector(".fas").classList.toggle("fa-cog");
    });
}
styleSwitcherToggle();
/*---------------------
theme colors
------------------------*/
function themeColors(){
    const colorStyle = document.querySelector(".js-color-style"),
    themeColorsContainer = document.querySelector(".js-theme-colors");
    themeColorsContainer.addEventListener("click",({target})=>{
        if(target.classList.contains("js-theme-color-item")){
            localStorage.setItem("color",target.getAttribute("data-js-tmeme-color"));
            setColor();
        }
    });
    function setColor(){
        let path = colorStyle.getAttribute("href").split("/");
        path = path.slice(0,path.length-1);
        colorStyle.setAttribute("href", path.join("/") +"/"+localStorage.getItem("color")+".css");
        if(document.querySelector(".js-theme-color-item.active")){
            document.querySelector(".js-theme-color-item.active").classList.remove("active");
        }
        document.querySelector("[data-js-tmeme-color="+localStorage.getItem("color")+"]").classList.add("active");
    }
    if(localStorage.getItem("color") !== null){
        setColor();
    }else{
        const defaultColor = colorStyle.getAttribute("href").split("/").pop().split(".").shift();
        document.querySelector("[data-js-tmeme-color="+defaultColor + "]").classList.add("active");
    }
}
themeColors();
/* theme light & dark mode */
function themeLightDark(){
    const darkModeCheckBox = document.querySelector(".js-dark-mode");
    darkModeCheckBox.addEventListener("click",function(){
        if(this.checked){
            localStorage.setItem("theme-dark","true");
        }
        else{
            localStorage.setItem("theme-dark","false");
        }
        themeMode();
    });
    function themeMode(){
        if(localStorage.getItem("theme-dark") === "false"){
            document.body.classList.remove("dark");
        }else{
            document.body.classList.add("dark");
        }
    }
    if(localStorage.getItem("theme-dark") !== null){
        themeMode();
    }
    if(document.body.classList.contains("dark")){
        darkModeCheckBox.checked = true;
    }
}
themeLightDark();

// them glass effect 
function themeGlassEffect(){
    const glassEffectCheckBox = document.querySelector(".js-glass-effect"),
    glassStyle = document.querySelector(".js-glass-style");
    glassEffectCheckBox.addEventListener("click", function(){
        if(this.checked){
            localStorage.setItem("glass-effect","true");
        }else{
            localStorage.setItem("glass-effect","false");
        }
        glassEffect();
    });
    function glassEffect(){
        if(localStorage.getItem("glass-effect") === "true"){
            glassStyle.removeAttribute("disabled");
        }else{
            glassStyle.disabled = true;
        }
    }
    if(localStorage.getItem("glass-effect") !== null){
        glassEffect();
    }
    if(!glassStyle.hasAttribute("disabled")){
        glassEffectCheckBox.checked = true;
    }
}
themeGlassEffect();
