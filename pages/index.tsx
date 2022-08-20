import type { NextPage } from 'next';
import useSWR from 'swr';
import React, { useState, useRef } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import UserDialog from '../components/dialog/userDialog';
import { createSigner, getSignerList, updateSigner } from '../services/signerRequest';
import { SettingsSharp } from '@mui/icons-material';

const Home: NextPage = () => {
  const dataRef = useRef({});
  const [isDialogLoading, setDialogLoading] = useState(false);
  const [editState, setEditState] = useState({
    isEdit: false,
    isOpen: false
  });
  const [snackBarState, setSnackBarState] = useState({
    isOpen: false,
    message: '',
  });

  const singerListFetcher = async () => {
    const result = await getSignerList();
    return result.data;
  }

  const { data: signerList, error: signerListError, mutate } = useSWR('getsigner', singerListFetcher);

  const handleOpen = () => {
    setEditState({
      isOpen: true,
      isEdit: false,
    });
  };

  const handleClose = () => {
    dataRef.current = {};
    setEditState({
      isEdit: false,
      isOpen: false,
    });
  };

  const handleEdit = (data: any) => {
    dataRef.current = data;
    setEditState({
      isOpen: true,
      isEdit: true,
    });
  };

  const handleSubmit = async (e: any) => {
    try {
      setDialogLoading(true);
      if (editState.isEdit) {
        const updateData = await updateSigner(
          e.id,
          {
            npwp: e.npwp,
            name: e.nama,
            signatory: e.type,
            statusTaxpayer: e.status,
            defaultSignatory: e.signDefault,
          }
        );
        const updateSignerList = signerList.map((item: any) => {
          if (item.id == e.id) {
            return updateData.data;
          }
          return item;
        });
        mutate(updateSignerList);
      } else {
        const signer = await createSigner({
          npwp: e.npwp,
          name: e.nama,
          signatory: e.type,
          statusTaxpayer: e.status,
          defaultSignatory: e.signDefault,
        });
        mutate([...signerList, signer.data])
      }
      setSnackBarState({
        isOpen: true,
        message: editState.isEdit ?
          'Edit successfully' :
          'Create successfully'
      });
    } catch (error) {
      setSnackBarState({
        isOpen: true,
        message: 'Something went wrong'
      });
    } finally {
      setDialogLoading(false);
      setEditState({
        isEdit: false,
        isOpen: false,
      });
      dataRef.current = {};
    }
  }

  if (signerListError) {
    return (<>
      <Typography>Something went wrong</Typography>
    </>);
  }

  if (!signerList) {
    return (<>
      <Typography>Loading</Typography>
    </>);
  }

  return (
    <>
      <Container>
        <UserDialog
          isOpen={editState.isOpen}
          onSubmit={handleSubmit}
          onClose={handleClose}
          isEdit={editState.isEdit}
          data={dataRef.current}
          isLoading={isDialogLoading}
        />
        <Snackbar
          open={snackBarState.isOpen}
          autoHideDuration={3000}
          message={snackBarState.message}
          onClose={() => {
            setSnackBarState({
              isOpen: false
            })
          }}
        />
        <Typography variant="h4" component="h4">
          Penandatangan SPT
        </Typography>
        <Card>
          <Grid container spacing={2} p={5}>
            <Grid xs={8} item>
              <Box>
                <Typography>
                  Tambah dan edit daftar Penandatangan SPT Anda
                </Typography>
              </Box>
            </Grid>
            <Grid xs={4} pb={2} item>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row-reverse'
              }}>
                <Button
                  onClick={handleOpen}
                  variant="contained"
                >
                  + TAMBAH
                </Button>
              </Box>
            </Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>NPWP</TableCell>
                    <TableCell align="right">Nama</TableCell>
                    <TableCell align="right">Sebagai</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Default</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {signerList.map((row: any, index: number) => (
                    <TableRow
                      key={index.toString()}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.npwp.replace(/(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})(\d{3})/, '$1.$2.$3.$4-$5.$6')}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.signatory}</TableCell>
                      <TableCell align="right">{row.statusTaxpayer}</TableCell>
                      <TableCell align="right">{row.defaultSignatory ? 'True' : 'False'}</TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => handleEdit(row)}
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Card>
      </Container>
    </>
  );
}

export default Home
