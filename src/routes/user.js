import Main from '@/views/user/Main';

import Dashboard from '@/views/user/Dashboard';
import WebsiteView from '@/views/user/website/Index';

export default {
    path: '/u',
    component: Main,
    children: [
        {
            path: 'dashboard',
            name: 'user-dashboard',
            component: Dashboard,
        },
        {
            path: 'website',
            name: 'user-website',
            component: WebsiteView,
        }
    ]
}
