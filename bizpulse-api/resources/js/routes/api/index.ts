import sales from './sales'
import alerts from './alerts'
import inventory from './inventory'
import customer from './customer'
const api = {
    sales: Object.assign(sales, sales),
alerts: Object.assign(alerts, alerts),
inventory: Object.assign(inventory, inventory),
customer: Object.assign(customer, customer),
}

export default api