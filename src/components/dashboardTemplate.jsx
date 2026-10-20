import { useContext } from "react"
import { StoreContext } from "../context/storecontext"

export default function DashBoardTemplate() {
const {dark} = useContext(StoreContext);
    return (
        <div className="">

            <div className="container rounded-5 mt-5 py-3">

                <div className="text-center mb-5">
                    <h1 className="fw-bold">Welcome To Admin Dashboard</h1>
                    <p className="text-success">
                        Manage and monitor your store from one place.
                    </p>
                </div>

                <div className="row mb-4">

                    {/* Products */}
                    <div className="col-12 col-md-6 col-lg-6 mb-2">
                        <div className={`${dark ? "bgCard" : "shadow"} card h-100 border-0 rounded-5`}>
                            <div className="card-body">
                                <h4 className="fw-bold mb-3">🛍️ Products</h4>
                                <ul className="list-unstyled mb-0">
                                    <li>✓ Search products</li>
                                    <li>✓ Filter products</li>
                                    <li>✓ Add products</li>
                                    <li>✓ Edit & update products</li>
                                    <li>✓ Delete products</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Orders */}
                    <div className="col-12 col-md-6 col-lg-6">
                        <div className={`${dark ? "bgCard" : "shadow"} card h-100 border-0 rounded-5`}>
                            <div className="card-body">
                                <h4 className="fw-bold  mb-3">📦 Orders</h4>

                                <ul className="list-unstyled mb-0">
                                    <li>✓ Search orders</li>
                                    <li>✓ Filter orders</li>
                                    <li>✓ View order details</li>
                                    <li>✓ Manage order status</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* Users */}
                    <div className="col-12 col-md-6 col-lg-4 mb-2">
                        <div className={`${dark ? "bgCard" : "shadow"} card h-100 border-0 rounded-5`}>
                            <div className="card-body">
                                <h4 className="fw-bold mb-3">👥 Users</h4>

                                <ul className="list-unstyled mb-0">
                                    <li>✓ Search users</li>
                                    <li>✓ View user information</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Brands */}
                    <div className="col-12 col-md-6 col-lg-4 mb-2">
                        <div className={`${dark ? "bgCard" : "shadow"} card h-100 border-0 rounded-5`}>
                            <div className="card-body">
                                <h4 className="fw-bold mb-3">🏷️ Brands</h4>

                                <ul className="list-unstyled mb-0">
                                    <li>✓ List brands</li>
                                    <li>✓ Add new brands</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="col-12 col-md-6 col-lg-4 mb-2">
                        <div className={`${dark ? "bgCard" : "shadow"} card h-100 border-0 rounded-5`}>
                            <div className="card-body">
                                <h4 className="fw-bold mb-3">📂 Categories</h4>

                                <ul className="list-unstyled mb-0">
                                    <li>✓ List categories</li>
                                    <li>✓ Add new categories</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}