import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import { useFormik } from 'formik';
import * as yup from 'yup';

export interface CustomDialogProps {
	isOpen: boolean;
	isEdit: boolean;
	isLoading: boolean;
	data: any;
	onClose: () => void;
	onSubmit: (e: any) => void;
}

const renderOptions = (options: { label: string, value: string }[]) => {
	return options.map((item, index) => {
		return (
			<Grid item xs={6} key={index.toString()}>
				<FormControlLabel
					value={item.value}
					control={<Radio sx={{ color: '#550DF6' }} />}
					label={item.label}
				/>
			</Grid>
		);
	});
};

export default function UserDialog(props: CustomDialogProps) {
	const { isOpen, onClose, onSubmit, isEdit, data, isLoading } = props;

	const validationSchema = yup.object({
		id: yup
			.string(),
		npwp: yup
			.string()
			.required(),
		nama: yup
			.string()
			.required(),
		type: yup
			.string()
			.required(),
		status: yup
			.string()
			.required(),
		signDefault: yup
			.boolean(),
	});

	const formik = useFormik({
		initialValues: {
			id: '',
			npwp: '',
			nama: '',
			type: '',
			status: '',
			signDefault: false,
		},
		validationSchema: validationSchema,
		onSubmit
	});

	useEffect(() => {
		if (isEdit) {
			formik.setValues({
				id: data.id,
				npwp: data.npwp,
				nama: data.name,
				type: data.signatory,
				status: data.statusTaxpayer,
				signDefault: data.defaultSignatory,
			});
		} else {
			formik.resetForm();
		}
	}, [data]);


	const onSubmitClick = (e: any) => {
		e.preventDefault();
		formik.handleSubmit(e);
	};

	return (
		<div>
			<Dialog
				aria-labelledby='customized-dialog-title'
				open={isOpen}
				fullWidth
			>
				<form onSubmit={onSubmitClick}>
					<DialogTitle id='customized-dialog-title'>
						Tambah Penandatangan SPT
					</DialogTitle>
					<DialogContent dividers>
						<Grid container spacing={2} p={5}>
							<Grid container spacing={2}
								sx={{
									alignItems: 'center'
								}}
							>
								<Grid xs={5} item>
									<Typography gutterBottom>
										NPWP *
									</Typography>
								</Grid>
								<Grid xs={7} pb={2} item>
									<TextField
										fullWidth
										onBlur={formik.handleBlur}
										autoComplete='off'
										id='npwp'
										name='npwp'
										label='NPWP'
										variant='filled'
										value={formik.values.npwp}
										onChange={(e) => {
											formik.handleChange(e);
										}}
										error={formik.touched.npwp && Boolean(formik.errors.npwp)}
										helperText={formik.touched.npwp && formik.errors.npwp}
										InputProps={{
											style: {
												color: formik.touched.npwp && formik.errors.npwp ? '#EC0C0C' : '#0E0E2C',
											},
										}}
									/>
								</Grid>
							</Grid>
							<Grid container spacing={2}
								sx={{
									alignItems: 'center'
								}}
								pt={2}
							>
								<Grid xs={5} item>
									<Typography gutterBottom>
										Nama Penandatangan SPT *
									</Typography>
								</Grid>
								<Grid xs={7} pb={2} item>
									<TextField
										fullWidth
										autoComplete='off'
										onBlur={formik.handleBlur}
										id='nama'
										name='nama'
										label='Nama Penandatangan SPT'
										variant='filled'
										value={formik.values.nama}
										onChange={(e) => {
											formik.handleChange(e);
										}}
										error={formik.touched.nama && Boolean(formik.errors.nama)}
										helperText={formik.touched.nama && formik.errors.nama}
										InputProps={{
											style: {
												color: formik.touched.nama && formik.errors.nama ? '#EC0C0C' : '#0E0E2C',
											},
										}}
									/>
								</Grid>
							</Grid>
							<Grid container spacing={2}
								sx={{
									alignItems: 'center'
								}}
								pt={2}
							>
								<Grid xs={5} item>
									<Typography gutterBottom>
										Bertindak sebagai *
									</Typography>
								</Grid>
								<Grid xs={7} pb={2} item>
									<RadioGroup
										aria-labelledby='demo-controlled-radio-buttons-group'
										name='type'
										row
										value={formik.values.type}
										onChange={formik.handleChange}
									>
										<Grid container>{renderOptions(
											[
												{ label: 'Wajib Pajak', value: 'TAXPAYER' },
												{ label: 'Kuasa', value: 'AUTHORIZED_REPRESENTATIVE' }
											]
										)}</Grid>
									</RadioGroup>
								</Grid>
							</Grid>
							<Grid container spacing={2}
								sx={{
									alignItems: 'center'
								}}
								pt={2}
							>
								<Grid xs={5} item>
									<Typography gutterBottom>
										Status Wajib Pajak *
									</Typography>
								</Grid>
								<Grid xs={7} pb={2} item>
									<RadioGroup
										aria-labelledby='demo-controlled-radio-buttons-group'
										name='status'
										row
										value={formik.values.status}
										onChange={formik.handleChange}
									>
										<Grid container>{renderOptions(
											[
												{ label: 'Aktif', value: 'ACTIVE' },
												{ label: 'Tidak Aktif', value: 'NOT_ACTIVE' }
											]
										)}</Grid>
									</RadioGroup>
								</Grid>
							</Grid>
							<Grid container spacing={2}
								sx={{
									alignItems: 'center'
								}}
								pt={2}
								item
							>
								<FormControlLabel
									name='signDefault'
									onChange={formik.handleChange}
									control={<Checkbox checked={formik.values.signDefault} />}
									label='Jadikan sebagai default'
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						{/* disable on loading and add loading button */}
						<Button onClick={onClose}>
							BATAL
						</Button>
						<Button
							type='submit'
						>
							SIMPAN
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}
