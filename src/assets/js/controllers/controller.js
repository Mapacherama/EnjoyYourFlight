/**
 * Controller framework
 */
class Controller {

    constructor(path){
            $.get(path)
                .done((data) => this.setup(data))
                .fail(() => this.error());
    }

    error(){
        $(".content").html("Failed to load content!");
    }

}