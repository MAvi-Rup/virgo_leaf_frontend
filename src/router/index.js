import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import ViewFarmersView from '../views/ViewFarmersView.vue'
import DetailFarmersView from '../views/DetailFarmersView.vue'
import BaleDetailView from '../views/BaleDetailView.vue'
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/registration',
			component: () => import('../views/FarmerRegistrationView.vue')
		},
		{
			path: '/transport-permit',
			component: () => import('../views/TransportPermitView.vue')
		},
		{
			path: '/loan',
			component: () => import('../views/LoanSanctionView.vue')
		},
		{
			path: '/all-farmers',
			component: ViewFarmersView,
		},
		{
			path: '/products',
			component:() => import('../views/ProductViewComponent.vue'),
		},
		{
			path: '/farmers/:id',
			component: DetailFarmersView,
		},
		{
			path: '/transport-permit/:id',
			component: BaleDetailView,
		},
		{
			path: '/qrCode',
			component: () => import('../views/PrintQrCodeView.vue')
		},
		{
			path: '/add-weight',
			component: () => import('../views/WeightView.vue')
		},
		{
			path: '/tobacco-purchase',
			component: () => import('../views/TobaccoPurchaseView.vue')
		},
		
	],
})

export default router