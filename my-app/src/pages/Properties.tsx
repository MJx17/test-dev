import React, { FC, useState } from 'react';
import {
    Select,
    MenuItem,
    // ImageList,
    // ImageListItem,
    Button,
    Typography,
    Box,
    Stack,
    Pagination,
} from '@mui/material';
import '../styles/properties.scss';

interface Property {
    id: number;
    description: string;
    imageUrls: string[];
    link: string;
    category: string;
    mode: string;
    area: string;
    lotArea?: string;
    floorArea?: string;
    price?: string;
    address?: string;
    status?: string;
}


export const dummyProperties: Property[] = [
    {
        id: 1,
        description: 'Condominium Unit in Cubao, Quezon City',
        imageUrls: ['/files/0001[1]_1.jpg', '/files/0002[1].jpg', '/files/0003[1].jpg',],
        link: '',
        category: 'Condominium',
        mode: 'For Sale',
        area: 'Cubao, Quezon City',
        lotArea: 'N/A',
        floorArea: '25.85 sq. m.',
        price: '$ 3,000,000.00',
        address: 'Unit 5-B, 5th Floor of Avida Towers, New Manila Tower II, Col. Bonny Serrano Ave., Brgy. Bagong Lipunan Crame, Cubao, Quezon City',
        status: 'Available',
    },

    {
        id: 2,
        description: 'Residential Condo Unit, Malate Manila',
        imageUrls: ['/files/Malate195.jpg','/files/Malate196.jpg', '/files/Malate197.jpg'],
        link: '/properties/2',
        category: 'Condominium',
        mode: 'For Sale',
        area: 'Manila City',
        lotArea: 'N/A',
        floorArea: '159.28 sq.m.',
        price: '₱21,000,000.00',
        address: 'Unit 1401 14th Floor Stanford Tower, M.H. Del Pilar St. Malate Manila',
        status: 'Available',
    },
    {
        id: 3,
        description: 'Advent Condominium, Cubao, Quezon City',
          imageUrls: ['/files/advent-1.jpg','/files/advent-2.jpg', '/files/advent-3.jpg', '/files/advent-4.jpg',],
        link: '/properties/3',
        category: 'Condominium',
        mode: 'For Sale',
        area: 'Quezon City',
        lotArea: 'N/A',
        floorArea: '18.41 to 22.46 sq.m.',
        price: '₱2,000,000.00 to ₱2,400,000.00',
        address: 'Advent Condominium No. 20 Oxford St., Brgy E. Rod., Cubao, Quezon City',
        status: 'Available',
    },
    {
        id: 4,
        description: 'House and Lot Sun Valley Subdivision, Paranaque City',
        imageUrls: ['/files/IMG_6559.jpeg', '/files/IMG_6560.jpeg', '/files/IMG_6561.jpeg', '/files/IMG_6562.jpeg', '/files/IMG_6563.jpeg', '/files/IMG_6560.jpeg'],
        link: '/properties/4',
        category: 'House and Lot',
        mode: 'For Sale',
        area: 'Paranaque City',
        lotArea: '259.00 sq.m.',
        floorArea: 'N/A',
        price: 'Best Offer',
        address: 'No. 4377 Rosemallow St., within Sun Valley Subdivision, Barangay Sun Valley, Paranaque City',
        status: 'Available',
    },
    {
        id: 5,
        description: 'Lot with Improvements Brgy. Canumay West, Valenzuela City',
        imageUrls: ['/files/canumay-1.jpg', 'files/canumay-2.jpg'],
        link: '/properties/5',
        category: 'Lot with Warehouse',
        mode: 'For Sale',
        area: 'Valenzuela City',
        lotArea: '3,000 sq.m.',
        floorArea: 'N/A',
        price: '₱80,000,000.00',
        address: '(unnumbered), F. Lazaro St. Brgy. Canumay West, Valenzuela City',
        status: 'Available',
    },
    {
        id: 6,
        description: '5 Vacant Lots, Marville Homes Subdivision, Tuba, Benguet',
        imageUrls: ['/files/3.jpg', '/files/3_1.jpg'],
        link: '/properties/6',
        category: 'Vacant Lot',
        mode: 'For Sale',
        area: 'Tuba, Benguet',
        lotArea: '200 sq.m. to 267 sq.m.',
        floorArea: 'N/A',
        price: '₱1,015,200.00 - ₱1,353,600.00',
        address: '(unnumbered) interior (Peace Street) corner unnamed Alley, Marville Homes Subd., Brgy. Tadiangan, Tuba, Benguet',
        status: 'Available',
    },
    {
        id: 7,
        description: 'Vacant Lot Only, Port View Village, Mariveles, Bataan',
        imageUrls: ['/files/1.jpg', '/files/1_1.jpg'],
        link: '/properties/7',
        category: 'Vacant Lot',
        mode: 'For Sale',
        area: 'Bataan',
        lotArea: '13,985 sq.m.',
        floorArea: 'N/A',
        price: '₱14,000,000.00',
        address: 'Port View Village, Kamayan Point Road (Alas-asín Road), Mariveles',
        status: 'Available',
    },
    {
        id: 8,
        description: 'Lot Only, Balon Anito, Mariveles, Bataan',
        imageUrls: ['/files/33.jpg', '/files/33_1.jpg'],
        link: '/properties/8',
        category: 'Vacant Lot',
        mode: 'For Sale',
        area: 'Bataan',
        lotArea: '1,000 sq.m.',
        floorArea: 'N/A',
        price: '₱600,000.00',
        address: 'Unnumbered Balon Anito, Mariveles, Bataan',
        status: 'Available',
    },
    {
        id: 9,
        description: 'Three-Storey Residential House, Berberabe Subdivision, Batangas City',
        imageUrls: ['/files/0002.jpg', '/files/0002_1.jpg'],
        link: '/properties/9',
        category: 'House and Lot',
        mode: 'For Sale',
        area: 'Batangas',
        lotArea: '650 sq.m.',
        floorArea: 'N/A',
        price: '₱40,000,000.00',
        address: 'Lot 4, Block 10, Road Lot 12, G.C. Berberabe Subdivision, Phase 4-A, Barangay, Pallocan Silangan, Batangas City',
        status: 'Available',
    }
];



// Filter options
const modes = ['Rent', 'Buy'];
const areas = ['Downtown', 'Uptown', 'Suburbs'];
const categories = ['Apartment', 'Condo', 'House', 'Villa'];

const Properties: FC = () => {
    const [modeFilter, setModeFilter] = useState('');
    const [areaFilter, setAreaFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProperties = dummyProperties.filter((p) => {
        return (
            (!modeFilter || p.mode === modeFilter) &&
            (!areaFilter || p.area === areaFilter) &&
            (!categoryFilter || p.category === categoryFilter)
        );
    });

    const itemsPerPage = 8;
    const pageCount = Math.ceil(filteredProperties.length / itemsPerPage);
    const paginatedProperties = filteredProperties.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <div className="properties-container">
            {/* Filters */}
            <div className="box-properties">
                <Box className="box-properties-wrapper">
                    <Box className="filter-heading">
                        <Typography variant="h5" component="h1" className='h5-filter'>
                            Search Property
                        </Typography>
                    </Box>

                    <Box className="filter-controls">
                        <Select fullWidth value={modeFilter} onChange={(e) => setModeFilter(e.target.value)} size="small" displayEmpty>
                            <MenuItem value="" disabled>Mode</MenuItem>
                            {modes.map((mode) => <MenuItem key={mode} value={mode}>{mode}</MenuItem>)}
                        </Select>
                        <Select fullWidth value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)} size="small" displayEmpty>
                            <MenuItem value="" disabled>Area</MenuItem>
                            {areas.map((area) => <MenuItem key={area} value={area}>{area}</MenuItem>)}
                        </Select>
                        <Select fullWidth value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} size="small" displayEmpty>
                            <MenuItem value="" disabled>Category</MenuItem>
                            {categories.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                        </Select>
                    </Box>
                </Box>

            </div>

            {/* Property Cards */}
            <div className="properties-card">
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                            lg: 'repeat(4, 1fr)',
                        },
                        gap: 2,
                        mt: 3,
                        px: 2,

                    }}
                >
                    {paginatedProperties.map(({ id, description, imageUrls, area, lotArea, floorArea, price }) => (
                        <Box
                            key={id}
                            sx={{
                                border: '1px solid #e0e0e0',
                                borderRadius: 2,
                                backgroundColor: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                p: 2,
                                gap: 1,

                            }}
                        >
                            <Box>
                                {[
                                    ['Location', area],
                                    ['Lot Area', lotArea],
                                    ['Floor Area', floorArea],
                                    ['Price', price],
                                ].map(([label, value]) => (
                                    <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2" fontWeight="bold">{label}:</Typography>
                                        <Typography variant="body2">{value}</Typography>
                                    </Box>
                                ))}
                            </Box>

                            <Box
                                component="img"
                                src={imageUrls[0]}
                                alt={description}
                                loading="lazy"
                                sx={{ width: '100%', height: 180, borderRadius: 1, objectFit: 'cover' }}
                            />

                            <Button
                                variant="contained"
                                fullWidth
                                href={`#/properties-details/${id}`}
                                className='properties-button'
                            >
                                Read More
                            </Button>

                        </Box>
                    ))}
                </Box>

                {/* Pagination */}
                {pageCount > 1 && (
                    <Stack mt={4} alignItems="center">
                        <Pagination count={pageCount} page={currentPage} onChange={handlePageChange} color="primary" />
                    </Stack>
                )}
            </div>
        </div>
    );
};


export default Properties;
