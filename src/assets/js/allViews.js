/**
 * This file includes scripts which can be used on every page
 * @author Marc Specht
 */

/**
 * Toggles the input type between 'password' and 'text'
 * Requires ':password' input & '.show-pass' element
 * @author Marc Specht
 */
const showPassword = () => {
    const input = $(':password');
    const eye = $( ".show-pass" );

    for (let i = 0; i < input.length; i++) {
        eye[i].addEventListener('click', () => {
            if(input[i].type === 'password'){
                eye[i].classList.remove('fa-eye');
                eye[i].classList.add('fa-eye-slash');
                input[i].type = 'text';
            } else{
                input[i].type = 'password';
                eye[i].classList.remove('fa-eye-slash');
                eye[i].classList.add('fa-eye');
            }
        });
    }
};

const grantInternetAccess = () => {
    document.internetAcc.submit();
};

/**
 * Generate the price based on cents
 * @param cents
 * @returns {string} price
 * @author Marc Specht
 */
const generatePrice = (cents) => {
    return "&euro; " + (cents / 100).toFixed(2);
};

/**
 * Generate a price with fancy styling
 * @param cents amount of cents
 * @returns {string} Fancy price
 * @author Marc Specht
 */
const generateFancyPrice = (cents) => {
    let format = (cents / 100).toFixed(2);
    let getCents = format.toString().substr(-2);
    let getEuros = format.slice(0, -3);

    return `<div class="fancy-price">
                <span class="fancy-price--sign">&euro;</span>
                <span class="fancy-price--euro">${getEuros}</span><span class="fancy-price--cents">${getCents}</span>
            </div>`;
};

/**
 * @function Hidenavbar makes sure that the navbar isn't shown.
 * @author Jerome Tesselaar
 */
function hideNavbar(){
    $('.sidebar').hide();
}

/**
 * Display the amount of products in the shopping cart
 * @returns {number} amount of products
 * @author Marc Specht
 */
let updateCartAmount = () => {
    let currentSession = sessionManager.get("shoppingList");
    if(currentSession === undefined){
        return 0;
    } else{
        let amount = 0;
        for (let i = 0; i < currentSession.length; i++) {
            amount += currentSession[i].quantity;
        }
        return amount;
    }
};

/**
 * Puts a product into user session. Make new id if not exists. Increment quantity if exists.
 * @param id product-id
 * @author Marc Specht
 */
let addProductToCart = id => {
    console.log(id);
    let currentSession = sessionManager.get("shoppingList");
    if(currentSession.find(x => x.id === id)){
        let object = currentSession.find(x => x.id === id);
        if(object.quantity < 10) {
            object.quantity++;
        }
    } else{
        currentSession.push({id: id, quantity: 1});
    }
    sessionManager.set("shoppingList", currentSession);
};

/**
 * Removes a product into user session. Make new id if not exists. Increment quantity if exists.
 * @param id product-id
 * @author Marc Specht
 */
let decrementProductSession = id => {
    let currentSession = sessionManager.get("shoppingList");
    let object = currentSession.find(x => x.id === id);
    if(object.quantity > 0){
        object.quantity--;
    }
    sessionManager.set("shoppingList", currentSession);
};

/**
 * Get the current page controller name
 * @returns {string} current controller
 * @author Marc Specht
 */
let getCurrentController = () => {
    return location.hash.slice(1);
};