import api from "../api/axios"
import { useState, createContext, useCallback } from "react";
export const AdminContext = createContext();
export function AdminProvider({ children }) {

    /// Admin Nav Bar Handle
    const [activeNav, setActiveNav] = useState(null);

    //// Alert Handle
    const [showAlert, setShowAlert] = useState(false);

    //// Error Handle
    const [requestState, setRequestState] = useState({
        message: null,
        type: null
    });


    //// Admin Products
    const [adminProducts, setAdminProducts] = useState({
        count: 0,
        PageSize: 0,
        PageIndex: 1,
        data: []
    });

    //Query-Params >> followed with (Params) <<
    const [brandParams, setBrandParams] = useState();
    const [typeParams, setTypeParams] = useState();
    const [searchParams, setSearchParams] = useState();
    const [sortParams, setSortParams] = useState();
    const [pageIndexParams, setPageIndexParams] = useState(1);
    const [pageSizeParams, setPageSizeParams] = useState(25);

    //// Get All Products 
    const getProductsAdmin = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            const resp = await api.get("/Admin/products",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        BrandId: brandParams,
                        TypeId: typeParams,
                        SearchValue: searchParams,
                        Sort: sortParams,
                        PageIndex: pageIndexParams,
                        PageSize: pageSizeParams
                    }
                }
            );
            setAdminProducts(resp.data);
        } catch (e) {
            setRequestState({
                message: e.response?.data.detail,
                type: "danger"
            });
        }
    }, [
        brandParams, typeParams, searchParams, sortParams, pageIndexParams, pageSizeParams, setRequestState]);

    ///==============================================

    //// Add Prdouct

    const [productDto, setProductDto] = useState({
        name: "",
        description: "",
        discountPercentage: 0,
        stockQuantity: 0,
        BrandId: 0,
        TypeId: 0,
        price: 0,
    });
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);
    const addProductsAdmin = async (product, token) => {

        try {
            const formData = new FormData();
            formData.append("Name", product.name);
            formData.append("Description", product.description);
            formData.append("DiscountPercentage", product.discountPercentage);
            formData.append("StockQuantity", product.stockQuantity);
            formData.append("BrandId", product.BrandId);
            formData.append("TypeId", product.TypeId);
            formData.append("Price", product.price);
            formData.append("ThumbnailUrl", thumbnailFile);
            imageFiles.forEach((file) => {
                formData.append("Images", file);
            });
            const res = await api.post(
                "/Admin/products",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return res.data;
        } catch (e) {
            setRequestState({
                message: e.response?.data.detail,
                type: "danger"
            });
        } return null;
    };
    ///==============================================

    //// Get Product By Id 
    const [editProductDto, setEditProductDto] = useState({
        id: 0,
        name: "",
        description: "",
        discountPercentage: 0,
        stockQuantity: 0,
        productBrand: "",
        productType: "",
        brandId: 0,
        typeId: 0,
        price: 0,
        thumbnailUrl: "",
        images: []
    });
    const getProductAdmin = async (id, token) => {
        try {
            const res = await api.get(`/Admin/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setEditProductDto(res.data);
            return res.data;
        } catch (e) {
            setRequestState({
                message: e.response?.data.detail,
                type: "danger"
            });
        }
    }
    ///==============================================


    //// Update Product 
    const [editThumbFile, setEditThumbFile] = useState(null);
    const [editImgsFile, setEditImgsFile] = useState([]);
    const updateProductAdmin = async (id, product, token) => {

        try {
            const formData = new FormData();
            formData.append("Name", product.name);
            formData.append("Description", product.description);
            formData.append("DiscountPercentage", product.discountPercentage);
            formData.append("StockQuantity", product.stockQuantity);
            formData.append("BrandId", product.brandId);
            formData.append("TypeId", product.typeId);
            formData.append("Price", product.price);
            if (editThumbFile) {
                formData.append("ThumbnailUrl", editThumbFile);
            }
            editImgsFile?.forEach((file) => {
                formData.append("Images", file);
            });
            const res = await api.put(`/Admin/products/${id}`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            return res.status;
        } catch (e) {
            setRequestState({
                message: e.response?.data.detail,
                type: "danger"
            });
        }

    }

    ///// Delete Product
    const deleteProductAdmin = async (id, token) => {

        try {
            const res = await api.delete(`/Admin/products/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            return res.data;
        } catch (e) {
            setRequestState({
                message: e.response?.data.detail,
                type: "danger"
            });
        }
    }

    /// Catgories & Brands
    const [adminCategories, setAdminCategories] = useState([]);
    const [adminBrands, setAdminBrands] = useState([]);

    ///// Load All Categories    
    const getAdminCategories = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const res = await api.get("/Admin/types",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            setAdminCategories(res.data)
        }
        catch (e) {
            setRequestState({
                message: e.response?.data.detail,
                type: "danger"
            });
        }
    }, []);

    ///// Load All Brands
    const getAdminBrands = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await api.get("/Admin/brands",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            setAdminBrands(res.data);
        }
        catch (e) {
            setRequestState({
                message: e.response?.data.detail,
                type: "danger"
            });
        }
    }, []);

    /// Add Category 
    const addCategory = async (category) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await api.post(`/Admin/types`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }, params: {
                    typeName: category
                }
            })
            if (res.status === 200) {
                setRequestState({
                    message: "Category Added Successfully",
                    type: "success"
                })

            }
        } catch (error) {
            setRequestState({
                message: error.response?.data.detail,
                type: "danger"
            });
        }

    }
    /// Add Brand 
    const addBrand = async (Brand) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await api.post(`/Admin/brands`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }, params: {
                    brandName: Brand
                }
            })
            if (res.status === 200) {
                setRequestState({
                    message: "Brand Added Successfully",
                    type: "success"
                }
                )
            }

        } catch (error) {
            setRequestState({
                message: error.response?.data.detail,
                type: "danger"
            });
        }

    }

    /// Remove Category
    const removeCategory = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await api.delete(`/Admin/types`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }, params: {
                    typeId: id
                }
            })
            if (res.status === 200) {
                setRequestState({
                    message: "Category Removed Successfully",
                    type: "success"
                }
                )
            }
        } catch (error) {
            setRequestState({
                message: error.response?.data.detail,
                type: "danger"
            });
        }

    }
    /// Remove Brand
    const removeBrand = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await api.delete(`/Admin/brands`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }, params: {
                    brandId: id
                }
            })
            if (res.status === 200) {
                setRequestState({
                    message: "Brand Removed Successfully",
                    type: "success"
                }
                )
            }
        } catch (error) {
            setRequestState({
                message: error.response?.data.detail,
                type: "danger"
            });
        }

    }
    ///// Orders Handle

    const [orders, setOrders] = useState([]);

    ///// Load All Orders
    const getAdminOrders = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const res = await api.get("/Admin/orders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            setOrders(res.data);
        }
        catch (e) {
            setRequestState({
                message: e.response?.data.detail,
                type: "danger"
            });
        }
    }, []);


    ///// Users Handle
    const [users, setUsers] = useState([]);
    ///// Load All Users
    const getAdminUsers = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await api.get("/Admin/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            setUsers(res.data);
        } catch (e) {
            setRequestState({
                message: e.response?.data.detail,
                type: "danger"
            });
        }
    }, []);

    //// Roles Handle
    const [roles, setRoles] = useState([])
    //// Load All Roles
    const getAllRoles = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await api.get("/Admin/roles",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            setRoles(res.data);
            return true;
        } catch (e) {
            setRequestState({
                message: e.response?.data.detail,
                type: "danger"
            });
            return false;
        }
    }, []);
    //// Add/Update User Role
    const addUpdateUserRole = useCallback(async (userEmail, newRole) => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const res = await api.post("/Admin/roles", null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }, params: {
                        email: userEmail,
                        role: newRole
                    }

                })
            if (res.status === 200) {
                setRequestState({
                    message: `User : ${userEmail} Role Is Updated As ${newRole}`,
                    type: "success"
                });
                return true;
            }
        } catch (e) {
            setRequestState({
                message: e.response?.data.detail,
                type: "danger"
            });
            return false;
        }
    }, [])

    return (
        <AdminContext.Provider value={{
            adminProducts, productDto, setProductDto, setThumbnailFile, setImageFiles, requestState, setRequestState,
            editProductDto, setEditProductDto, setEditThumbFile,
            setEditImgsFile, setBrandParams, setTypeParams, setSearchParams, setSortParams, setPageIndexParams, setPageSizeParams,
            getProductsAdmin, getProductAdmin, addProductsAdmin, updateProductAdmin, deleteProductAdmin,
            showAlert, setShowAlert,
            adminCategories, adminBrands, getAdminCategories, getAdminBrands, getAdminOrders, getAdminUsers,
            activeNav, setActiveNav, orders, users,
            roles, getAllRoles, addUpdateUserRole,
            addCategory, removeCategory, addBrand, removeBrand
        }}>
            {children}
        </AdminContext.Provider>
    )
}