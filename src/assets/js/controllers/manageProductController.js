/**
 * @deprecated
 * @extends Controller
 */
class ManageProductController extends Controller {

    constructor() {
        // hideNavbar();
        super("views/manageProducts.html");
    }

    setup(data){
        this.viewData = $(data);
        this.adminRepo = new AdminRepository();
        this.shopRepository = new ShopRepository();
        this.shopRepository.loadAllProducts().then((data)=> {
            this.shopRepository.getCategories().then((categoryData) => {
                this.products = data;
                this.categories = categoryData;
                this.htmlBuilder()});
            });
    }

    htmlBuilder(){
        let list = this.viewData.find(".manage-product-list");
        let blockTemplate = list.find(".template.manage-product-block");
        let dropdownTemplate = list.find(".template.dropdown");

        let dropdown = dropdownTemplate.clone();
        let dropdownItemList = dropdown.find(".dropdown-menu");
        let templateEntry = dropdownItemList.find("a");

        for(let i = 0; i < this.categories.length; i++){
            console.log(this.categories);
            let entry = templateEntry.clone();
            entry.html(this.categories[i].category);

            entry.on("click", (data) => {
                console.log("click");
                let string = data.html();
                data.parent().parent().find("button").html(string);
            });

            dropdownItemList.append(entry);
        }
        templateEntry.remove();

        console.log(this.products);
        for(let i = 0; this.products.length > i; i++){
            let block = blockTemplate
                .clone()
                .removeClass("template");
            block.find(".dropdown").replaceWith(dropdown.clone());
            block.find(".manage-product-image").attr("src", this.products[i].image);
            block.find("textarea").html(this.products[i].description);
            list.append(block);
        }

        blockTemplate.remove();
        dropdownTemplate.remove();

        this.searchBox = this.viewData.find("#searchUsers");
        this.searchBox.on("input", () => this.filterUsers());

        $(".content").empty().append(this.viewData);

        $(".sidebar").addClass("manage-fixed");
    }

    filterUsers(){
        let list = document.getElementsByClassName("manage-user-list")[0];
        let users = list.getElementsByClassName("manage-block");
        let string = this.searchBox.val().toUpperCase();

        for(let i = 0; i < users.length; i++){
            let seat = users[i].getElementsByClassName("manage-seat-text-wrapper")[0].getElementsByTagName("h1")[0];
            if(!seat.innerHTML.includes(string)) $(users[i]).hide();
            else $(users[i]).show();
        }
    }
}