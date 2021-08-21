/**
 * The admin repository
 */
class AdminRepository {

    constructor() {
        this.route = "/admin";
        this.sessionManager = new SessionManager();
    }

    getSession(){
        return sessionManager.get("username");
    }

    async getUsers() {
        return await networkManager
            .doRequest(this.route + "/users", {session: this.getSession()});
    }

    async changeSeat(oldSeat, newSeat) {
        return await networkManager
            .doRequest(this.route + "/updateName", {oldSeat: oldSeat, newSeat: newSeat, session: this.getSession()}).then((data)=>console.log(data));
    }

    async changePassword(id, password) {
        return await networkManager
            .doRequest(this.route + "/updatePassword", {id: id, password: password, session: this.getSession()}).then((data)=>console.log(data));
    }

    async deleteUser(id){
        if(confirm(`Are you sure that you want to delete ${id}'s user account?`))
        return await networkManager
            .doRequest(this.route + "/deleteUser", {id: id, session: this.getSession()}).then((data)=>console.log(data));
        else return false;
    }

    async blockUser(seat, blockState){
        if(confirm(`Are you sure that you want to ${((blockState)?"":"un") + "block"} ${seat}'s user account and IP?`))
            return await networkManager
                .doRequest(this.route + "/blockUser", {seat: seat, blockState:blockState, session: this.getSession()}).then((data)=>console.log(data));
        else return false;
    }

    async getOpenOrders(){
        return await networkManager
            .doRequest(this.route + "/getOpenOrders", {});
    }

    async setOrder(orderNumber, status){
        return await networkManager
            .doRequest(this.route + "/setOrder", {orderNumber: orderNumber, status: status});
    }

    async isAdmin(){
        return await networkManager
            .doRequest(this.route + "/isAdmin", {session: this.getSession()});
    }

    async getNotification(){

        return await networkManager
            .doRequest(this.route + "/getNotification", {});
    }

    async deleteNotification(message, seatNumber){

        return await networkManager
            .doRequest(this.route + "/deleteNotification", {message: message, seatNumber: seatNumber})
    }

    async setNotification(message, seatNumber){

        return await networkManager
            .doRequest(this.route + "/setNotification", {message: message, seatNumber: seatNumber})
    }


}