/**
 * Exports product and analytic data.
 * @author Noah Visser & Kenneth Mensah
 * @extends Controller
 */
class ManageDataController extends Controller{

    /**
     * Create an instance of the controller.
     * @public
     */
    constructor() {
        super("views/manageData.html");
        this.statRepo = new statisticsRepository();
    }

    /**
     * Called when the upload.html has been loaded
     *
     * @protected
     * @param data {HTMLElement} The content to be loaded on the page.
     * @author Noah Visser & Kenneth Mensah
     */
    setup(data) {
        $(".content").empty().append($(data));

        const fileInput = document.getElementById("productCSV"), // productCSV id in HTML

            /**
             * This function checks for changes at id=productCSV and reads this data. This data gets turned into an array
             * and gets fed into the importProducts function, which adds the products to the database.
             *
             * @author Kenneth Mensah & Noah Visser
             */
            readFile = function () {
                var reader = new FileReader(); // FileReader object for reading the .csv files
                let array = []; // array used for converting .csv to array
                reader.onload = function () {
                    array = reader.result.split("\n");
                    (new statisticsRepository()).importProducts(array).finally(() => app.loadController("manageData"));
                };
                // start reading the file. When it is done, calls the onload event defined above.
                reader.readAsBinaryString(fileInput.files[0]);
                console.log(array);
            };

        /**
         * Eventlistener for productCSV. The eventlistener asks for verification before delete the rows in the products
         * table and then uses the readFile function.
         *
         * @private
         * @author Kenneth Mensah & Noah Visser
         */
        fileInput.addEventListener('change', () => {
            if(confirm(`Are you sure that you want to replace all product data?`))
            (new statisticsRepository()).emptyProducts().then(readFile);
            else app.loadController("manageData");
        });

        $("#products-import").on("click", ()=> {
            $(fileInput).click();

        });

        $("#products-export").on("click", ()=> {
            this.statRepo.exportProducts().then((data)=> $("#download").attr("src", `./assets/csv/${data}.csv`));
        });

        $("#visits-export").on("click", ()=> {
            this.statRepo.getAnalytics().then((data)=> $("#download").attr("src", `./assets/csv/${data}.csv`));
        });

        $("#orders-export").on("click", ()=> {
            this.statRepo.getAllOrders().then((data)=> $("#download").attr("src", `./assets/csv/${data}.csv`));
        });
    }


}
