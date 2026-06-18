import Api from './Api'
import Settings from './Settings'
import Admin from './Admin'
const Controllers = {
    Api: Object.assign(Api, Api),
Settings: Object.assign(Settings, Settings),
Admin: Object.assign(Admin, Admin),
}

export default Controllers