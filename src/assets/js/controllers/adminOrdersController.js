/**
 * Controller for the admin orders page
 * @extends Controller
 */
class AdminOrdersController extends Controller {

    constructor() {
        super("views/adminOrders.html");
        this.repo = new AdminRepository();
    }

    setup(data){
        this.viewData = $(data);
        $(".content").empty().append($(data));
        this.repo.getOpenOrders().then(o => this.getOpenOrders(o));
    }

    /**
     * Generate all open orders
     * @param {Object} data
     */
    getOpenOrders(data){
        let container = $('.admin-order-container');
        let templateOrder = $('.template-order');

        // Make new array
        let dataNumbersMerged = [];

        // Loop over data
        for (let i = 0; i < data.length; i++) {
            let object = dataNumbersMerged.find(x => x[0].order_number === data[i].order_number);
            // push new item if number not exists
            if(object === undefined){
                dataNumbersMerged.push([data[i]]);
            // push new product into existing number
            } else{
                let index = dataNumbersMerged.findIndex(x => x[0].order_number === data[i].order_number);
                dataNumbersMerged[index].push(data[i]);
            }
        }

        // Loop over new array and fill the HTML :)
        for (let i = 0; i < dataNumbersMerged.length; i++) {
            let order = templateOrder.clone().removeClass('template-order').addClass('order');
            const orderNumber = dataNumbersMerged[i][0].order_number;
            order.find('.order-order-number').html("#" + this.generateOrder(orderNumber));
            order.find('.order-seat-number').html(dataNumbersMerged[i][0].seat_number);

            order.find('#orderComplete').on('click', () => this.handleOrderComplete(orderNumber));
            order.find('#orderCancel').on('click', () => this.handleOrderCancel(orderNumber));

            let templateProduct = order.find('.template-product');
            let productContainer = order.find('.order-products');

            let totalPrice = 0;

            for (let j = 0; j < dataNumbersMerged[i].length; j++) {
                let product = templateProduct.clone().removeClass('template-product').addClass('product');
                let productData = dataNumbersMerged[i][j];
                product.find('.order-title').html(productData.title);
                product.find('.order-price').html("&nbsp;(" + generatePrice(productData.price * productData.quantity) + ")");
                product.find('.order-quantity').html(productData.quantity + "x ");

                totalPrice += productData.price * productData.quantity;

                productContainer.append(product);
            }

            order.find(".order-total-price").html(generatePrice(totalPrice));
            templateProduct.remove();
            container.append(order);
        }
        console.log(dataNumbersMerged);
        // console.log(newObj.findIndex(x => x[0].order_number === 8489923));
        // console.log(newObj[data[1].order_number[0]]);
        // console.log(newObj);

        //
        // for (let i = 0; i < data.length; i++) {
        //
        // }
        templateOrder.remove();
    }

    handleOrderComplete(orderNumber){
        this.repo.setOrder(orderNumber, 1).then(() => app.loadController("orders"));
    }

    handleOrderCancel(orderNumber){
        this.repo.setOrder(orderNumber, 2).then(() => app.loadController("orders"));
    }

    generateOrder(number){
        let newString = number.toString();
        if(newString.length < 5){
            while(newString.length < 5){
                newString = 0 + newString;
            }
            return newString;
        }
        else{
            return number;
        }
    }
}