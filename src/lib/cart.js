const { formatPrice } = require('./utils')

const Cart = {
    init(oldCart) {
        if(oldCart) {
            this.items = oldCart.items
            this.total = oldCart.total
        } else {
            this.items = []
            this.total = {
                quantity: 0,
                price: 0,
                formatedPrice: formatPrice(0)
            }
        }

        return this
    },

    addOne(product) {
        let inCart = this.getCartItem(product.id)//ver se o produto já existe no carrinho

        if(!inCart) {//se não existe
            inCart = {
                product: {
                    ...product,
                    formatedPrice: formatPrice(product.price)
                },
                quantity: 0,
                price: 0,
                formatedPrice: formatPrice(0)
            }

            this.items.push(inCart)
        }
        if(inCart.quantity >= product.quantity) return this
        //update item
        inCart.quantity++
        inCart.price = inCart.product.price * inCart.quantity
        inCart.formatedPrice = formatPrice(inCart.price)
        //update cart
        this.total.quantity++
        this.total.price += inCart.product.price
        this.total.formatedPrice = formatPrice(this.total.price)

        return this
    },

    removeOne(productId) {
        const inCart = this.getCartItem(productId)//pegar item do carrinho

        if(!inCart) return this
        //atualizar item
        inCart.quantity--
        inCart.price = inCart.product.price * inCart.quantity
        inCart.formatedPrice = formatPrice(inCart.price)
        //atualizar carrinho
        this.total.quantity--
        this.total.price -= inCart.product.price
        this.total.formatedPrice = formatPrice(this.total.price)

        if(inCart.quantity < 1) {
            this.items = this.items.filter(item => item.product.id != inCart.product.id)
            
            return this
        }
        return this
    },

    delete(productId) {
        const inCart = this.getCartItem(productId)

        if(!inCart) return this

        if(this.items.length > 0) {
            this.total.quantity -= inCart.quantity
            this.total.price -= (inCart.product.price * inCart.quantity)
            this.total.formatedPrice = formatPrice(this.total.price)
        }
        this.items = this.items.filter(item => inCart.product.id != item.product.id)
        return this
    },

    getCartItem(productId) {
        return this.items.find(item => item.product.id == productId)
    }
}

module.exports = Cart