const { formatPrice, date } = require('../../lib/utils')
const Order = require('../models/Order')
const LoadProductService = require('./LoadProductService')
const User = require('../models/User')


async function format(order) {
    order.product = await LoadProductService.load('productWithDeleted', {//detalhes produto
        where: { id:order.product_id }
    })
    
    order.buyer = await User.findOne({//detalhes comprador
        where: { id:order.buyer_id }
    })

    order.seller = await User.findOne({//detalhes vendedor
        where: { id:order.seller_id }
    })

    order.formatedPrice = formatPrice(order.price)//formatando preço
    order.formatedTotal = formatPrice(order.total)

    const statuses = {//formatando status
        open: 'Aberto',
        sold: 'Vendido',
        canceled: 'Cancelado'
    }

    order.formatedStatus = statuses[order.status]

    const updatedAt = date(order.updated_at)
    order.formatedUpdatedAt = `${order.formatedStatus} em ${updatedAt.day}/${updatedAt.month}/${updatedAt.year} às ${updatedAt.hour}h${updatedAt.minutes}`

    return order
}

const LoadService = {
    load(service, filter) {
        this.filter = filter
        return this[service]()
    },
    async order() {
        try {
            const order = await Order.findOne(this.filter)
            return format(order)

        } catch (error) {
            console.error(error);
        }
    },
    async orders() {
        try {
            const orders = await Order.findAll(this.filter)

            const ordersPromise = orders.map(format)
            return Promise.all(ordersPromise)

        } catch (error) {
            console.error(error);
        }
    },
    format,
}

module.exports = LoadService