import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';

function SearchBox({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleChange}
                    style={{ marginRight: '16px' }}
                />
                <Button variant="contained" color="primary" type="submit">
                    Search
                </Button>
            </form>
        </Paper>
    );
}

export default SearchBox;