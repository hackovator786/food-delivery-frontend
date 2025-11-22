import React, {useContext, useState} from 'react';
import {
    Typography, IconButton, Box, Grid, Chip, Button, TextField,
    Dialog, DialogContent, DialogActions, Autocomplete, Container, AppBar, Toolbar, Slide, Paper
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import ClearIcon from '@mui/icons-material/Clear';
import ThemeContext from "../context/ThemeContext.jsx";
import {toast} from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddItemDialog = ({ open, handleClose, handleSave, categories }) => {
    const {homePageTheme} = useContext(ThemeContext);
    const defaultCategory = categories.length > 1 ? categories[1] : '';
    const [name, setName] = useState('');
    const [description, setDescription] = useState(''); // NEW: Description State
    const [category, setCategory] = useState(defaultCategory);
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [isAdding,setIsAdding] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            handleRemoveImage();
        }
    };

    const handleRemoveImage = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        setImageFile(null);
        setImagePreview(null);
        const fileInput = document.getElementById('item-image-upload');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleTagInputKeyDown = (e) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            e.preventDefault();
            const newTag = tagInput.trim().toLowerCase();
            if (!tags.includes(newTag)) {
                setTags(prevTags => [...prevTags, newTag]);
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
    };

    const handleFormClear = () => {
        // Cleanup states on close
        setName('');
        setDescription('');
        setPrice('');
        setStock('');
        setTags([]);
        setTagInput('');
        handleRemoveImage();
        setCategory(defaultCategory);
    }

    const handleFormClose = () => {
        handleFormClear();
        handleClose();
    }

    const handleSubmit = async () => {
        setIsAdding(true);
        // Check for required fields
        if (!name || !description || !category || !imageFile || isNaN(parseFloat(price)) || isNaN(parseInt(stock)) || parseFloat(price) <= 0 || parseInt(stock) < 0) {
            console.error("Please fill all fields correctly.");
            return;
        }

        const itemImage = imagePreview
            ? imagePreview
            : `https://placehold.co/100x100/F0F0F0/000000?text=${category.charAt(0)}`;

        const newItem = {
            name,
            description,
            category: category.trim(),
            price: parseFloat(price).toFixed(2),
            tags: tags
        };

        await handleSave(newItem,imageFile);
        handleFormClear();
        setIsAdding(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleFormClose}
            fullScreen
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative', bgcolor: 'white', color: 'text.primary' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1, fontWeight: 'bold' }} variant="h6" component="div">
                        Add New Menu Item
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleFormClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <DialogContent dividers sx={{ bgcolor: homePageTheme.palette.background.default }}>
                <Container maxWidth="md" sx={{ py: 2 }}>
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} width="48%">
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Item Name*"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} width="50%" >
                                <Autocomplete
                                    fullWidth={true}
                                    freeSolo
                                    value={category}
                                    options={categories.slice(1)}
                                    onChange={(event, newValue) => {
                                        setCategory(newValue || '');
                                    }}
                                    onInputChange={(event, newInputValue) => {
                                        setCategory(newInputValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            fullWidth
                                            {...params}
                                            margin="dense"
                                            label="Category (Search or Add New)*"
                                            variant="outlined"
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} width="48%">
                                <TextField
                                    margin="dense"
                                    label="Price (₹)*"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    inputProps={{ step: "0.01", min: "0" }}
                                />
                            </Grid>
                            <Grid item xs={12} width="50%">
                                <TextField
                                    margin="dense"
                                    label="Initial Stock Quantity"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    inputProps={{ min: "0" }}
                                />
                            </Grid>

                            {/* Tags Input Section */}
                            <Grid item xs={12} width="100%">
                                <TextField
                                    margin="dense"
                                    label="Tags (Press Enter to add)*"
                                    helperText="Example: vegetarian, popular, new, spicy"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleTagInputKeyDown}
                                />
                                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {tags.map((tag) => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            onDelete={() => handleRemoveTag(tag)}
                                            color="primary"
                                            variant="filled"
                                            size="small"
                                            sx={{ borderRadius: '6px' }}
                                        />
                                    ))}
                                </Box>
                            </Grid>

                            <Grid item xs={12} width="100%">
                                <TextField
                                    margin="dense"
                                    label="Item Description*"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    rows={3}
                                    size="small"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>

                            {/* Image Upload Section */}
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" sx={{ mt: 1, mb: 1, fontWeight: 'bold' }}>Item Image*</Typography>
                                <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        startIcon={<ImageSearchIcon />}
                                        size="small"
                                        sx={{ borderRadius: '8px' }}
                                    >
                                        {imagePreview ? 'Change File' : 'Choose File'}
                                        <input
                                            type="file"
                                            id="item-image-upload"
                                            accept="image/*"
                                            hidden
                                            onChange={handleImageChange}
                                        />
                                    </Button>
                                    {imagePreview ? (
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', p: 0.5 }}>
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '4px' }}
                                                />
                                            </Box>
                                            <IconButton
                                                color="error"
                                                onClick={handleRemoveImage}
                                                size="small"
                                                title="Remove Image"
                                            >
                                                <ClearIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    ) : (
                                        <Typography variant="caption" color="text.secondary">No file selected</Typography>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </DialogContent>

            <DialogActions sx={{ p: 2, borderTop: '1px solid #ddd', bgcolor: homePageTheme.palette.background.default }}>
                <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button onClick={handleFormClose} color="error" variant="outlined" sx={{ borderRadius: '8px' }}>Cancel</Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: '8px' }} disabled={isAdding}>Add Item</Button>
                </Container>
            </DialogActions>
        </Dialog>
    );
};
export default AddItemDialog;