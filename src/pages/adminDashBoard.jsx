import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { AdminContext } from "../context/adminContext"
import { StoreContext } from "../context/storecontext";
import AccessDenied from "../components/accessDenied";
import { LoginContext } from "../context/loginContext";
import DashBoardTemplate from "../components/dashboardTemplate";

export default function AdminDashBoard() {

    const { adminProducts, addProductsAdmin, getProductsAdmin, deleteProductAdmin, updateProductAdmin, getProductAdmin,
        setEditThumbFile, setEditImgsFile, editProductDto, setEditProductDto,
        setBrandParams, setTypeParams, setSearchParams, setSortParams, setPageIndexParams, setPageSizeParams,
        productDto, setProductDto, setThumbnailFile, setImageFiles,
        adminCategories, adminBrands, orders, users,
        addCategory, removeCategory, addBrand, removeBrand,
        getAdminOrders, getAdminUsers, getAdminCategories, getAdminBrands,
        roles, getAllRoles, addUpdateUserRole,
        activeNav, setActiveNav } = useContext(AdminContext);

    const { dark } = useContext(StoreContext);
    const { isAdmin } = useContext(LoginContext);
    useEffect(() => {
        getProductsAdmin();
        getAdminCategories();
        getAdminBrands();

    }, [
        getProductsAdmin, getAdminCategories, getAdminBrands, setBrandParams, setTypeParams, setSearchParams, setSortParams, setPageIndexParams, setPageSizeParams,
    ]);

    const handleProducts = async () => {
        setActiveNav('products');

    }
    const handleOrders = async () => {
        await getAdminOrders();
        setActiveNav('orders')
    }
    const handleUsers = async () => {
        await getAdminUsers();
        setActiveNav('users')
    }
    const handleCategories = async () => {
        await getAdminCategories();
        setActiveNav('categories')
    }
    const handleBrands = async () => {
        await getAdminBrands();

        setActiveNav('brands')
    }

    const [brandAdd, setBrandAdd] = useState();
    const [categoryAdd, setCategoryAdd] = useState();
    const [brandRemove, setBrandRemove] = useState();
    const [categoryRemove, setCategoryRemove] = useState();

    const handleAddBrand = async () => {
        const newBrand = brandAdd;
        await addBrand(newBrand);
        setTimeout(() => {
            window.location.reload();
        }, 2500);
    }
    const handleAddCategory = async () => {
        const newCategory = categoryAdd;
        await addCategory(newCategory);
        setTimeout(() => {
            window.location.reload();
        }, 2500);
    }

    const hadnleRemoveBrand = async () => {
        const brandToRemove = brandRemove;
        await removeBrand(brandToRemove);
        setTimeout(() => {
            window.location.reload();
        }, 2500);
    }

    const handleRemoveCategory = async () => {
        const CategoryToRemove = categoryRemove;
        await removeCategory(CategoryToRemove);
        setTimeout(() => {
            window.location.reload();
        }, 2500);
    }

    const handleGetAllRoles = async () => {

        await getAllRoles();


    }

    const [emailForRole, setEmailForRole] = useState("");
    const [userNewRole, setUserNewRole] = useState("");
    const handleUpdateUserRole = async () => {
        const email = emailForRole;
        const role = userNewRole;

        const res = await addUpdateUserRole(email, role);
        if (res) {
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        }

    }


    const [orderById, setOrderById] = useState("");
    const [orderByEmail, setOrderByEmail] = useState("");
    const [orderByDate, setOrderByDate] = useState("");
    const [orderByCity, setOrderByCity] = useState("");
    const filteredOrders = orders.filter(o =>
        (orderById === "" || o.id.toLowerCase().includes(orderById.toLowerCase())) &&
        (orderByEmail === "" || o.buyerEmail.toLowerCase().includes(orderByEmail.toLowerCase())) &&
        (orderByDate === "" || o.orderDate.startsWith(orderByDate)) &&
        (orderByCity === "" || o.shipToAddress.city.toLowerCase().includes(orderByCity.toLowerCase()))
    );


    const products = adminProducts?.data || [];
    const productsCount = adminProducts?.count || 0;
    const pageIndex = adminProducts?.pageIndex || 1;
    const pageSize = adminProducts?.pageSize || 25;
    const totalPages = Math.ceil(productsCount / pageSize);
    const addNewProduct = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        const newProduct = productDto;
        console.log("Sending:", newProduct); // <-- add this

        const res = await addProductsAdmin(newProduct, token);
        if (res !== null) {
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    }

    const [updateModal, setUpdateModal] = useState(false);

    const handleUpdateProduct = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await getProductAdmin(id, token);

        if (res !== null) {
            const currentBrand = adminBrands.find(b => b.name === res.productBrand);
            const currentType = adminCategories.find(b => b.name === res.productType);
            setEditProductDto({ ...res, brandId: currentBrand?.id, typeId: currentType?.id });
            setUpdateModal(true);
        }
    }

    const updateProduct = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const newProduct = editProductDto;
        console.log("Updating:", newProduct); // <-- add this

        const res = await updateProductAdmin(id, newProduct, token);
        if (res === 200) {
            setTimeout(() => {
                setUpdateModal(false);
            }, 500);
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    }

    const deleteProduct = async (id) => {
        var token = localStorage.getItem("token");
        if (!token) return;
        var alert = window.confirm(`This Product ${id} Will Be Permenantly Deleted \n Do You Want To Proceed ?`)

        if (alert) {
            var res = await deleteProductAdmin(id, token);
            if (res === true) {
                console.log("Product Is Deleted Successfully")
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
            else console.log("Failed To Delete Product");

        }
    }

    const nextPage = () => pageIndex < totalPages ? setPageIndexParams(pageIndex + 1) : false;
    const firstPage = () => pageIndex > 0 ? setPageIndexParams(1) : false;
    const lastPage = () => pageIndex < totalPages ? setPageIndexParams(totalPages) : false;
    const prevPage = () => pageIndex > 1 ? setPageIndexParams(pageIndex - 1) : false;
    const setpageSize = (e) => {
        const newPageSize = Number(e);
        setPageSizeParams(newPageSize);
        const newTotalPages = Math.ceil(productsCount / newPageSize);
        if (pageIndex > newTotalPages) { setPageIndexParams(1) };
    };
    const [newSearch, setNewSearch] = useState("");
    const handleSearch = (value) => {
        setTimeout(() => {
            setSearchParams(value);
            setNewSearch("");
        }, 1000);
    }
    return (
        <>
            <div style={{ minHeight: "74vh" }}>
                {isAdmin &&
                    <div className="d-flex align-items-center">
                        {/*Admin Navigation Buttons*/}
                        <div className="position-fixed adminNav" style={{ top: "20vh" }}>
                            <div className="d-flex flex-column gap-1">
                                <button onClick={() => handleProducts()} style={{ borderRadius: "0px 20px 20px 0px" }} className="badge pe-3 py-0 shadow btn btn-primary"><span>Products</span></button>
                                <button onClick={() => handleOrders()} style={{ borderRadius: "0px 20px 20px 0px" }} className="badge pe-3 py-0 shadow btn btn-success"><span>Orders</span></button>
                                <button onClick={() => handleUsers()} style={{ borderRadius: "0px 20px 20px 0px" }} className="badge pe-3 py-0 shadow btn btn-danger"><span>Users</span></button>
                                <button onClick={() => handleBrands()} style={{ borderRadius: "0px 20px 20px 0px" }} className="badge pe-3 py-0 shadow btn btn-dark"><span>Brands</span></button>
                                <button onClick={() => handleCategories()} style={{ borderRadius: "0px 20px 20px 0px" }} className="badge pe-3 py-0 shadow btn btn-secondary"><span>Categories</span></button>
                            </div>
                        </div>

                        <div className="container text-center mb-3">

                            {/*Admin Products DashBoard*/}
                            {(activeNav === "products") && <div className="container mt-5">

                                {/*Page Navigations (Search, Filter, Sort, Page Size, Page Index)*/}
                                <div className="row d-flex gap-1 justify-content-center align-items-center mt-3">
                                    <div className="col-lg-5">
                                        <div className="input-group">
                                            <input value={newSearch}
                                                type="text" style={{ height: "40px" }} className=" form-control bg-secondary-subtle" placeholder="Search"
                                                aria-label="Search" onChange={e => { setNewSearch(e.target.value); }} />
                                            <button className="btn btn-secondary button-addon2" onClick={() => handleSearch(newSearch)} type="button"><i className="bi bi-search"></i></button>
                                        </div>
                                    </div>

                                    <div className="col-lg-2">

                                        <select style={{ height: "40px" }} className="form-control bg-secondary-subtle" placeholder="Filter" onChange={e => setTypeParams(e.target.value)}>
                                            <option value="">Categories-All</option>
                                            {adminCategories.map(c => {
                                                return (
                                                    <option key={c.id} value={c.id}>{c.name}</option>)
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-lg-2">
                                        <select style={{ height: "40px" }} className="form-control bg-secondary-subtle" placeholder="Filter" onChange={e => setBrandParams(e.target.value)}>
                                            <option value="">Brands-All</option>
                                            {adminBrands.map(c => {
                                                return (
                                                    <option key={c.id} value={c.id}>{c.name}</option>)
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-lg-1 ms-2 d-flex flex-column gap-1 align-items-center">
                                        <select className="rounded-3 ps-1 border-0 bg-secondary-subtle" placeholder="Sort" onChange={e => setSortParams(e.target.value)}>
                                            <option value="0">Sort</option>
                                            <option value="1">A-Z</option>
                                            <option value="2">Z-A</option>
                                            <option value="3">Price-Up</option>
                                            <option value="4">Price-Down</option>
                                        </select>
                                        <select className="rounded-3 ps-1 border-0 bg-secondary-subtle" placeholder="Count" onChange={e => setpageSize(e.target.value)}>
                                            <option value="25">Page Count</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <span>Products Found : <span className="text-primary fw-bold">{productsCount}</span></span>
                                </div>
                                <div className="mt-2">
                                    <button type="button" className="btn btn-primary badge rounded-5 px-3 py-1" data-bs-toggle="modal" data-bs-target="#newProductModal">
                                        New Product <i className="bi bi-plus-circle"></i>
                                    </button>
                                </div>

                                {/*Togglable New Product Modal */}
                                <div className="modal fade" id="newProductModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg modal-dialog-scrollable">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="productModalLabel">Product Details</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="row mb-3">
                                                    <div className="col-md-8">
                                                        <div className="input-group">
                                                            <span className="input-group-text">Name</span>
                                                            <input onChange={e => { setProductDto({ ...productDto, name: e.target.value }) }}
                                                                type="text" className="form-control" id="productName" placeholder="Product name" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="input-group">
                                                            <span className="input-group-text">Qty</span>
                                                            <input onChange={e => { setProductDto({ ...productDto, stockQuantity: Number(e.target.value) }) }}
                                                                type="number" className="form-control" id="stockQuantity" placeholder="Stock quantity" aria-label="Stock Quantity" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <select onChange={e => { setProductDto({ ...productDto, TypeId: e.target.value }) }}
                                                                type="text" className="form-control" id="productType" placeholder="Product Type" aria-label="Product Type">
                                                                <option value="">adminCategories-All</option>
                                                                {adminCategories.map(c => {
                                                                    return (
                                                                        <option key={c.id} value={c.id}>{c.name}</option>)
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <select onChange={e => { setProductDto({ ...productDto, BrandId: e.target.value }) }}
                                                                type="text" className="form-control" id="productBrand" placeholder="Brand" aria-label="Product Brand" >
                                                                <option value="">adminBrands-All</option>
                                                                {adminBrands.map(c => {
                                                                    return (
                                                                        <option key={c.id} value={c.id}>{c.name}</option>)
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="input-group">
                                                        <span className="input-group-text">Desc</span>
                                                        <textarea onChange={e => { setProductDto({ ...productDto, description: e.target.value }) }}
                                                            placeholder="Product Description" className="form-control" id="productDescription" aria-label="Description"></textarea>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text">$</span>
                                                            <input onChange={e => { setProductDto({ ...productDto, price: Number(e.target.value) }) }}
                                                                type="number" step="0.01" className="form-control" id="price" placeholder="Price" aria-label="Price" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="input-group mb-3">
                                                            <input onChange={e => { setProductDto({ ...productDto, discountPercentage: Number(e.target.value) }) }}
                                                                type="number" className="form-control" id="discountPercentage" placeholder="Discount" aria-label="Discount Percentage" />
                                                            <span className="input-group-text">%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="input-group ">
                                                        <input onChange={e => setThumbnailFile(e.target.files[0] ?? null)}
                                                            type="file" className="form-control" id="thumbnailUrl" placeholder="Thumbnail URL" aria-label="Thumbnail URL" />
                                                        <span className="input-group-text">Thumbnail</span>
                                                    </div>
                                                    <div className="form-text">You can select one image as thumbnail.</div>
                                                    <div className="input-group">
                                                        <input onChange={e => setImageFiles(Array.from(e.target.files))}

                                                            type="file" className="form-control" id="productImages" multiple accept="image/*" />
                                                        <span className="input-group-text">Images</span>
                                                    </div>
                                                    <div className="form-text">You can select multiple product images.</div>
                                                </div>


                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" onClick={addNewProduct} className="btn btn-primary" id="saveProductBtn">Save Product</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*=============Product=============*/}
                                {products.map(p => {
                                    return (
                                        <div style={{ minHeight: "90px", position: "relative", zIndex: "1" }}
                                            className={`${dark ? "bgNav" : "bg-light"} border-1 rounded-3 shadow my-3 d-flex gap-2 py-2 px-3 align-items-center justify-content-between`}
                                            key={p.id} >
                                            <div className="d-flex gap-3 align-items-center w-50">
                                                <img alt="Product Thumbnail" src={p.thumbnailUrl || "/image-not-found.png"}
                                                    onError={(e) => {
                                                        e.currentTarget.onerror = null;
                                                        e.currentTarget.src = "/image-not-found.png";
                                                    }}
                                                    className="rounded-3 " style={{ width: "50px" }} />
                                                <div style={{ maxWidth: "150px" }} className="text-start">
                                                    <Link to={`../product/${p.id}`}> <span >{p.name.trim().length > 20 ? p.name.trim().slice(0, 20) + `..` : p.name}</span></Link>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-wrap gap-3 w-25">
                                                <span style={{ width: "80px" }} className="text-start text-success ">{p.price}<span className="fw-bold"> $</span></span>
                                                <span className="text-start">{p.discountPercentage}<span className="text-danger fw-semibold">% Off</span></span>
                                                <span className="text-start"><span className="text-primary fw-semibold">Stock </span>{p.stockQuantity}</span>
                                            </div>

                                            {/*Togglable Edit Product Modal */}
                                            {updateModal && <div className="modal d-block " id="editProductModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                                                    <div className="modal-content border-0 ">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="productModalLabel">Update Product - ID : <span className="text-muted">{editProductDto.id}</span></h5>
                                                            <button type="button" onClick={() => setUpdateModal(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="row mb-3">
                                                                <div className="col-md-8">
                                                                    <div className="input-group">
                                                                        <span className="input-group-text">Name</span>
                                                                        <input value={editProductDto.name} onChange={e => { setEditProductDto({ ...editProductDto, name: e.target.value }) }}
                                                                            type="text" className="form-control" id="productName" placeholder="Product name" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="input-group">
                                                                        <span className="input-group-text">Qty</span>
                                                                        <input value={editProductDto.stockQuantity} onChange={e => { setEditProductDto({ ...editProductDto, stockQuantity: Number(e.target.value) }) }}
                                                                            type="number" className="form-control" id="stockQuantity" placeholder="Stock quantity" aria-label="Stock Quantity" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <select value={editProductDto.typeId} onChange={e => { setEditProductDto({ ...editProductDto, TypeId: e.target.value }) }}
                                                                            type="text" className="form-control" id="productType" placeholder="Product Type" aria-label="Product Type">
                                                                            {adminCategories.map(c => {
                                                                                return (
                                                                                    <option key={c.id} value={c.id}>{c.name}</option>)
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="mb-3">
                                                                        <select value={editProductDto.brandId} onChange={e => { setEditProductDto({ ...editProductDto, BrandId: e.target.value }) }}
                                                                            type="text" className="form-control" id="productBrand" placeholder="Brand" aria-label="Product Brand" >
                                                                            {adminBrands.map(c => {
                                                                                return (
                                                                                    <option key={c.id} value={c.id}>{c.name}</option>)
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3">
                                                                <div className="input-group">
                                                                    <span className="input-group-text">Desc</span>
                                                                    <textarea value={editProductDto.description} onChange={e => { setEditProductDto({ ...editProductDto, description: e.target.value }) }}
                                                                        placeholder="Product Description" className="form-control" id="productDescription" aria-label="Description"></textarea>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="input-group mb-3">
                                                                        <span className="input-group-text">$</span>
                                                                        <input value={editProductDto.price} onChange={e => { setEditProductDto({ ...editProductDto, price: Number(e.target.value) }) }}
                                                                            type="number" step="0.01" className="form-control" id="price" placeholder="Price" aria-label="Price" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="input-group mb-3">
                                                                        <input value={editProductDto.discountPercentage} onChange={e => { setEditProductDto({ ...editProductDto, discountPercentage: Number(e.target.value) }) }}
                                                                            type="number" className="form-control" id="discountPercentage" placeholder="Discount" aria-label="Discount Percentage" />
                                                                        <span className="input-group-text">%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3">
                                                                <div className="input-group ">
                                                                    <input onChange={e => setEditThumbFile(e.target.files[0] ?? null)}
                                                                        type="file" className="form-control" id="thumbnailUrl" placeholder="Thumbnail URL" aria-label="Thumbnail URL" />
                                                                    <span className="input-group-text">Thumbnail</span>
                                                                </div>
                                                                <div className="form-text">You can select one image as thumbnail.</div>
                                                                <div className="input-group">
                                                                    <input onChange={e => setEditImgsFile(Array.from(e.target.files))}

                                                                        type="file" className="form-control" id="productImages" multiple accept="image/*" />
                                                                    <span className="input-group-text">Images</span>
                                                                </div>
                                                                <div className="form-text">You can select multiple product images.</div>
                                                            </div>


                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" onClick={() => setUpdateModal(false)} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" onClick={() => updateProduct(p.id)} className="btn btn-primary" id="saveProductBtn">Save Product</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}

                                            <div className="d-flex flex-wrap gap-1">
                                                <button title="Edit" onClick={() => handleUpdateProduct(p.id)} className="btn btn-warning badge rounded-2 p-1 shadow"><i className="bi bi-pencil-square"></i></button>
                                                <button title="Delete" onClick={() => deleteProduct(p.id)} className="btn btn-danger badge rounded-2 p-1 shadow"><i className="bi bi-trash"></i></button>
                                            </div>
                                        </div>)
                                })}

                                <div className="container d-flex justify-content-center mt-3">
                                    <div className=" d-flex gap-3 " style={{ maxHeight: "35px" }}>
                                        <Link className="fs-2" onClick={prevPage} title="Previous Page" hidden={pageIndex === 1}><i className="bi bi-chevron-double-left"></i></Link>
                                        <Link className="fs-5 my-2 text-dark fw-bold text-decoration-none" title="First Page" onClick={firstPage} hidden={pageIndex <= 1}>{pageIndex - pageIndex + 1}</Link>
                                        <h4 className='text-center my-1 fw-bold mb-1 text-secondary'>{pageIndex}</h4>
                                        <Link className="fs-5 my-2 text-dark fw-bold text-decoration-none" title="Last Page" onClick={lastPage} hidden={pageIndex >= totalPages}>{totalPages}</Link>
                                        <Link className="fs-2" onClick={nextPage} title="Next Page" hidden={pageIndex >= totalPages}><i className="bi bi-chevron-double-right"></i></Link>
                                    </div>
                                </div>
                            </div>}

                            {/*Admin Orders DashBoard*/}
                            {(activeNav === "orders") && (<div className="container mt-5">
                                <div>
                                    <div className="row mb-3">
                                        <div className="col-lg-3">
                                            <div className="input-group">
                                                <input value={orderById}
                                                    type="text" style={{ height: "40px" }} className=" form-control mb-1 bg-secondary-subtle"
                                                    placeholder="Search Orders By Id" onChange={e => setOrderById(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="input-group">
                                                <input value={orderByEmail}
                                                    type="text" style={{ height: "40px" }} className=" form-control mb-1 bg-secondary-subtle"
                                                    placeholder="Search Orders By Buyer Email" onChange={e => setOrderByEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="input-group">
                                                <input value={orderByCity}
                                                    type="text" style={{ height: "40px" }} className=" form-control mb-1 bg-secondary-subtle"
                                                    placeholder="Search Orders By City" onChange={e => setOrderByCity(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="input-group">
                                                <input value={orderByDate}
                                                    type="date" style={{ height: "40px" }} className=" form-control mb-1 bg-secondary-subtle"
                                                    placeholder="Search Orders By Date" onChange={e => setOrderByDate(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    {filteredOrders.map(o => {
                                        return (
                                            <div key={o.id} >
                                                <div className="card shadow-sm mb-3">
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                                            <div>
                                                                <h5 className="card-title mb-1"> Order #{o.id} </h5>
                                                                <small className="text-muted"> {new Date(o.orderDate).toLocaleString()} </small>
                                                            </div>
                                                            <span className="badge bg-primary">{o.status}</span>
                                                        </div>
                                                        <div className="row ">
                                                            <div className="col-md-4"><strong>Buyer</strong> <p className="mb-0">{o.buyerEmail}</p> </div>
                                                            <div className="col-md-4"><strong>Delivery Method</strong><p className="mb-0">{o.deliveryMethod}</p></div>
                                                            <div className="col-md-4"><strong>Shipping Address</strong>
                                                                <p className="mb-0">{o.shipToAddress?.city},{" "}{o.shipToAddress?.street}</p> </div>
                                                        </div>
                                                        <hr />
                                                        <h4 className="text-success">Items</h4>
                                                        {o.items?.map(item => (
                                                            <div key={item.productId} className="d-flex justify-content-between border-bottom py-2" >
                                                                <span>{item.productName} × {item.quantity}</span>
                                                                <span>{item.price} USD </span>
                                                            </div>
                                                        ))}
                                                        <div className="text-end mt-3">
                                                            <p className="mb-1"> Subtotal: <strong>{o.subTotal} EGP</strong> </p>

                                                            <p className="mb-1">Delivery: <strong>{o.deliveryCost} EGP</strong></p>
                                                            <h5>Total: {o.total} EGP</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>)}


                            {/*Admin Users DashBoard*/}
                            {(activeNav === "users") && <div className="container mt-5">
                                <div className="d-flex flex-wrap gap-3 justify-content-center">
                                    {users.map(user => (
                                        <div key={user.id} className="card mb-1 shadow-sm"
                                            style={{ maxHeight: "200px", minWidth: "250px", maxWidth: '360px' }}>
                                            <div className="card-body">
                                                <h5>{user.displayName}</h5>
                                                <span className={`${user.roles === "SuperAdmin" ? "bg-danger" : "bg-primary"} badge`}>{user.roles || "No Roles"}</span>
                                                <p className="mb-1">{user.email}</p>
                                                <small className="text-muted">{user.userName}</small>
                                            </div>
                                            <div className="text-center">
                                                <button onClick={() => {
                                                    setEmailForRole(user.email)
                                                    handleGetAllRoles()
                                                }} data-bs-toggle="modal" data-bs-target="#addRoleeModal"
                                                    className="badge btn btn-success shadow mb-2 ">{user.roles === "" ? "Add Roles" : "Update Roles"}</button>
                                            </div>
                                            <div className="modal fade" id="addRoleeModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add User Role</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <select className="form-control" value={userNewRole}
                                                                onChange={e => setUserNewRole(e.target.value)}>
                                                                <option value="">Select Role</option>

                                                                {roles?.map(r => {
                                                                    return (
                                                                        <option key={r.id} value={r.name}>{r.name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" onClick={() => handleUpdateUserRole()} className="btn btn-primary">Submit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>}

                            {/*Admin Brands DashBoard*/}
                            {(activeNav === "brands") && (<div className="container mt-5">
                                <div className="container d-flex gap-2 justify-content-center">
                                    <select className="form-control">
                                        {adminBrands.map(b => {
                                            return (
                                                <option key={b.id} value={b.id} >{b.name}</option>)
                                        })}
                                    </select>

                                </div>
                                <div className="mt-3">
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#addBrandModal"
                                        className="badge mx-2 rounded-4 btn btn-primary"><i className="bi bi-plus-circle"></i> Add Brand</button>
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#removeBrandModal"
                                        className="badge mx-2 rounded-4 btn btn-danger"><i className="bi bi-x-circle"></i> Remove Brand</button>

                                </div>
                                {/*Toggalable Add Brand Modal*/}
                                <div className="modal fade" id="addBrandModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Brand</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body ">
                                                <div className="container px-4">
                                                    <div className="text-start px-1">
                                                        <h5>Brand Title</h5>
                                                    </div>
                                                    <input className="form-control" onChange={e => setBrandAdd(e.target.value)} placeholder="Write New Brand Title" />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" onClick={() => handleAddBrand()} className="btn btn-primary">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*Toggalable Remove Brand Modal*/}
                                <div className="modal fade" id="removeBrandModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Remove Brand</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body ">
                                                <div className="container px-4">
                                                    <div className="text-start px-1">
                                                        <h5>Brand Title</h5>
                                                    </div>
                                                    <select className="form-control" onChange={e => setBrandRemove(e.target.value)}>
                                                        {adminBrands.map(b => {
                                                            return (
                                                                <option key={b.id} value={b.id}>{b.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" onClick={() => hadnleRemoveBrand()} className="btn btn-primary">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)}

                            {/*Admin Categories DashBoard*/}
                            {(activeNav === "categories") && (<div className="container mt-5">
                                <div className="container d-flex gap-2 justify-content-center">

                                    <select className="form-control">
                                        {adminCategories.map(c => {
                                            return (
                                                <option key={c.id} value={c.id} >{c.name}</option>)
                                        })}
                                    </select>
                                </div>
                                <div className="mt-3">
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#addCategoryModal"
                                        className="badge mx-2 rounded-4 btn btn-primary"><i className="bi bi-plus-circle"></i> Add Category</button>
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#removeCategoryModal"
                                        className="badge mx-2 rounded-4 btn btn-danger"><i className="bi bi-x-circle"></i> Remove Category</button>

                                </div>
                                {/*Toggalable Add Category Modal*/}
                                <div className="modal fade" id="addCategoryModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Category</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body ">
                                                <div className="container px-4">
                                                    <div className="text-start px-1">
                                                        <h5>Category Title</h5>
                                                    </div>
                                                    <input className="form-control" onChange={e => setCategoryAdd(e.target.value)} placeholder="Write New Brand Title" />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" onClick={() => handleAddCategory()} className="btn btn-primary">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*Toggalable Remove Category Modal*/}
                                <div className="modal fade" id="removeCategoryModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Remove Category</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body ">
                                                <div className="container px-4">
                                                    <div className="text-start px-1">
                                                        <h5>Category Title</h5>
                                                    </div>
                                                    <select className="form-control" onChange={e => setCategoryRemove(e.target.value)}>
                                                        {adminCategories.map(c => {
                                                            return (
                                                                <option key={c.id} value={c.id}>{c.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" onClick={() => handleRemoveCategory()} className="btn btn-primary">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)}

                            {(activeNav === null) &&
                                (<DashBoardTemplate />)}

                        </div>{/*{(activeNav === null) && <div className="position-relative">
                                        <img src="../AdminDashboard.JPG" alt="Welcome To Dashboard"
                                            className="position-absolute"
                                            style={{ zIndex: "10", top: "", left: "" }} /> </div>*/}
                    </div>}
                {isAdmin !== null && !isAdmin && <AccessDenied />}
            </div >

        </>
    )
}