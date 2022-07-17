import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import {styled} from '@mui/material/styles';
import {Box, Link, Typography} from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
import {PATH_DASHBOARD} from '../../../routes/paths';
// components
import MyAvatar from '../../../components/MyAvatar';
import {useEffect, useState, useCallback} from 'react';
import axios from '../../../utils/axios';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useIsMountedRef from "../../../hooks/useIsMountedRef";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: theme.palette.grey[500_12],
    transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shorter,
    }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
    isCollapse: PropTypes.bool,
    textColor: PropTypes.string,
};

export default function NavbarAccount({isCollapse,textColor}) {
    const {user} = useAuth();
    const [whitelists, setWhitelists] = useState([]);
    const [whitelist, setWhitelist] = useState('');
    const color = '#F3F4EF';
    const isMountedRef = useIsMountedRef();

    const getWhitelists = useCallback(async () => {
        const response = await axios.get('getWhitelists');
        if (isMountedRef.current) {
            setWhitelists(response.data.data);
            setWhitelist(response.data.data[0].name);
            console.log(Object.values(response.data.data[0])[1]);
            console.log(response.data.data[0]);
        }

    }, [isMountedRef]);
    useEffect(() => {
        getWhitelists();
    }, [getWhitelists]);

    const findWhitelistId = (name) => {
        let id;
        whitelists.map((list) => {
            if(list.name === name)
                id = list.id;
        });
        return id;
    }
    const handleChange = (event) => {
      /*  const sep = event.target.value.lastIndexOf(':');
        const name = event.target.value.substring(event.target.value, sep);
        const id = event.target.value.substring(sep,event.target.value.length);*/
        const id = findWhitelistId(event.target.value);
        console.log(id);
        setWhitelist(event.target.value);
        window.localStorage.setItem('whitelistId', id);
    };

    if (!whitelists)
        return <></>

    return (
        <FormControl>
            <Select sx={{color: color}}
                    value={whitelist}
                    onChange={handleChange}
                   >
                {whitelists.map((whitelist) => {
                    return (
                        <MenuItem value={whitelist.name}>
                            {whitelist.name}
                        </MenuItem>
                    )
                })}

            </Select>
        </FormControl>
    );
}
