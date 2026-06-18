import AdminDashboardController from './AdminDashboardController'
import TenantController from './TenantController'
import TenantConnectionController from './TenantConnectionController'
import TenantMappingController from './TenantMappingController'
const Admin = {
    AdminDashboardController: Object.assign(AdminDashboardController, AdminDashboardController),
TenantController: Object.assign(TenantController, TenantController),
TenantConnectionController: Object.assign(TenantConnectionController, TenantConnectionController),
TenantMappingController: Object.assign(TenantMappingController, TenantMappingController),
}

export default Admin