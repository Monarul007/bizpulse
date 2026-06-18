import SalesController from './SalesController'
import AlertController from './AlertController'
import InventoryController from './InventoryController'
import CustomerController from './CustomerController'
const Api = {
    SalesController: Object.assign(SalesController, SalesController),
AlertController: Object.assign(AlertController, AlertController),
InventoryController: Object.assign(InventoryController, InventoryController),
CustomerController: Object.assign(CustomerController, CustomerController),
}

export default Api