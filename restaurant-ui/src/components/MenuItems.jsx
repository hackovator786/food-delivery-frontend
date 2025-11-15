import React, {useState, useMemo, useEffect} from 'react';
import {
    Typography, IconButton, Box, Grid, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Chip, Button, TextField,
    TablePagination, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import AddItemDialog from "./AddItemDialog.jsx";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import {toast} from "react-toastify";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const MenuItems = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [stockFilter, setStockFilter] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = useMemo(() => ['All', ...new Set(menuItems.map(item => item.category))], [menuItems]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        async function fetchMenuItems() {
            try{
                const response = await axiosPrivate.get(`/menu/get-menu-items`);
                console.log(response?.data);
                setMenuItems(response?.data);
            } catch (err){
                console.log(err);
            }
        }
        fetchMenuItems();
    }, []);


    // Filtered and searched data
    const filteredItems = useMemo(() => {
        let result = menuItems;

        // 1. Filter by Category
        if (categoryFilter !== 'All') {
            result = result.filter(item => item.category === categoryFilter);
        }

        // 2. Filter by Stock
        if (stockFilter === 'In Stock (>10)') {
            result = result.filter(item => item.stock > 10);
        } else if (stockFilter === 'Low Stock (<=10)') {
            result = result.filter(item => item.stock <= 10);
        }

        // 3. Filter by Search Term
        if (searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            result = result.filter(item =>
                item.name.toLowerCase().includes(lowerCaseSearch) ||
                item.category.toLowerCase().includes(lowerCaseSearch)
                // Add search by tag
                || (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch)))
            );
        }

        // Reset page to 0 if filters change and the current page is out of bounds
        if (page * rowsPerPage >= result.length) {
            setPage(0);
        }

        return result;
    }, [searchTerm, categoryFilter, stockFilter, menuItems, page, rowsPerPage]);

    // Pagination Handlers
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Logic to slice the filtered data for the current page
    const pagedItems = filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Handlers for Add Item Dialog
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false); // Used internally by dialog reset logic

    const handleAddItem = async (newItem,image) => {
        try {
            const formData = new FormData();
            formData.append('menuItem', JSON.stringify(newItem));
            formData.append('file', image);
            const response = await axiosPrivate.post(`/menu/add-item`, formData, {headers: { "Content-Type": "multipart/form-data"}});
            console.log(response);
            toast.success("Item added successfully");
        } catch (err){
            console.log(err);
            toast.error("Error adding item");
        }
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={1}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
                    Menu Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    color="primary"
                    onClick={handleOpenModal}
                >
                    Add New Item
                </Button>
            </Box>

            {/* Search and Filter Controls */}
            <Grid container spacing={2} component={Paper} sx={{ p: 2, mb: 3 }} alignItems="center">
                <Grid item xs={12} md={5}>
                    <TextField
                        fullWidth
                        label="Search by Item Name, Category or Tag"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            endAdornment: <SearchIcon color="action" />,
                            sx: { borderRadius: '8px', width: '30vw' },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth size="small" sx={{width:'10vw'}}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={categoryFilter}
                            label="Category"
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            sx={{ borderRadius: '8px' }}
                        >
                            {categories.map(cat => (
                                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth size="small" sx={{width:'10vw'}}>
                        <InputLabel>Stock Status</InputLabel>
                        <Select
                            value={stockFilter}
                            label="Stock Status"
                            onChange={(e) => setStockFilter(e.target.value)}
                            sx={{ borderRadius: '8px' }}
                        >
                            <MenuItem value="All">All Stock</MenuItem>
                            <MenuItem value="In Stock (>10)">In Stock (&gt;10)</MenuItem>
                            <MenuItem value="Low Stock (<=10)">Low Stock (&le;10)</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>


            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ bgColor: 'background.default' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Image</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Item Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Tags</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Price(₹)</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Stock</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredItems.length > 0 ? (
                            pagedItems.map((item) => (
                                <TableRow key={item.menuItemId} hover>
                                    <TableCell align="center">
                                        <img
                                            src={IMAGE_BASE_URL +  item.imageUrl}
                                            alt={item.name}
                                            // Fallback in case of broken URL
                                            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/40x40/CCCCCC/000000?text=${item.name.charAt(0)}` }}
                                            style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '4px' }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">{item.name}</TableCell>
                                    <TableCell align="center">{item.category}</TableCell>
                                    {/* Display Tags */}
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap',alignItems: 'center', justifyContent: 'center', flexDirection: "column" }}>
                                            {item.tags && item.tags.length > 0 ? (
                                                item.tags.slice(0, 3).map(tag => ( // Show up to 3 tags
                                                    <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderRadius: '4px' }} />
                                                ))
                                            ) : (
                                                <Typography variant="caption" color="text.disabled">N/A</Typography>
                                            )}
                                            {item.tags && item.tags.length > 3 && (
                                                <Typography variant="caption" color="text.secondary">+{item.tags.length - 3} more</Typography>
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">{item.price}</TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={item.isAvailable ? 'In Stock' : 'Out of Stock'}
                                            color={item.isAvailable ? 'success' : 'error'}
                                            size="small"
                                            sx={{ borderRadius: '6px' }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton color="primary" size="small"><EditIcon /></IconButton>
                                        <IconButton color="error" size="small"><DeleteIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                    No items found matching your criteria.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={filteredItems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* The Dialog for adding items */}
            <AddItemDialog
                open={isModalOpen}
                handleClose={handleCloseModal}
                handleSave={handleAddItem}
                categories={categories}
            />
        </Box>
    );
};

export default MenuItems;